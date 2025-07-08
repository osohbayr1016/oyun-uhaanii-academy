#!/bin/bash

# Test script for deployed application
# Usage: ./test-deployment.sh <backend-url> <frontend-url>

BACKEND_URL=${1:-"http://localhost:5001"}
FRONTEND_URL=${2:-"http://localhost:3000"}

echo "🧪 Testing Deployed Application"
echo "Backend URL: $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""

# Test Backend Health
echo "🔍 Testing Backend Health..."
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/health")
if [[ $? -eq 0 ]]; then
    echo "✅ Backend is responding"
    echo "Health response: $HEALTH_RESPONSE"
else
    echo "❌ Backend health check failed"
fi
echo ""

# Test Backend API
echo "🔍 Testing Backend API..."
API_RESPONSE=$(curl -s "$BACKEND_URL/api/products")
if [[ $? -eq 0 ]]; then
    echo "✅ Backend API is responding"
    echo "API response length: ${#API_RESPONSE} characters"
else
    echo "❌ Backend API test failed"
fi
echo ""

# Test Frontend
echo "🔍 Testing Frontend..."
FRONTEND_RESPONSE=$(curl -s -I "$FRONTEND_URL" | head -1)
if [[ $? -eq 0 ]]; then
    echo "✅ Frontend is responding"
    echo "Frontend response: $FRONTEND_RESPONSE"
else
    echo "❌ Frontend test failed"
fi
echo ""

# Test Database Connection (if backend is accessible)
echo "🔍 Testing Database Connection..."
DB_TEST=$(curl -s "$BACKEND_URL/health" | grep -o '"database":"connected"' || echo "database_not_connected")
if [[ "$DB_TEST" == "database_not_connected" ]]; then
    echo "❌ Database connection failed"
else
    echo "✅ Database is connected"
fi
echo ""

echo "📋 Test Summary:"
echo "1. Backend Health: $([ $? -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "2. Backend API: $([ $? -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "3. Frontend: $([ $? -eq 0 ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "4. Database: $([ "$DB_TEST" != "database_not_connected" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo ""
echo "🎯 Manual Testing Checklist:"
echo "1. Visit $FRONTEND_URL"
echo "2. Test user registration"
echo "3. Test user login"
echo "4. Test admin functionality (if you have admin access)"
echo "5. Test course creation/editing"
echo "6. Test product management"
echo "7. Test news management"
echo "8. Test tournament management"
echo ""
echo "🔧 If tests fail, check:"
echo "- Environment variables are set correctly"
echo "- Database is accessible"
echo "- CORS is configured properly"
echo "- All services are running" 