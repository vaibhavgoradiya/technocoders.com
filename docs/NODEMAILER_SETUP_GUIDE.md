# 📧 Nodemailer Setup Guide - Technocoders Website

Complete guide to setup and configure Nodemailer with webmail SMTP for the contact form.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Email Providers Setup](#email-providers-setup)
5. [Running the Server](#running-the-server)
6. [Testing](#testing)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

### What's Included

- **Node.js Email Server** (`server/email-server.js`)
- **Nodemailer Integration** with webmail SMTP
- **Environment Configuration** (`.env.example`)
- **Auto-reply Feature** for customers
- **HTML Email Templates** with professional design
- **CORS Support** for frontend integration
- **Error Handling** and validation

### Features

✅ Send emails via any webmail SMTP (Gmail, Hostinger, Outlook, etc.)  
✅ Professional HTML email templates  
✅ Auto-reply to customers  
✅ Environment variable configuration  
✅ CORS enabled for frontend  
✅ Input validation  
✅ Error handling  

---

## 📦 Installation

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `nodemailer` - Email sending library
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `concurrently` - Run multiple commands

### Step 2: Create Environment File

```bash
# Copy the example file
cp .env.example .env
```

---

## ⚙️ Configuration

### Edit `.env` File

Open `.env` and configure your email settings:

```env
# Server Port
PORT=3001

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Your Email Credentials
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Recipient Email
RECIPIENT_EMAIL=info@technocoders.com
```

---

## 📧 Email Providers Setup

### Gmail Setup (Recommended)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification

#### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Enter "Technocoders Website"
4. Click "Generate"
5. Copy the 16-character password

#### Step 3: Configure `.env`
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App password (remove spaces)
RECIPIENT_EMAIL=info@technocoders.com
```

---

### Hostinger Setup

#### Step 1: Get SMTP Credentials
1. Login to Hostinger Control Panel
2. Go to Email → Email Accounts
3. Note your email and password

#### Step 2: Configure `.env`
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@technocoders.com
SMTP_PASS=your-email-password
RECIPIENT_EMAIL=info@technocoders.com
```

---

### Outlook/Hotmail Setup

#### Step 1: Enable SMTP
1. Go to Outlook settings
2. Enable "Let apps use SMTP"

#### Step 2: Configure `.env`
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
RECIPIENT_EMAIL=info@technocoders.com
```

---

### Yahoo Mail Setup

#### Step 1: Generate App Password
1. Go to Yahoo Account Security
2. Generate App Password

#### Step 2: Configure `.env`
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=app-password
RECIPIENT_EMAIL=info@technocoders.com
```

---

## 🚀 Running the Server

### Development Mode

#### Option 1: Run Email Server Only
```bash
npm run email-server
```

#### Option 2: Run Both Frontend + Email Server
```bash
npm run dev:all
```

This will start:
- Vite dev server on `http://localhost:5173`
- Email server on `http://localhost:3001`

### Check Server Status

Visit: `http://localhost:3001/api/health`

Expected response:
```json
{
  "status": "ok",
  "message": "Email server is running"
}
```

---

## 🧪 Testing

### Test with cURL

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "subject": "Test Message",
    "message": "This is a test message",
    "service": "Web Development"
  }'
```

### Test with Postman

1. Create new POST request
2. URL: `http://localhost:3001/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+91 9876543210",
  "subject": "Test Message",
  "message": "This is a test message",
  "service": "Web Development"
}
```

### Test from Frontend

1. Start both servers: `npm run dev:all`
2. Open browser: `http://localhost:5173/contact`
3. Fill and submit the contact form
4. Check your email inbox

---

## 🌐 Production Deployment

### Option 1: Deploy to VPS/Cloud Server

#### Step 1: Upload Files
```bash
# Upload to server
scp -r server/ user@your-server.com:/var/www/technocoders/
scp .env user@your-server.com:/var/www/technocoders/
```

#### Step 2: Install Dependencies
```bash
ssh user@your-server.com
cd /var/www/technocoders
npm install --production
```

#### Step 3: Run with PM2
```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start server/email-server.js --name technocoders-email

# Save PM2 configuration
pm2 save

# Setup auto-start on reboot
pm2 startup
```

#### Step 4: Configure Nginx Proxy
```nginx
# /etc/nginx/sites-available/technocoders
server {
    listen 80;
    server_name technocoders.com;

    # Frontend (static files)
    location / {
        root /var/www/technocoders/dist;
        try_files $uri $uri/ /index.html;
    }

    # Email API
    location /api/contact {
        proxy_pass http://localhost:3001/api/contact;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Option 2: Deploy to Heroku

#### Step 1: Create `Procfile`
```
web: node server/email-server.js
```

#### Step 2: Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create technocoders-email

# Set environment variables
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=your-email@gmail.com
heroku config:set SMTP_PASS=your-app-password
heroku config:set RECIPIENT_EMAIL=info@technocoders.com

# Deploy
git push heroku main
```

#### Step 3: Update Frontend
```javascript
// src/pages/Contact.jsx
const apiUrl = import.meta.env.DEV 
  ? 'http://localhost:3001/api/contact'
  : 'https://technocoders-email.herokuapp.com/api/contact';
```

---

### Option 3: Deploy to Vercel/Netlify (Serverless)

#### Create Serverless Function

**Vercel:** `api/contact.js`
```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // ... rest of email logic
}
```

---

## 🔧 Troubleshooting

### Issue: "Invalid login" or "Authentication failed"

**Solution:**
- For Gmail: Use App Password, not regular password
- Enable "Less secure app access" (if not using 2FA)
- Check username and password are correct

### Issue: "Connection timeout"

**Solution:**
- Check SMTP host and port are correct
- Verify firewall allows outbound connections on port 587
- Try port 465 with `SMTP_SECURE=true`

### Issue: "Self-signed certificate"

**Solution:**
Add to transporter config:
```javascript
tls: {
  rejectUnauthorized: false
}
```

### Issue: CORS error in browser

**Solution:**
- Ensure email server is running
- Check CORS is enabled in `server/email-server.js`
- Verify API URL in Contact.jsx

### Issue: Emails going to spam

**Solution:**
- Use professional email domain (not Gmail)
- Setup SPF, DKIM, DMARC records
- Use dedicated SMTP service (SendGrid, Mailgun)

---

## 📊 Email Templates

### Admin Email (HTML)

Professional email with:
- Company branding
- Contact details in cards
- Formatted message
- Timestamp
- Reply-to customer email

### Customer Auto-reply (HTML)

Includes:
- Thank you message
- Copy of their message
- Expected response time
- Contact information
- Call-to-action button

---

## 🔐 Security Best Practices

1. **Never commit `.env` file** - Added to `.gitignore`
2. **Use App Passwords** - Not regular passwords
3. **Enable 2FA** - On email accounts
4. **Validate Input** - Server-side validation
5. **Rate Limiting** - Add rate limiting middleware
6. **HTTPS Only** - Use SSL in production
7. **Environment Variables** - Store sensitive data securely

---

## 📈 Monitoring

### Add Logging

```javascript
// server/email-server.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Add Error Tracking

```bash
npm install @sentry/node
```

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure `.env` file with your SMTP credentials
3. ✅ Test locally: `npm run dev:all`
4. ✅ Submit test form from contact page
5. ✅ Check email inbox for admin email
6. ✅ Check customer email for auto-reply
7. ✅ Deploy to production server
8. ✅ Update frontend API URL for production

---

## 📞 Support

For issues or questions:

**Email:** info@technocoders.com  
**Phone:** +91 9687140960  
**Website:** technocoders.com

---

**Setup Completed:** February 14, 2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

*This guide covers complete Nodemailer setup with webmail SMTP for Technocoders contact form.*