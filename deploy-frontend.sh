#!/bin/bash

echo "🚀 Preparing Frontend for Deployment to Vercel..."

# Check if we're in the right directory
if [ ! -d "front-end" ]; then
    echo "❌ Error: front-end directory not found. Please run this script from the project root."
    exit 1
fi

# Check if vercel.json exists
if [ ! -f "front-end/vercel.json" ]; then
    echo "❌ Error: vercel.json not found in front-end directory."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd front-end
npm install

echo "🔧 Building frontend..."
npm run build

echo "✅ Frontend build completed successfully!"

echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Go to https://vercel.com"
echo "3. Create a new project"
echo "4. Import your GitHub repository"
echo "5. Configure project settings:"
echo "   - Framework Preset: Next.js"
echo "   - Root Directory: front-end"
echo "   - Build Command: npm run build"
echo "   - Output Directory: .next"
echo "6. Set environment variables:"
echo "   - NEXT_PUBLIC_API_URL (your backend URL)"
echo ""
echo "🔗 Your frontend will be available at: https://your-project-name.vercel.app" 