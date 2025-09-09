#!/bin/bash

# Anime.js MCP Server - Example Usage Script
# This script demonstrates various ways to interact with the Anime.js MCP server

echo "🎬 Anime.js MCP Server - Example Usage"
echo "======================================="

echo ""
echo "📋 Available Tools:"
echo "- get_anime_component: Get info about specific Anime.js APIs"
echo "- list_anime_components: Browse all available components"
echo "- get_anime_example: Get complete code examples"
echo "- search_anime_examples: Search through examples"
echo "- get_anime_docs: Access documentation topics"

echo ""
echo "🎯 Example Component Queries:"
echo "- anime: Main animation function"
echo "- timeline: Timeline sequences"
echo "- stagger: Stagger effects"
echo "- path: SVG path animations"

echo ""
echo "🎨 Example Animation Patterns:"
echo "- basic-transform: Simple transforms"
echo "- timeline-sequence: Sequential animations"
echo "- stagger-grid: Grid-based delays"
echo "- svg-path: SVG animations"
echo "- text-animation: Text effects"
echo "- elastic-bounce: Physics easing"

echo ""
echo "📚 Documentation Topics:"
echo "- getting-started: Installation and basics"
echo "- animation-controls: Play/pause controls"
echo "- easing: Easing functions"
echo "- performance: Optimization tips"
echo "- timeline: Timeline and sequencing"
echo "- stagger: Stagger patterns"

echo ""
echo "🔍 Search Examples:"
echo "- 'transform': Find transform animations"
echo "- 'timeline': Find timeline examples"
echo "- 'stagger': Find stagger effects"
echo "- 'svg': Find SVG animations"
echo "- 'text': Find text animations"

echo ""
echo "🚀 Quick Start Commands:"
echo ""
echo "# Get basic animation info"
echo 'echo \'{"method": "tools/call", "params": {"name": "get_anime_component", "arguments": {"componentName": "anime"}}}\' | npx anime-js-mcp-server'
echo ""
echo "# List all components"
echo 'echo \'{"method": "tools/call", "params": {"name": "list_anime_components", "arguments": {}}}\' | npx anime-js-mcp-server'
echo ""
echo "# Get a basic example"
echo 'echo \'{"method": "tools/call", "params": {"name": "get_anime_example", "arguments": {"exampleType": "basic-transform"}}}\' | npx anime-js-mcp-server'
echo ""
echo "# Search for stagger examples"
echo 'echo \'{"method": "tools/call", "params": {"name": "search_anime_examples", "arguments": {"query": "stagger"}}}\' | npx anime-js-mcp-server'
echo ""
echo "# Get getting started docs"
echo 'echo \'{"method": "tools/call", "params": {"name": "get_anime_docs", "arguments": {"topic": "getting-started"}}}\' | npx anime-js-mcp-server'

echo ""
echo "💡 Pro Tips:"
echo "- Use categories to filter components: core, timeline, utilities, svg"
echo "- Search examples by keywords like 'grid', 'rotation', 'color'"
echo "- Check performance docs for optimization tips"
echo "- Combine with timeline for complex sequences"

echo ""
echo "🎭 Animation Categories:"
echo "- Core: anime(), basic animations"
echo "- Timeline: Sequential and parallel animations" 
echo "- Utilities: stagger(), random(), set(), get()"
echo "- SVG: Path animations and morphing"

echo ""
echo "Ready to animate! 🎨✨"