#!/bin/bash

echo "🔧 Starting backend build process..."

# Exit on any error
set -e

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Running database migrations..."
npx prisma migrate deploy

echo "🏗️ Compiling TypeScript..."
npx tsc --version
npx tsc

echo "📁 Verifying build output..."
if [ ! -f "dist/index.js" ]; then
    echo "❌ Error: dist/index.js not found after compilation!"
    echo "📂 Contents of dist directory:"
    ls -la dist/
    exit 1
fi

echo "✅ Build completed successfully!" 