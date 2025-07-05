#!/bin/bash

echo "🚀 Oyun Uhaanii Academy Setup Script"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd back-end
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../front-end
npm install

# Generate Prisma clients
echo "🔧 Generating Prisma clients..."
cd ../back-end
npx prisma generate

cd ../front-end
npx prisma generate

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create .env file in back-end folder with your database URL and JWT secret"
echo "2. Create .env.local file in front-end folder with your database URL"
echo "3. Run 'npx prisma migrate dev' in back-end folder to create database tables"
echo "4. Start backend: cd back-end && npm run dev"
echo "5. Start frontend: cd front-end && npm run dev"
echo ""
echo "🌐 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:3000" 