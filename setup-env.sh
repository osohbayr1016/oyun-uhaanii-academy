#!/bin/bash

echo "🚀 Oyun Uhaanii Academy - Environment Setup Script"
echo "=================================================="

# Generate JWT Secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

echo ""
echo "🔐 Generated JWT Secret:"
echo "$JWT_SECRET"
echo ""

echo "📋 Environment Variables Setup"
echo "=============================="

# Backend Environment
echo "Creating backend environment template..."
cat > back-end/.env.template << EOF
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# JWT Configuration
JWT_SECRET="$JWT_SECRET"

# Server Configuration
PORT=10000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN="https://your-frontend-domain.com,https://www.your-frontend-domain.com"

# Additional Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
EOF

# Frontend Environment
echo "Creating frontend environment template..."
cat > front-end/.env.local.template << EOF
# Backend API URL
NEXT_PUBLIC_API_URL="https://your-backend-domain.com"

# Next.js Configuration
NEXT_PUBLIC_APP_NAME="Oyun Uhaanii Academy"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Analytics (optional)
# NEXT_PUBLIC_GA_ID="your-google-analytics-id"

# Feature Flags (optional)
# NEXT_PUBLIC_ENABLE_ANALYTICS=true
# NEXT_PUBLIC_ENABLE_DEBUG=false
EOF

echo ""
echo "✅ Environment templates created!"
echo ""
echo "📝 Next Steps:"
echo "1. Copy back-end/.env.template to back-end/.env"
echo "2. Copy front-end/.env.local.template to front-end/.env.local"
echo "3. Update the values with your actual production settings"
echo "4. Set the same environment variables in your deployment platform"
echo ""
echo "🔐 Your JWT Secret (save this securely):"
echo "$JWT_SECRET"
echo ""
echo "⚠️  IMPORTANT: Never commit .env files to version control!"
echo "   They are already in .gitignore for security." 