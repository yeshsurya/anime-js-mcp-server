#!/bin/bash

# Test script for Anime.js MCP Server
echo "🧪 Testing Anime.js MCP Server Package..."

# Build the project
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Test basic functionality
echo "Testing server startup..."
timeout 5s node build/index.js --help > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Server help command works"
else
    echo "❌ Server help command failed"
    exit 1
fi

# Test version command
echo "Testing version command..."
node build/index.js --version > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Version command works"
else
    echo "❌ Version command failed"
    exit 1
fi

echo ""
echo "🎯 Package Test Results:"
echo "✅ TypeScript compilation successful"
echo "✅ Entry point executable"  
echo "✅ Command line arguments working"
echo "✅ Help and version commands functional"

echo ""
echo "📦 Package ready for publishing!"
echo ""
echo "📋 Next steps:"
echo "1. npm publish --dry-run  # Test publishing"
echo "2. npm publish            # Publish to npm"
echo "3. npx anime-js-mcp-server --help  # Test installation"

echo ""
echo "🎬 Ready to animate with Anime.js MCP Server! ✨"