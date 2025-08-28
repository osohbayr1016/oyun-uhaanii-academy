#!/bin/bash

echo "🔍 Deployment Verification Script"
echo "=================================="

echo "📁 Current directory: $(pwd)"
echo "📁 Directory contents:"
ls -la

echo ""
echo "📦 Checking package.json..."
if [ -f "package.json" ]; then
    echo "✅ package.json found"
    echo "📋 Main entry point: $(node -p "require('./package.json').main")"
else
    echo "❌ package.json not found"
fi

echo ""
echo "📁 Checking dist directory..."
if [ -d "dist" ]; then
    echo "✅ dist directory found"
    echo "📋 Contents of dist directory:"
    ls -la dist/
    
    if [ -f "dist/index.js" ]; then
        echo "✅ dist/index.js found"
        echo "📏 File size: $(wc -c < dist/index.js) bytes"
    else
        echo "❌ dist/index.js not found"
    fi
else
    echo "❌ dist directory not found"
fi

echo ""
echo "🔧 Checking TypeScript configuration..."
if [ -f "tsconfig.json" ]; then
    echo "✅ tsconfig.json found"
    echo "📋 Output directory: $(node -p "require('./tsconfig.json').compilerOptions.outDir")"
else
    echo "❌ tsconfig.json not found"
fi

echo ""
echo "🌍 Environment variables:"
echo "NODE_ENV: ${NODE_ENV:-not set}"
echo "PORT: ${PORT:-not set}"
echo "DATABASE_URL: ${DATABASE_URL:+set (hidden)}"
echo "JWT_SECRET: ${JWT_SECRET:+set (hidden)}"
echo "CORS_ORIGIN: ${CORS_ORIGIN:-not set}"

echo ""
echo "✅ Verification complete!"
