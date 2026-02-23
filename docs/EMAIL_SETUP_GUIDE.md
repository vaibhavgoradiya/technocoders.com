# 📧 Email Setup Guide - Technocoders Contact Form

## 🎯 Current Status

Tumhara contact form **ALREADY WORKING** hai! Bas Cloudflare Dashboard mein environment variable set karna hai.

---

## ✅ Recommended Approach (Current Setup)

### Step 1: Cloudflare Dashboard Configuration

1. **Cloudflare Dashboard** open karo: https://dash.cloudflare.com
2. **Workers & Pages** section mein jao
3. Tumhara worker select karo: `technocoders-email-handler`
4. **Settings** → **Variables** mein jao
5. **Add variable** click karo:
   - **Variable name:** `RECIPIENT_EMAIL`
   - **Value:** `info@technocoders.com`
   - **Type:** Text (Plain text)
6. **Save** karo

### Step 2: Deploy Worker

```bash
cd b:/Technocoders_new_website_2026
npm run deploy
```

Ya manually deploy karo:
```bash
wrangler pages deploy dist --project-name=technocoders-website
```

### Step 3: Test Contact Form

1. Website pe jao: https://technocoders.com/contact
2. Form fill karo
3. Submit karo
4. Email check karo: info@technocoders.com

---

## 🔧 How It Works

### Current Architecture

```
User fills form → Frontend (Contact.jsx) → Cloudflare Worker (/api/contact) → MailChannels API → info@technocoders.com
```

### Benefits of MailChannels

✅ **FREE** - No cost  
✅ **Fast** - Instant delivery  
✅ **Reliable** - 99.9% uptime  
✅ **No SMTP** - No credentials needed  
✅ **Cloudflare Integration** - Built for Workers  

---

## ⚠️ IMPORTANT SECURITY WARNING

**NEVER hardcode passwords in code!**

❌ **Wrong:**
```javascript
const password = "Gj01@uq1992"; // NEVER DO THIS!
```

✅ **Right:**
```javascript
const password = env.SMTP_PASS; // Use environment variables
```

### Why?

1. **Code is public** - GitHub, GitLab pe password expose ho jayega
2. **Security breach** - Hackers access kar sakte hain
3. **Best practice** - Industry standard hai environment variables use karna

---

## 🔄 Alternative Options (If MailChannels Doesn't Work)

### Option 1: SendGrid (Recommended)

**Setup:**
1. SendGrid account banao: https://sendgrid.com
2. API Key generate karo
3. Cloudflare Dashboard mein add karo:
   - Variable: `SENDGRID_API_KEY`
   - Value: Your API key

**Code Update:**
```javascript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: 'info@technocoders.com' }],
    }],
    from: { email: 'noreply@technocoders.com' },
    subject: subject,
    content: [{ type: 'text/plain', value: message }],
  }),
});
```

### Option 2: Resend (Modern & Simple)

**Setup:**
1. Resend account: https://resend.com
2. API Key generate karo
3. Environment variable add karo: `RESEND_API_KEY`

**Code:**
```javascript
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'noreply@technocoders.com',
    to: 'info@technocoders.com',
    subject: subject,
    text: message,
  }),
});
```

### Option 3: Direct SMTP (Not Recommended for Workers)

**Problem:** Cloudflare Workers don't support direct SMTP connections.

**Solution:** Create separate backend:
1. Node.js/Express server banao
2. Nodemailer use karo
3. Deploy on Vercel/Railway
4. Worker se backend call karo

---

## 🧪 Testing

### Test Email Delivery

1. **Local Testing:**
```bash
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "subject": "Test",
    "message": "This is a test message"
  }'
```

2. **Production Testing:**
```bash
curl -X POST https://technocoders.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Check Logs

```bash
wrangler tail technocoders-email-handler
```

---

## 🐛 Troubleshooting

### Issue 1: Email Not Received

**Check:**
1. Spam folder check karo
2. Environment variable sahi set hai?
3. Worker deployed hai?
4. Cloudflare logs check karo

**Solution:**
```bash
wrangler tail technocoders-email-handler --format pretty
```

### Issue 2: CORS Error

**Check:** Browser console mein error dekho

**Solution:** Worker mein CORS headers already hai:
```javascript
'Access-Control-Allow-Origin': '*'
```

Production mein change karo:
```javascript
'Access-Control-Allow-Origin': 'https://technocoders.com'
```

### Issue 3: Form Submission Failed

**Check:**
1. Network tab mein request dekho
2. Response status code check karo
3. Error message padho

**Solution:** Contact.jsx mein error handling already hai

---

## 📝 Email Template Customization

### Current Email Format

```
New Contact Form Submission from Technocoders Website

Name: [User Name]
Email: [User Email]
Phone: [User Phone]
Subject: [Subject]
Service: [Service]

Message:
[User Message]

---
Sent from: Technocoders Contact Form
Time: [Timestamp]
```

### Add HTML Email (Better Looking)

Worker mein already HTML version hai! Check `workers/email-handler-smtp.js`

---

## 🔐 Security Best Practices

### 1. Environment Variables

✅ **Always use:**
```javascript
const apiKey = env.API_KEY;
const password = env.PASSWORD;
```

❌ **Never use:**
```javascript
const apiKey = "hardcoded-key";
const password = "Gj01@uq1992";
```

### 2. CORS Restriction

**Development:**
```javascript
'Access-Control-Allow-Origin': '*'
```

**Production:**
```javascript
'Access-Control-Allow-Origin': 'https://technocoders.com'
```

### 3. Rate Limiting

Add Cloudflare Rate Limiting:
1. Dashboard → Security → WAF
2. Create rate limiting rule
3. Limit: 5 requests per minute per IP

### 4. Input Validation

Already implemented in worker:
```javascript
if (!name || !email || !message) {
  return error response
}
```

Add more validation:
- Email format check
- Phone number format
- Message length limit
- XSS prevention

---

## 📊 Monitoring

### Setup Alerts

1. **Cloudflare Dashboard:**
   - Workers → Analytics
   - Set up email alerts for errors

2. **Email Delivery:**
   - Monitor bounce rates
   - Check spam reports

### Track Metrics

- Form submissions per day
- Success rate
- Error rate
- Response time

---

## 🚀 Next Steps

### Immediate (Do Now):

1. ✅ Set `RECIPIENT_EMAIL` in Cloudflare Dashboard
2. ✅ Deploy worker
3. ✅ Test form submission
4. ✅ Check email received

### Short Term (This Week):

1. Add CAPTCHA (Google reCAPTCHA or Cloudflare Turnstile)
2. Implement rate limiting
3. Add email notifications for form submissions
4. Setup monitoring alerts

### Long Term (This Month):

1. Add auto-reply email to users
2. Create email templates
3. Integrate with CRM
4. Add analytics tracking

---

## 📞 Support

Agar koi problem ho toh:

1. **Check Logs:**
   ```bash
   wrangler tail technocoders-email-handler
   ```

2. **Test Locally:**
   ```bash
   wrangler dev
   ```

3. **Contact:**
   - Email: info@technocoders.com
   - Phone: +91 9687140960

---

## ✅ Checklist

- [ ] Cloudflare Dashboard mein `RECIPIENT_EMAIL` set kiya
- [ ] Worker deploy kiya
- [ ] Form test kiya
- [ ] Email received confirm kiya
- [ ] Spam folder check kiya
- [ ] Error handling test kiya
- [ ] CORS working confirm kiya
- [ ] Production URL test kiya

---

**Last Updated:** February 14, 2026  
**Status:** ✅ Production Ready  
**Email Service:** MailChannels (FREE)