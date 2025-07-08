#!/bin/bash

echo "🔍 Environment Variables Validation"
echo "=================================="

# Check if backend .env exists
if [ -f "back-end/.env" ]; then
    echo "✅ Backend .env file exists"
    
    # Check required variables
    if grep -q "DATABASE_URL" back-end/.env; then
        echo "✅ DATABASE_URL is set"
    else
        echo "❌ DATABASE_URL is missing"
    fi
    
    if grep -q "JWT_SECRET" back-end/.env; then
        echo "✅ JWT_SECRET is set"
        # Check if JWT secret is at least 32 characters
        JWT_SECRET=$(grep "JWT_SECRET" back-end/.env | cut -d'=' -f2 | tr -d '"')
        if [ ${#JWT_SECRET} -ge 32 ]; then
            echo "✅ JWT_SECRET is sufficiently long (${#JWT_SECRET} characters)"
        else
            echo "❌ JWT_SECRET is too short (${#JWT_SECRET} characters, need at least 32)"
        fi
    else
        echo "❌ JWT_SECRET is missing"
    fi
    
    if grep -q "NODE_ENV=production" back-end/.env; then
        echo "✅ NODE_ENV is set to production"
    else
        echo "⚠️  NODE_ENV is not set to production"
    fi
    
else
    echo "❌ Backend .env file does not exist"
    echo "   Run: cp back-end/.env.template back-end/.env"
fi

echo ""

# Check if frontend .env.local exists
if [ -f "front-end/.env.local" ]; then
    echo "✅ Frontend .env.local file exists"
    
    # Check required variables
    if grep -q "NEXT_PUBLIC_API_URL" front-end/.env.local; then
        echo "✅ NEXT_PUBLIC_API_URL is set"
        API_URL=$(grep "NEXT_PUBLIC_API_URL" front-end/.env.local | cut -d'=' -f2 | tr -d '"')
        if [[ $API_URL == https://* ]]; then
            echo "✅ NEXT_PUBLIC_API_URL uses HTTPS"
        else
            echo "⚠️  NEXT_PUBLIC_API_URL should use HTTPS in production"
        fi
    else
        echo "❌ NEXT_PUBLIC_API_URL is missing"
    fi
    
else
    echo "❌ Frontend .env.local file does not exist"
    echo "   Run: cp front-end/.env.local.template front-end/.env.local"
fi

echo ""
echo "🧪 Testing Backend Build"
echo "========================"

cd back-end
if npm run build > /dev/null 2>&1; then
    echo "✅ Backend builds successfully"
else
    echo "❌ Backend build failed"
fi

cd ../front-end
echo ""
echo "🧪 Testing Frontend Build"
echo "========================="

if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend builds successfully"
else
    echo "❌ Frontend build failed"
fi

cd ..

echo ""
echo "📋 Summary"
echo "=========="
echo "If all checks pass, your environment is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Set the same environment variables in your deployment platform"
echo "2. Deploy backend to Render/Railway"
echo "3. Deploy frontend to Vercel/Netlify"
echo "4. Test the deployed application" 