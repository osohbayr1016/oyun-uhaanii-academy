# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation

- [ ] All code is committed to GitHub
- [ ] No sensitive data in code (API keys, passwords, etc.)
- [ ] Environment variables are properly configured
- [ ] Build scripts are working locally
- [ ] Tests are passing

### ✅ Database Setup

- [ ] Production database is created (Neon, Supabase, etc.)
- [ ] Database connection string is ready
- [ ] Database is accessible from external services
- [ ] SSL is enabled (if required)

### ✅ Environment Variables

- [ ] JWT_SECRET (at least 32 characters)
- [ ] DATABASE_URL (production database)
- [ ] NODE_ENV=production
- [ ] PORT=10000 (for Render)
- [ ] CORS_ORIGIN (frontend URL)

## Backend Deployment (Render)

### ✅ Repository Setup

- [ ] Code is pushed to GitHub
- [ ] render.yaml is in root directory
- [ ] Backend dependencies are in package.json

### ✅ Render Configuration

- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set build command: `cd back-end && npm install && npm run build`
- [ ] Set start command: `cd back-end && npm start`
- [ ] Set environment variables

### ✅ Environment Variables (Render)

- [ ] NODE_ENV=production
- [ ] DATABASE_URL=your_production_database_url
- [ ] JWT_SECRET=your_super_secret_jwt_key
- [ ] PORT=10000
- [ ] CORS_ORIGIN=https://your-frontend-domain.vercel.app

### ✅ Deployment

- [ ] Deploy service
- [ ] Wait for build to complete
- [ ] Check logs for errors
- [ ] Test health endpoint: `/health`
- [ ] Note backend URL

## Frontend Deployment (Vercel)

### ✅ Repository Setup

- [ ] Code is pushed to GitHub
- [ ] vercel.json is in front-end directory
- [ ] Frontend dependencies are in package.json

### ✅ Vercel Configuration

- [ ] Create new project
- [ ] Import GitHub repository
- [ ] Set framework: Next.js
- [ ] Set root directory: front-end
- [ ] Set build command: npm run build
- [ ] Set output directory: .next

### ✅ Environment Variables (Vercel)

- [ ] NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com

### ✅ Deployment

- [ ] Deploy project
- [ ] Wait for build to complete
- [ ] Check build logs for errors
- [ ] Note frontend URL

## Post-Deployment Configuration

### ✅ CORS Update

- [ ] Update CORS_ORIGIN in Render with frontend URL
- [ ] Redeploy backend service

### ✅ Database Migration

- [ ] Verify migrations ran automatically
- [ ] Check database schema is correct
- [ ] Seed data if needed

## Testing Checklist

### ✅ Automated Tests

- [ ] Run `./test-deployment.sh <backend-url> <frontend-url>`
- [ ] All tests pass

### ✅ Manual Tests

- [ ] Visit frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test admin functionality
- [ ] Test course management
- [ ] Test product management
- [ ] Test news management
- [ ] Test tournament management
- [ ] Test all CRUD operations

### ✅ Performance Tests

- [ ] Check page load times
- [ ] Test API response times
- [ ] Verify database connection pooling
- [ ] Check for memory leaks

## Security Checklist

### ✅ Environment Security

- [ ] All secrets are in environment variables
- [ ] No secrets in code or logs
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure

### ✅ CORS Security

- [ ] CORS_ORIGIN only includes frontend domain
- [ ] No wildcard CORS settings
- [ ] HTTPS is enforced

### ✅ API Security

- [ ] Authentication is working
- [ ] Authorization is working
- [ ] Input validation is working
- [ ] Rate limiting is configured (if needed)

## Monitoring Setup

### ✅ Logs

- [ ] Check Render logs
- [ ] Check Vercel logs
- [ ] Set up error tracking (optional)

### ✅ Health Monitoring

- [ ] Health endpoint is responding
- [ ] Database connection is stable
- [ ] API endpoints are accessible

## Documentation

### ✅ Update Documentation

- [ ] Update README with deployment URLs
- [ ] Document environment variables
- [ ] Document troubleshooting steps
- [ ] Update API documentation

## Final Verification

### ✅ Production Readiness

- [ ] All features work in production
- [ ] No development-only code
- [ ] Error handling is working
- [ ] Performance is acceptable
- [ ] Security is properly configured

### ✅ Backup Plan

- [ ] Database backup is configured
- [ ] Rollback plan is ready
- [ ] Monitoring is in place

## Troubleshooting Common Issues

### Database Connection Issues

- Check DATABASE_URL format
- Verify database is accessible
- Check SSL requirements
- Test connection locally

### CORS Issues

- Verify CORS_ORIGIN includes frontend URL
- Check for trailing slashes
- Ensure protocol matches (http vs https)
- Check browser console for errors

### Build Failures

- Check build logs
- Verify all dependencies are in package.json
- Check TypeScript compilation
- Verify Node.js version compatibility

### Environment Variable Issues

- Double-check all variables are set
- Ensure no typos in variable names
- Verify JWT_SECRET is at least 32 characters
- Check variable scope (NEXT*PUBLIC* prefix for frontend)

## Success Criteria

✅ Backend is deployed and accessible
✅ Frontend is deployed and accessible
✅ Database is connected and working
✅ All features are functional
✅ Security is properly configured
✅ Performance is acceptable
✅ Monitoring is in place
