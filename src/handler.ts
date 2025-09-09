/**
 * Request handler setup for the Anime.js MCP server.
 * 
 * This file configures how the server responds to various MCP requests by setting up
 * handlers for resources, resource templates, tools, and prompts.
 * 
 * Updated for MCP SDK 1.16.0 with improved error handling and request processing.
 */
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import { type Server } from "@modelcontextprotocol/sdk/server/index.js";
import { resourceHandlers, resources } from "./resources.js";
import { promptHandlers, prompts } from "./prompts.js";
import { toolHandlers, tools } from "./tools/index.js";
import {
  getResourceTemplate,
  resourceTemplates,
} from "./resource-templates.js";
import { z } from "zod";
import { validateAndSanitizeParams } from './utils/validation.js';
import { circuitBreakers } from './utils/circuit-breaker.js';
import { logError, logInfo } from './utils/logger.js';

// Define basic component schemas here for tool validation
const componentSchema = { componentName: z.string() };
const searchSchema = { query: z.string() };
const exampleSchema = { exampleType: z.string() };
const docsSchema = { topic: z.string() };

/**
 * Wrapper function to handle requests with simple error handling
 */
async function handleRequest<T>(
  method: string,
  params: any,
  handler: (validatedParams: any) => Promise<T>
): Promise<T> {
  try {
    // Validate and sanitize input parameters
    const validatedParams = validateAndSanitizeParams(method, params);
    
    // Execute the handler with circuit breaker protection for external calls
    const result = await circuitBreakers.external.execute(() => handler(validatedParams));
    
    return result;
  } catch (error) {
    logError(`Error in ${method}`, error);
    throw error;
  }
}

/**
 * Sets up all request handlers for the MCP server
 * Following MCP SDK 1.16.0 best practices for handler registration
 * @param server - The MCP server instance
 */
export const setupHandlers = (server: Server): void => {
  logInfo('Setting up request handlers...');

  // List available resources when clients request them
  server.setRequestHandler(
    ListResourcesRequestSchema,
    async (request) => {
      return await handleRequest(
        'list_resources',
        request.params,
        async () => ({ resources })
      );
    }
  );
  
  // Resource Templates
  server.setRequestHandler(ListResourceTemplatesRequestSchema, async (request) => {
    return await handleRequest(
      'list_resource_templates',
      request.params,
      async () => ({ resourceTemplates })
    );
  });

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async (request) => {
    return await handleRequest(
      'list_tools',
      request.params,
      async () => {
        // Return the tools that are registered with the server
        const registeredTools = [
          {
            name: 'get_anime_component',
            description: 'Get information and examples for a specific Anime.js component or API',
            inputSchema: {
              type: 'object',
              properties: {
                componentName: {
                  type: 'string',
                  description: 'Name of the Anime.js component or API (e.g., "anime", "timeline", "stagger")',
                },
              },
              required: ['componentName'],
            },
          },
          {
            name: 'list_anime_components',
            description: 'Get all available Anime.js components and APIs',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Filter by category (core, timeline, utilities, svg)',
                },
              },
            },
          },
          {
            name: 'get_anime_example',
            description: 'Get example code for a specific Anime.js animation pattern',
            inputSchema: {
              type: 'object',
              properties: {
                exampleType: {
                  type: 'string',
                  description: 'Type of example (e.g., "basic-transform", "timeline-sequence", "stagger-grid")',
                },
              },
              required: ['exampleType'],
            },
          },
          {
            name: 'search_anime_examples',
            description: 'Search Anime.js examples and code snippets',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for examples',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_anime_docs',
            description: 'Get documentation for Anime.js features and concepts',
            inputSchema: {
              type: 'object',
              properties: {
                topic: {
                  type: 'string',
                  description: 'Documentation topic (e.g., "getting-started", "animation-controls", "performance")',
                },
              },
              required: ['topic'],
            },
          },
        ];
        
        return { tools: registeredTools };
      }
    );
  });
  
  // Return resource content when clients request it
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    return await handleRequest(
      'read_resource',
      request.params,
      async (validatedParams: any) => {
        const { uri } = validatedParams;
        
        // Check if this is a static resource
        const resourceHandler = resourceHandlers[uri as keyof typeof resourceHandlers];
        if (resourceHandler) {
          const result = await Promise.resolve(resourceHandler());
          return {
            contentType: result.contentType,
            contents: [{
              uri: uri,
              text: result.content
            }]
          };
        }
        
        // Check if this is a generated resource from a template
        const resourceTemplateHandler = getResourceTemplate(uri);
        if (resourceTemplateHandler) {
          const result = await Promise.resolve(resourceTemplateHandler());
          return {
            contentType: result.contentType,
            contents: [{
              uri: uri,
              text: result.content
            }]
          };
        }
        
        throw new Error(`Resource not found: ${uri}`);
      }
    );
  });

  // List available prompts
  server.setRequestHandler(ListPromptsRequestSchema, async (request) => {
    return await handleRequest(
      'list_prompts',
      request.params,
      async () => ({ prompts: Object.values(prompts) })
    );
  });

  // Get specific prompt content with optional arguments
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    return await handleRequest(
      'get_prompt',
      request.params,
      async (validatedParams: any) => {
        const { name, arguments: args } = validatedParams;
        const promptHandler = promptHandlers[name as keyof typeof promptHandlers];
        
        if (!promptHandler) {
          throw new Error(`Prompt not found: ${name}`);
        }
        
        return promptHandler(args as any);
      }
    );
  });

  // Tool request Handler - executes the requested tool with provided parameters
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    return await handleRequest(
      'call_tool',
      request.params,
      async (validatedParams: any) => {
        const { name, arguments: params } = validatedParams;
        
        if (!name || typeof name !== 'string') {
          throw new Error("Tool name is required");
        }
        
        const handler = toolHandlers[name as keyof typeof toolHandlers];

        if (!handler) {
          throw new Error(`Tool not found: ${name}`);
        }

        // Execute handler with circuit breaker protection
        const result = await circuitBreakers.external.execute(() => 
          Promise.resolve(handler(params || {}))
        );
        
        return result;
      }
    );
  });
  
  // Add global error handler
  server.onerror = (error) => {
    logError('MCP server error', error);
  };

  logInfo('Handlers setup complete');
};