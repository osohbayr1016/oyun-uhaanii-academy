#!/bin/bash

# Test Runner Script for Oyun Uhaanii Academy
# This script runs all tests and checks to ensure deployment readiness

set -e  # Exit on any error

echo "🚀 Starting comprehensive test suite..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm run install:all

echo "🔍 Running type checking..."
npm run type-check

echo "🧪 Running backend tests..."
cd back-end
npm test
cd ..

echo "🧪 Running frontend tests..."
cd front-end
npm test
cd ..

echo "🔍 Running linting..."
npm run lint

echo "🏗️  Building applications..."
npm run build

echo "🔒 Running security audit..."
npm audit --audit-level moderate
cd back-end && npm audit --audit-level moderate && cd ..
cd front-end && npm audit --audit-level moderate && cd ..

echo ""
echo "🎉 All tests completed successfully!"
echo ""
echo "📋 Deployment Readiness Summary:"
echo "✅ Dependencies installed"
echo "✅ TypeScript compilation successful"
echo "✅ Backend tests passed"
echo "✅ Frontend tests passed"
echo "✅ Linting passed"
echo "✅ Build successful"
echo "✅ Security audit completed"
echo ""
echo "🚀 Your application is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Set up environment variables for production"
echo "2. Configure your deployment platform"
echo "3. Run this script again before deployment"
echo "4. Follow the deployment guide in DEPLOYMENT_READINESS.md" 