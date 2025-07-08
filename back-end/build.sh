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

echo "✅ Build completed successfully!" 