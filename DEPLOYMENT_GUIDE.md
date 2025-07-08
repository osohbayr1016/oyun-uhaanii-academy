# Deployment Guide

This guide will help you deploy the Oyun Uhaanii Academy application to Render (backend) and Vercel (frontend).

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: For backend deployment
3. **Vercel Account**: For frontend deployment
4. **Database**: PostgreSQL database (recommended: Neon, Supabase, or Railway)

## Step 1: Set Up Production Database

### Option A: Neon (Recommended)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Note: You'll need this for both backend and frontend

### Option B: Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

## Step 2: Deploy Backend to Render

### 2.1 Connect Repository

1. Go to [render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository

### 2.2 Configure Service

- **Name**: `oyun-uhaanii-academy-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Build Command**: `cd back-end && npm install && npm run build`
- **Start Command**: `cd back-end && npm start`

### 2.3 Environment Variables

Add these environment variables in Render:

```
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
PORT=10000
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for the build to complete
3. Note the service URL (e.g., `https://oyun-uhaanii-academy-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

### 3.1 Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 3.2 Configure Project

- **Framework Preset**: Next.js
- **Root Directory**: `front-end`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 3.3 Environment Variables

Add these environment variables in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

### 3.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Note the deployment URL

## Step 4: Update CORS Configuration

After getting your frontend URL, update the `CORS_ORIGIN` in your Render backend:

1. Go to your Render service dashboard
2. Go to "Environment" tab
3. Update `CORS_ORIGIN` to include your Vercel frontend URL
4. Redeploy the service

## Step 5: Database Migration

### 5.1 Run Migrations

Your backend will automatically run migrations during build, but you can also run them manually:

```bash
# In your backend directory
npx prisma migrate deploy
```

### 5.2 Seed Data (Optional)

If you want to seed your production database:

```bash
# In your backend directory
npx prisma db seed
```

## Step 6: Test the Deployment

### 6.1 Backend Health Check

Visit: `https://your-backend-url.onrender.com/health`

Expected response:

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 6.2 Frontend Test

1. Visit your Vercel frontend URL
2. Test user registration/login
3. Test admin functionality
4. Test all major features

## Troubleshooting

### Common Issues

1. **Database Connection Failed**

   - Check DATABASE_URL format
   - Ensure database is accessible from Render
   - Check SSL requirements

2. **CORS Errors**

   - Verify CORS_ORIGIN includes your frontend URL
   - Check for trailing slashes
   - Ensure protocol matches (http vs https)

3. **Build Failures**

   - Check build logs in Render/Vercel
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

4. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names
   - Verify JWT_SECRET is at least 32 characters

### Useful Commands

```bash
# Check backend logs
# In Render dashboard > Logs

# Check frontend logs
# In Vercel dashboard > Functions

# Test database connection locally
cd back-end
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## Security Considerations

1. **JWT Secret**: Use a strong, random secret (at least 32 characters)
2. **Database**: Use connection pooling in production
3. **CORS**: Only allow your frontend domain
4. **Environment Variables**: Never commit secrets to git
5. **HTTPS**: Both Render and Vercel provide HTTPS by default

## Monitoring

1. **Render**: Monitor logs and performance in dashboard
2. **Vercel**: Check analytics and function logs
3. **Database**: Monitor connection usage and performance
4. **Application**: Implement proper error logging

## Next Steps

1. Set up custom domains (optional)
2. Configure CDN for static assets
3. Set up monitoring and alerting
4. Implement CI/CD pipeline
5. Set up backup strategies
