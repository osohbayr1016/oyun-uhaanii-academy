# Newsletter System Setup Guide

## Overview

This newsletter system allows users to subscribe to weekly emails from the academy. It includes:

- User subscription via footer form
- Admin interface for managing subscribers and sending emails
- Automatic unsubscribe functionality
- Weekly email sending capability

## Features

✅ **User Subscription**: Email input in footer  
✅ **Admin Management**: View subscribers, send emails, view statistics  
✅ **Unsubscribe**: One-click unsubscribe via email link  
✅ **Email Templates**: HTML formatted emails with academy branding  
✅ **Statistics**: Track subscribers, unsubscribes, and weekly growth

## Setup Instructions

### 1. Environment Variables

Add these to your `.env` file in the backend:

```env
# SMTP Configuration (for sending emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL (for unsubscribe links)
FRONTEND_URL=http://localhost:3000
```

### 2. Gmail Setup (Recommended)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password as `SMTP_PASS`

### 3. Database Migration

The newsletter table has been added to the database. Run:

```bash
cd back-end
npx prisma migrate dev
```

### 4. Testing the System

#### Test User Subscription:

1. Go to the website footer
2. Enter an email address in "Мэдээний жагсаалтад бүртгүүлэх"
3. Click "Бүртгүүлэх"
4. Check the database for the new subscription

#### Test Admin Interface:

1. Login as admin
2. Go to `/admin/newsletter`
3. View subscribers and statistics
4. Send a test email

#### Test Manual Email Sending:

```bash
cd back-end
npm run newsletter:send
```

### 5. Weekly Email Automation

#### Option A: Cron Job (Linux/Mac)

Add to crontab to send weekly emails:

```bash
# Edit crontab
crontab -e

# Add this line to send every Monday at 9 AM
0 9 * * 1 cd /path/to/your/project/back-end && npm run newsletter:send
```

#### Option B: Windows Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger to weekly on Monday
4. Set action to run: `npm run newsletter:send`
5. Set start in: `C:\path\to\your\project\back-end`

#### Option C: Cloud Services

- **Vercel Cron**: Add to `vercel.json`
- **GitHub Actions**: Create workflow
- **AWS Lambda**: Set up scheduled function

### 6. Email Template Customization

The weekly email template is in `back-end/scripts/sendWeeklyNewsletter.ts`. You can customize:

- Subject line
- Content structure
- Academy branding
- Links and call-to-actions

### 7. Admin Features

#### Available Admin Functions:

- **View Subscribers**: See all active and inactive subscribers
- **Send Manual Emails**: Send custom emails to all subscribers
- **View Statistics**: Track growth and engagement
- **Monitor Unsubscribes**: See who has unsubscribed

#### Admin Routes:

- `/admin/newsletter` - Main newsletter management page
- `/api/admin/newsletter/subscribers` - Get subscriber list
- `/api/admin/newsletter/send` - Send manual email
- `/api/admin/newsletter/stats` - Get statistics

### 8. User Experience

#### Subscription Flow:

1. User enters email in footer
2. System validates email format
3. Checks for existing subscription
4. Creates new subscription or reactivates
5. Shows success/error message

#### Unsubscribe Flow:

1. User clicks unsubscribe link in email
2. System validates unsubscribe token
3. Deactivates subscription
4. Shows confirmation page
5. Redirects to homepage

### 9. Security Features

- **Email Validation**: Basic format checking
- **Duplicate Prevention**: One subscription per email
- **Secure Unsubscribe**: Token-based unsubscribe links
- **Admin Protection**: Admin-only access to management features

### 10. Troubleshooting

#### Common Issues:

**Emails not sending:**

- Check SMTP credentials
- Verify Gmail app password
- Check firewall/network settings

**Subscriptions not working:**

- Check database connection
- Verify API routes are working
- Check frontend-backend communication

**Admin access issues:**

- Verify user has admin role
- Check authentication token
- Ensure proper authorization headers

#### Debug Commands:

```bash
# Test database connection
npx prisma studio

# Test email sending
npm run newsletter:send

# Check logs
tail -f logs/app.log
```

## API Endpoints

### Public Endpoints:

- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/unsubscribe/:token` - Unsubscribe from newsletter

### Admin Endpoints (Protected):

- `GET /api/newsletter/subscribers` - Get all subscribers
- `POST /api/newsletter/send` - Send newsletter email
- `GET /api/newsletter/stats` - Get newsletter statistics

## Database Schema

```sql
model Newsletter {
  id                String    @id @default(uuid())
  email             String    @unique
  isActive          Boolean   @default(true)
  subscribedAt      DateTime  @default(now())
  lastEmailSent     DateTime?
  unsubscribeToken  String    @unique @default(uuid())
}
```

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review server logs
3. Test individual components
4. Contact the development team

---

**Note**: This system is designed for weekly newsletters. For daily or real-time notifications, consider implementing a different notification system.
