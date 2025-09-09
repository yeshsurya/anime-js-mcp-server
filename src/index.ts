#!/usr/bin/env node
/**
 * Anime.js MCP Server
 * 
 * A Model Context Protocol server for Anime.js animation library.
 * Provides AI assistants with access to Anime.js components, APIs, examples, and documentation.
 * 
 * Usage:
 *   npx anime-js-mcp-server
 *   npx anime-js-mcp-server --github-api-key YOUR_TOKEN
 *   npx anime-js-mcp-server -g YOUR_TOKEN
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { setupHandlers } from './handler.js';
import { axios } from './utils/axios.js';
import { z } from 'zod';
import { 
  toolHandlers,
  toolSchemas
} from './tools/index.js';
import { logError, logInfo, logWarning } from './utils/logger.js';


/**
 * Parse command line arguments
 */
async function parseArgs() {
  const args = process.argv.slice(2);
  
  // Help flag
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Anime.js MCP Server

Usage:
  npx anime-js-mcp-server [options]

Options:
  --github-api-key, -g <token>    GitHub Personal Access Token for API access
  --help, -h                      Show this help message
  --version, -v                   Show version information

Examples:
  npx anime-js-mcp-server
  npx anime-js-mcp-server --github-api-key ghp_your_token_here
  npx anime-js-mcp-server -g ghp_your_token_here

Environment Variables:
  GITHUB_PERSONAL_ACCESS_TOKEN    Alternative way to provide GitHub token
  LOG_LEVEL                       Log level (debug, info, warn, error) - default: info

For more information, visit: https://animejs.com
`);
    process.exit(0);
  }

  // Version flag
  if (args.includes('--version') || args.includes('-v')) {
    // Read version from package.json
    try {
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const packagePath = path.join(__dirname, '..', 'package.json');
      
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);
      console.log(`anime-js-mcp-server v${packageJson.version}`);
    } catch (error) {
      console.log('anime-js-mcp-server v1.0.0');
    }
    process.exit(0);
  }

  // GitHub API key
  const githubApiKeyIndex = args.findIndex(arg => arg === '--github-api-key' || arg === '-g');
  let githubApiKey = null;
  
  if (githubApiKeyIndex !== -1 && args[githubApiKeyIndex + 1]) {
    githubApiKey = args[githubApiKeyIndex + 1];
  } else if (process.env.GITHUB_PERSONAL_ACCESS_TOKEN) {
    githubApiKey = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  }

  return { githubApiKey };
}

/**
 * Main function to start the MCP server
 */
async function main() {
  try {
    logInfo('Starting Anime.js MCP Server...');

    const { githubApiKey } = await parseArgs();

    // Configure GitHub API key if provided
    if (githubApiKey) {
      axios.setGitHubApiKey(githubApiKey);
      logInfo('GitHub API configured with token');
    } else {
      logWarning('No GitHub API key provided. Rate limited to 60 requests/hour.');
    }

    // Initialize the MCP server with metadata and capabilities
    // Following MCP SDK 1.16.0 best practices
    const server = new Server(
      {
        name: "anime-js-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          resources: {
            "get_anime_components": {
              description: "List of available Anime.js animation components and APIs",
              uri: "resource:get_anime_components",
              contentType: "text/plain"
            }
          },
          prompts: {
            "component_usage": {
              description: "Get usage examples for a specific Anime.js component or API",
              arguments: {
                componentName: {
                  type: "string",
                  description: "Name of the Anime.js component or API to get usage for"
                }
              }
            },
            "animation_tutorial": {
              description: "Get a step-by-step tutorial for creating animations with Anime.js",
              arguments: {
                animationType: {
                  type: "string",
                  description: "Type of animation (e.g., 'transform', 'timeline', 'stagger', 'morphing')"
                }
              }
            },
            "performance_optimization": {
              description: "Get performance optimization tips for Anime.js animations",
              arguments: {
                useCase: {
                  type: "string",
                  description: "Specific use case or performance concern"
                }
              }
            }
          },
          tools: {
            "get_anime_component": {
              description: "Get information and examples for a specific Anime.js component or API",
              inputSchema: {
                type: "object",
                properties: {
                  componentName: {
                    type: "string",
                    description: "Name of the Anime.js component or API (e.g., 'anime', 'timeline', 'stagger')"
                  }
                },
                required: ["componentName"]
              }
            },
            "get_anime_example": {
              description: "Get example code for a specific Anime.js animation pattern",
              inputSchema: {
                type: "object",
                properties: {
                  exampleType: {
                    type: "string",
                    description: "Type of example (e.g., 'basic-transform', 'timeline-sequence', 'stagger-grid')"
                  }
                },
                required: ["exampleType"]
              }
            },
            "list_anime_components": {
              description: "Get all available Anime.js components and APIs",
              inputSchema: {
                type: "object",
                properties: {
                  category: {
                    type: "string",
                    description: "Filter by category (core, timeline, utilities, svg)"
                  }
                }
              }
            },
            "get_anime_docs": {
              description: "Get documentation for Anime.js features and concepts",
              inputSchema: {
                type: "object",
                properties: {
                  topic: {
                    type: "string",
                    description: "Documentation topic (e.g., 'getting-started', 'animation-controls', 'performance')"
                  }
                },
                required: ["topic"]
              }
            },
            "search_anime_examples": {
              description: "Search Anime.js examples and code snippets",
              inputSchema: {
                type: "object",
                properties: {
                  query: {
                    type: "string",
                    description: "Search query for examples"
                  }
                },
                required: ["query"]
              }
            }
          }
        }
      }
    );

    // Set up request handlers and register components (tools, resources, etc.)
    setupHandlers(server);

    // Start server using stdio transport
    const transport = new StdioServerTransport();
    
    logInfo('Transport initialized: stdio');

    await server.connect(transport);
    
    logInfo('Server started successfully');

  } catch (error) {
    logError('Failed to start server', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  logError('Unhandled startup error', error);
  process.exit(1);
});