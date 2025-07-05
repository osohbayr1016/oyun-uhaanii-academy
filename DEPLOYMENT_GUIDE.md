# Oyun Uhaanii Academy - Deployment Guide

## Overview

This is a full-stack web application with:

- **Frontend**: Next.js 15 with React, TypeScript, and Tailwind CSS
- **Backend**: Express.js with TypeScript, Prisma ORM, and PostgreSQL
- **Database**: PostgreSQL (recommended: Supabase, Railway, or Neon)

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database
- Git repository

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd Oyun-Uhaanii-Academy
npm run install:all
```

### 2. Environment Variables

#### Backend (.env in back-end folder)

```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5001
NODE_ENV=development
```

#### Frontend (.env.local in front-end folder)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database (for development)
npm run prisma:push

# Or run migrations (for production)
npm run prisma:migrate
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run backend    # Backend on http://localhost:5001
npm run frontend   # Frontend on http://localhost:3000
```

## Production Deployment

### Backend Deployment (Render)

#### Option 1: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect the `render.yaml` file and deploy

#### Option 2: Manual Setup

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command**: `cd back-end && npm install && npm run build`
   - **Start Command**: `cd back-end && npm start`
   - **Environment**: Node
   - **Plan**: Free (or paid for better performance)

#### Environment Variables (Render)

Set these in your Render service:

- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render's default)

### Frontend Deployment (Vercel)

#### Option 1: Vercel CLI

```bash
cd front-end
npm install -g vercel
vercel
```

#### Option 2: GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Environment Variables (Vercel)

Set these in your Vercel project:

- `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://your-backend.onrender.com`)

### Database Setup (Production)

#### Recommended: Supabase

1. Create a Supabase project
2. Get your database URL
3. Run migrations:

```bash
cd back-end
npx prisma migrate deploy
```

#### Alternative: Railway/Neon

- Follow their respective setup guides
- Use their PostgreSQL service
- Update your `DATABASE_URL` accordingly

## Build and Test

### Local Production Build

```bash
# Build both frontend and backend
npm run build

# Test backend
npm start

# Test frontend (in another terminal)
cd front-end && npm start
```

### Verify Deployment

1. **Backend Health Check**: `GET https://your-backend.onrender.com/`
2. **API Test**: `GET https://your-backend.onrender.com/api/products`
3. **Frontend**: Visit your Vercel URL

## Troubleshooting

### Common Issues

#### Backend Won't Start

- Check environment variables
- Verify database connection
- Check build logs in Render

#### Frontend Can't Connect to Backend

- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings
- Ensure backend is running

#### Database Connection Issues

- Verify `DATABASE_URL` format
- Check database credentials
- Ensure database is accessible from your deployment

#### Build Failures

- Check Node.js version compatibility
- Verify all dependencies are installed
- Check TypeScript compilation errors

### Debug Commands

```bash
# Check backend logs
cd back-end && npm run dev

# Check frontend logs
cd front-end && npm run dev

# Test database connection
cd back-end && npx prisma studio

# Regenerate Prisma client
npm run prisma:generate
```

## Security Considerations

### Production Checklist

- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up proper CORS
- [ ] Use environment variables for secrets
- [ ] Regular database backups
- [ ] Monitor application logs

### Environment Variables Security

- Never commit `.env` files
- Use different secrets for dev/prod
- Rotate secrets regularly
- Use secure random generators for JWT secrets

## Performance Optimization

### Backend

- Enable compression middleware
- Implement caching strategies
- Optimize database queries
- Use connection pooling

### Frontend

- Enable Next.js optimizations
- Implement proper image optimization
- Use CDN for static assets
- Enable caching headers

## Monitoring and Maintenance

### Health Checks

- Implement `/health` endpoint
- Monitor database connections
- Set up error tracking (Sentry)
- Monitor API response times

### Regular Maintenance

- Update dependencies regularly
- Monitor database performance
- Review and rotate secrets
- Backup database regularly

## Support

For deployment issues:

1. Check the troubleshooting section
2. Review Render/Vercel documentation
3. Check application logs
4. Verify environment variables

## File Structure

```
Oyun-Uhaanii-Academy/
├── back-end/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   └── index.ts         # Server entry point
│   ├── prisma/              # Database schema and migrations
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript config
├── front-end/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   ├── components/     # React components
│   │   └── lib/           # Utility functions
│   ├── package.json        # Frontend dependencies
│   └── next.config.ts      # Next.js config
├── render.yaml             # Render deployment config
├── package.json            # Root package.json
└── DEPLOYMENT_GUIDE.md     # This file
```

## Quick Deploy Commands

### One-time setup

```bash
# Install all dependencies
npm run install:all

# Set up database
npm run prisma:generate
npm run prisma:push

# Build for production
npm run build
```

### Development

```bash
# Start development servers
npm run dev

# Or start individually
npm run backend
npm run frontend
```

### Production

```bash
# Start production backend
npm start
```
