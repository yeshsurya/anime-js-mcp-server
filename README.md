# Anime.js MCP Server

A Model Context Protocol (MCP) server providing AI assistants with comprehensive access to [Anime.js](https://animejs.com/) animation library components, APIs, examples, and documentation.

## Features

- 🎬 **Complete Anime.js API Coverage**: Access to all major Anime.js functions and properties
- 📚 **Rich Documentation**: Built-in guides for getting started, easing functions, performance optimization
- 🎯 **Interactive Examples**: Ready-to-use code examples for common animation patterns
- 🔍 **Smart Search**: Find relevant examples and documentation quickly
- ⚡ **Performance Tips**: Best practices for smooth animations
- 🎨 **Animation Patterns**: Transform, timeline, stagger, SVG, morphing, and more

## Installation

### Via npm
```bash
npm install -g anime-js-mcp-server
```

### Via npx (recommended)
```bash
npx anime-js-mcp-server
```

## Usage

### Basic Usage
```bash
# Start the server
npx anime-js-mcp-server

# With GitHub API token for enhanced features
npx anime-js-mcp-server --github-api-key YOUR_GITHUB_TOKEN
```

### Environment Variables
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
export LOG_LEVEL=info  # debug, info, warn, error
```

## MCP Tools

### Component Information
- **get_anime_component**: Get detailed info about specific Anime.js APIs
- **list_anime_components**: Browse all available components by category

### Examples and Tutorials  
- **get_anime_example**: Get complete code examples for animation patterns
- **search_anime_examples**: Search through examples by keywords
- **get_anime_docs**: Access comprehensive documentation topics

## Supported Animation Types

### Core Animations
- **Basic Transforms**: translate, rotate, scale, skew
- **CSS Properties**: opacity, colors, dimensions, positioning
- **Timeline Sequences**: Complex multi-step animations
- **Stagger Effects**: Grid-based and directional delays

### Advanced Features
- **SVG Path Animations**: Path following and morphing
- **Text Animations**: Letter-by-letter effects
- **Elastic & Physics**: Spring and bounce effects
- **Performance Optimization**: Hardware acceleration tips

## Example Usage with Claude

```
# Get started with Anime.js
"How do I create a basic slide-in animation?"

# Explore specific features
"Show me timeline examples for sequential animations"

# Search for patterns
"Find examples with stagger effects"

# Get performance tips
"How do I optimize animations for mobile?"
```

## API Reference

### Tools Available

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_anime_component` | Get component documentation | `componentName` (required) |
| `list_anime_components` | List all components | `category` (optional) |
| `get_anime_example` | Get code example | `exampleType` (required) |
| `search_anime_examples` | Search examples | `query` (required) |
| `get_anime_docs` | Get documentation | `topic` (required) |

### Categories

- **core**: Main animation functions (`anime`, `timeline`)
- **utilities**: Helper functions (`stagger`, `random`, `set`)
- **svg**: SVG-specific animations (`path`, morphing)

### Example Types

- `basic-transform` - Simple transform animations
- `timeline-sequence` - Sequential timeline animations
- `stagger-grid` - Grid-based stagger effects
- `svg-path` - SVG path animations
- `text-animation` - Text effects
- `elastic-bounce` - Physics-based easing
- `morphing` - CSS property morphing
- `keyframes` - Complex keyframe animations

### Documentation Topics

- `getting-started` - Installation and basic usage
- `animation-controls` - Play, pause, seek controls
- `easing` - All easing functions and custom curves
- `performance` - Optimization best practices
- `timeline` - Timeline and sequencing
- `stagger` - Stagger effects and patterns

## Configuration

### Claude Desktop Integration

#### Using Claude MCP CLI (Recommended)

If you have Claude MCP CLI installed, you can add the server with a single command:

```bash
mcp add anime-js --scope user --cmd npx anime-js-mcp-server
```

With GitHub token for enhanced features:
```bash
mcp add anime-js --scope user --cmd npx anime-js-mcp-server --env GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
```

#### Manual Configuration

Alternatively, add to your Claude Desktop configuration manually:

```json
{
  "mcpServers": {
    "anime-js": {
      "command": "npx",
      "args": ["anime-js-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

### GitHub Copilot Integration

The Anime.js MCP Server integrates seamlessly with GitHub Copilot through the Model Context Protocol, providing enhanced animation development capabilities directly in your IDE.

#### VS Code Setup

1. **Install GitHub Copilot Extension** (if not already installed):
   ```bash
   code --install-extension GitHub.copilot
   code --install-extension GitHub.copilot-chat
   ```

2. **Configure MCP Server in VS Code**:
   
   Create or update your VS Code settings file (`.vscode/settings.json` in your workspace or global settings):
   ```json
   {
     "github.copilot.chat.mcpServers": {
       "anime-js": {
         "command": "npx",
         "args": ["anime-js-mcp-server"],
         "env": {
           "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here",
           "LOG_LEVEL": "info"
         }
       }
     }
   }
   ```

3. **Using with GitHub Copilot Agent Mode**:
   
   With the server configured, you can use natural language prompts in Copilot Chat:
   ```
   @workspace Use the anime-js MCP server to create a staggered grid animation for my portfolio gallery
   
   @workspace Show me how to implement elastic bounce animations using the anime-js examples
   
   @workspace Get anime.js timeline documentation and create a sequential loading animation
   ```

#### JetBrains IDEs (IntelliJ, WebStorm, etc.)

1. **Enable GitHub Copilot Plugin**
2. **Configure MCP Settings**:
   
   In your IDE settings, add MCP server configuration:
   ```json
   {
     "copilot.chat.mcpServers": {
       "anime-js": {
         "command": "npx",
         "args": ["anime-js-mcp-server"]
       }
     }
   }
   ```

#### Remote MCP Server Configuration

For production environments, you can deploy the MCP server remotely:

```json
{
  "github.copilot.chat.mcpServers": {
    "anime-js-remote": {
      "url": "https://your-server.com/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

#### Copilot Agent Features

With MCP integration, GitHub Copilot can:
- **Auto-generate animations** based on design descriptions
- **Create complete animation workflows** with proper Anime.js patterns
- **Suggest performance optimizations** using built-in best practices
- **Generate responsive animations** that work across devices
- **Create custom easing functions** and complex timelines

### Gemini CLI Integration

The Anime.js MCP Server works perfectly with Google's Gemini CLI, enabling powerful AI-driven animation development workflows.

#### Installation and Setup

1. **Install Gemini CLI**:
   ```bash
   npm install -g @google-ai/gemini-cli
   ```

2. **Configure the MCP Server**:
   
   Add to your Gemini CLI configuration file (`~/.gemini/settings.json`):
   ```json
   {
     "mcpServers": {
       "anime-js": {
         "command": "npx",
         "args": ["anime-js-mcp-server"],
         "env": {
           "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here",
           "LOG_LEVEL": "info"
         },
         "transport": "stdio"
       }
     }
   }
   ```

3. **Alternative: Direct Command Configuration**:
   ```bash
   gemini config add-mcp-server anime-js npx anime-js-mcp-server
   ```

#### Using with Gemini CLI

Once configured, you can leverage the full power of Gemini with Anime.js knowledge:

```bash
# Interactive animation development
gemini chat "Create a morphing SVG animation using anime.js for my logo"

# Get specific examples
gemini chat "Show me a stagger grid animation example and explain how to customize timing"

# Performance optimization
gemini chat "Analyze my animation code and suggest performance improvements using anime.js best practices"

# Complex workflow automation
gemini chat "Create a complete animation system with multiple timelines for my web app"
```

#### Advanced Gemini CLI Features

The Gemini CLI's ReAct (Reason and Act) loop combined with the Anime.js MCP server enables:

- **Intelligent Code Generation**: Context-aware animation code that follows best practices
- **Real-time Problem Solving**: Debug animation issues with specific Anime.js knowledge
- **Multi-step Workflows**: Complex animation implementations broken down into manageable steps
- **Documentation Integration**: Instant access to Anime.js docs, examples, and patterns

#### Gemini CLI Agent Mode

Enable agent mode for autonomous animation development:

```bash
# Start agent mode with anime.js capabilities
gemini agent --enable-mcp anime-js

# Example agent workflows
gemini agent "Implement a complete page transition system with anime.js"
gemini agent "Create responsive animations that adapt to screen size"
gemini agent "Build an interactive animation playground with controls"
```

#### Remote MCP Server with Gemini CLI

For team environments or CI/CD integration:

```json
{
  "mcpServers": {
    "anime-js-team": {
      "url": "wss://your-team-server.com/mcp/anime-js",
      "transport": "websocket",
      "headers": {
        "Authorization": "Bearer team-api-key"
      }
    }
  }
}
```

#### Integration Benefits

Combining Gemini CLI with the Anime.js MCP Server provides:
- **🎯 Precise Animation Code**: Generated code follows Anime.js conventions exactly
- **📚 Rich Context**: Access to complete Anime.js documentation and examples
- **⚡ Rapid Prototyping**: From concept to working animation in minutes
- **🔧 Smart Debugging**: AI-powered troubleshooting with animation-specific knowledge
- **🎨 Creative Assistance**: Generate complex animation ideas and implementations

### Development Setup

```bash
# Clone and install
git clone https://github.com/juliangarnier/anime-js-mcp-server.git
cd anime-js-mcp-server
npm install

# Build and run
npm run build
npm start

# Development mode
npm run dev
```

## Architecture

The server follows MCP best practices with:

- **Request Validation**: Zod schema validation for all inputs
- **Error Handling**: Comprehensive error handling and logging
- **Caching**: Intelligent caching for performance
- **Circuit Breakers**: Resilient external API calls
- **Logging**: Configurable logging levels

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Related Projects

- [Anime.js](https://animejs.com/) - The animation library this server supports
- [Model Context Protocol](https://modelcontextprotocol.io/) - The protocol standard
- [Claude Desktop](https://claude.ai/) - AI assistant that can use this server

## Publishing to NPM

This package is configured for publishing to npm. Follow these steps to publish:

### Prerequisites

1. **Node.js**: Ensure you have Node.js 18.0.0 or higher installed
2. **NPM Account**: You need an npm account and access to publish under the `@animejs` scope
3. **Authentication**: Log in to npm using `npm login`

### Publishing Steps

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Test the package** (optional but recommended):
   ```bash
   npm test
   ```

3. **Publish to npm**:
   ```bash
   npm publish
   ```

   The `prepublishOnly` script will automatically:
   - Clean the build directory
   - Build the TypeScript source
   - Make the binary executable

### Version Management

- Update the version in `package.json` before publishing
- Use semantic versioning (semver): `major.minor.patch`
- Consider using `npm version` to automatically update and tag:
  ```bash
  npm version patch  # for bug fixes
  npm version minor  # for new features
  npm version major  # for breaking changes
  ```

### Package Configuration

The package is configured with:
- **Name**: `anime-js-mcp-server`
- **Entry point**: `./build/index.js`
- **Binary**: `anime-js-mcp-server` command
- **Files included**: `build/`, `README.md`, `LICENSE`
- **License**: MIT

### Troubleshooting

- Make sure your npm registry is set correctly: `npm config get registry`
- If you encounter permission errors, ensure you're logged in: `npm whoami`
- For publishing updates, increment the version number in `package.json`

## Support

- 📖 [Documentation](https://animejs.com/documentation/)
- 🐛 [Issue Tracker](https://github.com/juliangarnier/anime-js-mcp-server/issues)
- 💬 [Discussions](https://github.com/juliangarnier/anime-js-mcp-server/discussions)

---

Built with ❤️ for the animation community