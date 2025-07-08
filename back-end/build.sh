#!/bin/bash

echo "🔧 Starting backend build process..."

# Exit on any error
set -e

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🏗️ Compiling TypeScript..."
npx tsc

echo "✅ Build completed successfully!" 