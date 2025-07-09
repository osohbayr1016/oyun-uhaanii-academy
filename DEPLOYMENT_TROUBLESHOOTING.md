# 🚨 Deployment Troubleshooting Guide

## ❌ **Current Issue: DATABASE_URL Not Set on Render**

### **Error Message:**

```
PrismaClientInitializationError:
Invalid `prisma.course.findMany()` invocation:
error: Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

### **Root Cause:**

The `DATABASE_URL` environment variable is not set on your Render deployment.

---

## 🔧 **Step-by-Step Fix**

### **Step 1: Set Environment Variables on Render**

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Select your backend service** (`oyun-uhaanii-academy`)
3. **Click on "Environment" tab**
4. **Add these environment variables:**

```
DATABASE_URL=postgresql://neondb_owner:npg_pjT1g0KQheGa@ep-morning-block-a1epltl5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=01a8ad2942c8c9bac07ac11f828afa93103dfcb9303d1479f546efbe94af2ede8b4cd3fcf81ee9168fad06a7ffdef7c5c8a242da1529e5b9c856912fa59ac850
PORT=5001
NODE_ENV=production
```

5. **Click "Save Changes"**
6. **Redeploy your service**

### **Step 2: Set Environment Variables on Vercel**

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Select your frontend project**
3. **Go to Settings → Environment Variables**
4. **Add this environment variable:**

```
NEXT_PUBLIC_API_URL=https://oyun-uhaanii-academy.onrender.com
```

5. **Redeploy your frontend**

---

## 🔍 **Testing After Fix**

### **Test Backend Health:**

```bash
curl https://oyun-uhaanii-academy.onrender.com/health
```

**Expected Response:**

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-07-09T00:00:00.000Z"
}
```

### **Test Database Connection:**

```bash
curl https://oyun-uhaanii-academy.onrender.com/api/courses
```

**Expected Response:**

```json
[
  {
    "id": "...",
    "title": "...",
    "description": "...",
    ...
  }
]
```

### **Test Frontend API:**

```bash
curl https://oyun-uhaanii-academy.vercel.app/api/courses
```

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: Environment Variable Not Taking Effect**

**Solution:**

- Wait 2-3 minutes after saving
- Manually trigger a redeploy
- Check Render logs for any build errors

### **Issue 2: Database Connection Timeout**

**Solution:**

- Verify your Neon database is active
- Check if the database URL is correct
- Ensure SSL mode is set to `require`

### **Issue 3: CORS Errors**

**Solution:**

- Backend CORS is already configured for your frontend domain
- If issues persist, check the CORS configuration in `back-end/src/index.ts`

### **Issue 4: Build Failures**

**Solution:**

- Check Render build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation

---

## 📋 **Environment Variables Reference**

### **Backend (Render):**

| Variable       | Value                           | Purpose             |
| -------------- | ------------------------------- | ------------------- |
| `DATABASE_URL` | `postgresql://neondb_owner:...` | Database connection |
| `JWT_SECRET`   | `01a8ad2942c8c9...`             | JWT token signing   |
| `PORT`         | `5001`                          | Server port         |
| `NODE_ENV`     | `production`                    | Environment mode    |

### **Frontend (Vercel):**

| Variable              | Value                                       | Purpose         |
| --------------------- | ------------------------------------------- | --------------- |
| `NEXT_PUBLIC_API_URL` | `https://oyun-uhaanii-academy.onrender.com` | Backend API URL |

---

## 🔧 **Build Commands**

### **Render Build Command:**

```bash
cd back-end && npm install && npm run build:deploy
```

### **Render Start Command:**

```bash
cd back-end && npm start
```

### **Vercel Build Command:**

```bash
npm run build
```

---

## 📞 **Support**

If you continue to have issues:

1. **Check Render logs** for detailed error messages
2. **Check Vercel logs** for frontend build issues
3. **Verify environment variables** are set correctly
4. **Test database connection** locally first
5. **Ensure all dependencies** are properly installed

---

## ✅ **Success Checklist**

- [ ] DATABASE_URL set on Render
- [ ] JWT_SECRET set on Render
- [ ] PORT set on Render
- [ ] NODE_ENV set to production on Render
- [ ] NEXT_PUBLIC_API_URL set on Vercel
- [ ] Backend redeployed successfully
- [ ] Frontend redeployed successfully
- [ ] Health endpoint returns "healthy"
- [ ] Database endpoints return data
- [ ] Frontend API calls work

---

## 🎯 **Quick Fix Commands**

```bash
# Test current status
curl https://oyun-uhaanii-academy.onrender.com/health

# If still failing, the issue is environment variables
# Follow the step-by-step fix above
```
