#!/bin/bash

# Oyun Uhaanii Academy Deployment Script
# This script helps prepare the application for deployment

echo "🚀 Oyun Uhaanii Academy Deployment Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "back-end" ] || [ ! -d "front-end" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo "✅ Prisma client generated"

# Build applications
echo "🔨 Building applications..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Applications built successfully"

# Check environment files
echo "🔧 Checking environment configuration..."

if [ ! -f "back-end/.env" ]; then
    echo "⚠️  Warning: back-end/.env file not found"
    echo "   Please create it with the following variables:"
    echo "   DATABASE_URL=your_database_url"
    echo "   JWT_SECRET=your_jwt_secret"
    echo "   PORT=5001"
    echo "   NODE_ENV=production"
fi

if [ ! -f "front-end/.env.local" ]; then
    echo "⚠️  Warning: front-end/.env.local file not found"
    echo "   Please create it with the following variable:"
    echo "   NEXT_PUBLIC_API_URL=your_backend_url"
fi

# Test backend
echo "🧪 Testing backend..."
cd back-end
timeout 10s node dist/index.js &
BACKEND_PID=$!
sleep 3

if curl -s http://localhost:5001/ > /dev/null; then
    echo "✅ Backend is running successfully"
else
    echo "❌ Backend failed to start"
fi

kill $BACKEND_PID 2>/dev/null
cd ..

echo ""
echo "🎉 Deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your database (Supabase, Railway, or Neon)"
echo "2. Configure environment variables in your deployment platform"
echo "3. Deploy backend to Render using the render.yaml file"
echo "4. Deploy frontend to Vercel"
echo "5. Update frontend environment variables with your backend URL"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md" 