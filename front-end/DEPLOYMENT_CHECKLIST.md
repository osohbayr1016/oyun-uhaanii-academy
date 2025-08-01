# Deployment Checklist for Frontend

## Environment Variables

Make sure these environment variables are set in your Vercel deployment:

### Required Variables:

- `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://your-backend-domain.com`)

### Optional Variables:

- `NODE_ENV`: Set to `production` for production builds

## Vercel Configuration

### Build Settings:

- Framework Preset: Next.js
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

### Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-domain.com`

## Performance Optimizations Applied:

### 1. Server-Side Rendering

- ✅ Converted home page to server-side rendering
- ✅ Removed client-side data fetching from main page
- ✅ Added proper caching with `next: { revalidate }`

### 2. Bundle Optimization

- ✅ Enabled SWC minification
- ✅ Added package import optimization for lucide-react
- ✅ Enabled CSS optimization
- ✅ Console removal in production

### 3. Image Optimization

- ✅ Using Next.js Image component with proper sizing
- ✅ Added error handling for broken images
- ✅ Configured image domains in next.config.ts

### 4. API Route Improvements

- ✅ Added proper error handling
- ✅ Implemented caching for API responses
- ✅ Added proper HTTP status codes

## Pre-Deployment Checks:

1. **Backend API**: Ensure your backend is deployed and accessible
2. **Environment Variables**: Verify all required env vars are set
3. **Database**: Ensure database is properly configured and accessible
4. **CORS**: Verify CORS settings in backend allow your frontend domain
5. **SSL**: Ensure HTTPS is properly configured

## Post-Deployment Verification:

1. **Home Page**: Check if the page loads without errors
2. **API Calls**: Verify API calls are working (check browser network tab)
3. **Images**: Ensure carousel images load properly
4. **Performance**: Run Lighthouse audit to check performance scores
5. **Mobile**: Test on mobile devices

## Troubleshooting:

### Common Issues:

1. **API Connection Errors**: Check `NEXT_PUBLIC_API_URL` environment variable
2. **Image Loading Issues**: Verify image domains in next.config.ts
3. **Build Failures**: Check for TypeScript errors and missing dependencies
4. **Performance Issues**: Monitor bundle sizes and optimize imports

### Debug Steps:

1. Check Vercel build logs for errors
2. Verify environment variables in Vercel dashboard
3. Test API endpoints directly
4. Check browser console for client-side errors
