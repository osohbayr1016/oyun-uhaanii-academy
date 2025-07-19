# SMTP Email Setup Guide

## 🔧 Email Configuration Required

The newsletter email functionality requires SMTP configuration to send emails to subscribers.

## 📋 Required Environment Variables

Add these variables to your `.env` file in the `back-end` directory:

```env
# SMTP Configuration for Email Sending
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FRONTEND_URL="http://localhost:3000"
```

## 🚀 Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings
2. Enable 2-Factor Authentication

### Step 2: Generate App Password

1. Go to Google Account → Security
2. Find "App passwords" (under 2-Step Verification)
3. Select "Mail" and "Other (Custom name)"
4. Enter "Oyun Uhaanii Academy" as the name
5. Copy the generated 16-character password

### Step 3: Update .env File

```env
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-16-character-app-password"
```

## 📧 Alternative Email Providers

### Outlook/Hotmail

```env
SMTP_HOST="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_USER="your-email@outlook.com"
SMTP_PASS="your-password"
```

### Yahoo Mail

```env
SMTP_HOST="smtp.mail.yahoo.com"
SMTP_PORT="587"
SMTP_USER="your-email@yahoo.com"
SMTP_PASS="your-app-password"
```

### Custom SMTP Server

```env
SMTP_HOST="your-smtp-server.com"
SMTP_PORT="587"
SMTP_USER="your-username"
SMTP_PASS="your-password"
```

## 🔍 Testing Email Configuration

### Method 1: Admin Panel Test

1. Go to `/admin/newsletter`
2. Fill in subject and content
3. Click "Имэйл илгээх"
4. Check for success/error messages

### Method 2: Backend Logs

Check the backend terminal for:

- ✅ "SMTP connection verified successfully"
- ✅ "Email sent successfully to: [email]"
- ❌ Error messages with details

## 🛠️ Troubleshooting

### Common Issues:

#### 1. "SMTP_CONFIG_MISSING"

**Problem:** Environment variables not set
**Solution:** Add SMTP variables to `.env` file

#### 2. "SMTP_VERIFICATION_FAILED"

**Problem:** Invalid credentials or server settings
**Solution:**

- Check email/password
- Verify 2FA is enabled (Gmail)
- Use app password, not regular password

#### 3. "Authentication failed"

**Problem:** Wrong password or username
**Solution:**

- Use app password for Gmail
- Check email address spelling
- Verify account permissions

#### 4. "Connection timeout"

**Problem:** Network or firewall issues
**Solution:**

- Check internet connection
- Verify SMTP host/port
- Check firewall settings

## 📝 Example .env File

```env
# Database Configuration
DATABASE_URL='postgresql://neondb_owner:npg_pjT1g0KQheGa@ep-morning-block-a1epltl5-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=5001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN="http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005"

# SMTP Configuration for Email Sending
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FRONTEND_URL="http://localhost:3000"
```

## 🔒 Security Notes

1. **Never commit `.env` file** to version control
2. **Use app passwords** instead of regular passwords
3. **Enable 2FA** on your email account
4. **Use environment variables** in production

## 🚀 Production Deployment

For production, set these environment variables in your hosting platform:

- **Render:** Environment variables in dashboard
- **Vercel:** Environment variables in project settings
- **Heroku:** `heroku config:set SMTP_USER=...`
- **Railway:** Environment variables in dashboard

## 📞 Support

If you encounter issues:

1. Check backend logs for detailed error messages
2. Verify SMTP configuration
3. Test with a simple email client first
4. Contact support with error details
