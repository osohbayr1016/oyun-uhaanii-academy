#!/bin/bash

echo "🚀 Render Environment Setup Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "back-end/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Display the environment variables that need to be set
echo "📋 Environment Variables to set on Render:"
echo "=========================================="
echo ""
echo "DATABASE_URL=postgresql://neondb_owner:npg_pjT1g0KQheGa@ep-morning-block-a1epltl5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
echo ""
echo "JWT_SECRET=01a8ad2942c8c9bac07ac11f828afa93103dfcb9303d1479f546efbe94af2ede8b4cd3fcf81ee9168fad06a7ffdef7c5c8a242da1529e5b9c856912fa59ac850"
echo ""
echo "PORT=5001"
echo ""
echo "NODE_ENV=production"
echo ""

echo "🌐 Frontend Environment Variable (Vercel):"
echo "=========================================="
echo ""
echo "NEXT_PUBLIC_API_URL=https://oyun-uhaanii-academy.onrender.com"
echo ""

echo "📝 Instructions:"
echo "================"
echo "1. Go to your Render dashboard"
echo "2. Select your backend service (oyun-uhaanii-academy)"
echo "3. Go to Environment tab"
echo "4. Add each environment variable above"
echo "5. Save and redeploy"
echo ""
echo "6. Go to your Vercel dashboard"
echo "7. Select your frontend project"
echo "8. Go to Settings → Environment Variables"
echo "9. Add NEXT_PUBLIC_API_URL"
echo "10. Redeploy frontend"
echo ""

echo "🔍 Testing Commands (after deployment):"
echo "======================================"
echo ""
echo "# Test backend health"
echo "curl https://oyun-uhaanii-academy.onrender.com/health"
echo ""
echo "# Test database connection"
echo "curl https://oyun-uhaanii-academy.onrender.com/api/courses"
echo ""
echo "# Test frontend API"
echo "curl https://oyun-uhaanii-academy.vercel.app/api/courses"
echo ""

echo "✅ Setup instructions complete!" 