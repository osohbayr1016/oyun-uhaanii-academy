#!/bin/bash

echo "🚀 Preparing Backend for Deployment to Render..."

# Check if we're in the right directory
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please run this script from the project root."
    exit 1
fi

# Check if back-end directory exists
if [ ! -d "back-end" ]; then
    echo "❌ Error: back-end directory not found."
    exit 1
fi

echo "📦 Installing backend dependencies..."
cd back-end
npm install

echo "🔧 Building backend..."
npm run build

echo "✅ Backend build completed successfully!"

echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Go to https://render.com"
echo "3. Create a new Web Service"
echo "4. Connect your GitHub repository"
echo "5. Set environment variables:"
echo "   - DATABASE_URL (your production database URL)"
echo "   - JWT_SECRET (at least 32 characters)"
echo "   - NODE_ENV=production"
echo "   - PORT=10000"
echo "   - CORS_ORIGIN (your frontend URL after deployment)"
echo ""
echo "🔗 Your backend will be available at: https://your-service-name.onrender.com" 