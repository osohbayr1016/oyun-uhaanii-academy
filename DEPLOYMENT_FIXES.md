# Production Deployment Fixes

## Issues Fixed

### 1. ✅ News API Routes Fixed

**Problem**: Admin news page was calling backend directly, causing CORS and deployment issues.

**Solution**:

- Added missing PUT and DELETE methods to `/api/news/[id]/route.ts`
- Updated admin news page to use frontend API routes instead of direct backend calls
- Fixed error handling in API routes

**Files Modified**:

- `front-end/src/app/api/news/[id]/route.ts` - Added PUT and DELETE methods
- `front-end/src/app/admin/news/page.tsx` - Updated to use frontend API routes

### 2. ✅ Login Credentials Issue

**Problem**: Users getting "invalid credentials" error in production.

**Solution**:

- Created script to reset all user passwords to a known value
- Ensured consistent credentials across development and production

**Script Created**: `back-end/scripts/checkProductionUsers.ts`

## Production Deployment Steps

### 1. Backend Deployment

```bash
# 1. Reset user passwords for production
cd back-end
npx ts-node scripts/checkProductionUsers.ts

# 2. Restart backend server
npm run build
npm start
```

### 2. Frontend Deployment

```bash
# 1. Build frontend
cd front-end
npm run build

# 2. Deploy to your hosting platform
```

### 3. Environment Variables

Ensure these environment variables are set in production:

**Backend (.env)**:

```
DATABASE_URL='your-production-database-url'
JWT_SECRET='your-jwt-secret'
```

**Frontend (.env.local)**:

```
NEXT_PUBLIC_API_URL='your-backend-url'
```

## Production Login Credentials

After running the reset script, all users will have the password: `admin123`

**Available Accounts**:

- Email: `admin@example.com` - Password: `admin123` - Role: admin
- Email: `user@test.com` - Password: `admin123` - Role: user
- Email: `minjisoo114@gmail.com` - Password: `admin123` - Role: admin
- Email: `osohoo691016@gmail.com` - Password: `admin123` - Role: admin

## Testing Checklist

### ✅ News Management

- [ ] Can fetch news list
- [ ] Can create new news articles
- [ ] Can edit existing news articles
- [ ] Can delete news articles
- [ ] Video support works correctly

### ✅ Authentication

- [ ] Can login with production credentials
- [ ] Admin access works correctly
- [ ] User roles are properly assigned
- [ ] Logout works correctly

### ✅ Carousel Management

- [ ] Can add carousel images
- [ ] Can delete carousel images
- [ ] Images display correctly on homepage

## Important Notes

1. **Password Security**: Change the default password `admin123` after first login in production
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Database**: Ensure the production database is accessible and has the correct schema
4. **CORS**: The frontend API routes now handle CORS properly
5. **Caching**: Removed caching from carousel API to ensure fresh data

## Troubleshooting

### If login still fails:

1. Check if backend server is running
2. Verify environment variables are set correctly
3. Check database connectivity
4. Run the password reset script again

### If news operations fail:

1. Check if frontend API routes are accessible
2. Verify backend API is responding
3. Check authentication token is valid
4. Ensure all API routes are properly deployed
