#!/bin/bash

echo "🔧 Fixing backend issues..."

# Kill any existing processes on ports 5001 and 3000-3005
echo "🛑 Killing existing processes..."
lsof -ti:5001 | xargs kill -9 2>/dev/null || true
for port in {3000..3005}; do
  lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

# Navigate to backend and fix issues
cd back-end

# Regenerate Prisma client
echo "🔄 Regenerating Prisma client..."
npx prisma generate

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cp env.example .env
fi

# Set environment variables
export DATABASE_URL="postgresql://username:password@localhost:5432/oyun_uhaanii_academy"
export JWT_SECRET="dev-secret"
export NODE_ENV="development"

echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Test backend
if curl -s http://localhost:5001 > /dev/null; then
  echo "✅ Backend is running on http://localhost:5001"
else
  echo "❌ Backend failed to start"
  exit 1
fi

# Navigate to frontend
cd ../front-end

echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 5

# Find which port frontend is using
FRONTEND_PORT=$(lsof -ti:3000,3001,3002,3003,3004,3005 | head -1 | xargs lsof -p | grep LISTEN | awk '{print $9}' | cut -d: -f2 | head -1)

if [ -n "$FRONTEND_PORT" ]; then
  echo "✅ Frontend is running on http://localhost:$FRONTEND_PORT"
else
  echo "❌ Frontend failed to start"
  exit 1
fi

echo ""
echo "🎉 Both servers are running successfully!"
echo "📊 Backend PID: $BACKEND_PID"
echo "📊 Frontend PID: $FRONTEND_PID"
echo ""
echo "🌐 Backend: http://localhost:5001"
echo "🌐 Frontend: http://localhost:$FRONTEND_PORT"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait 