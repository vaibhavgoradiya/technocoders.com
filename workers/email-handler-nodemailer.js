/**
 * Cloudflare Worker with Nodemailer-compatible email sending
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Cloudflare Dashboard mein jao
 * 2. Workers & Pages → Your Worker → Settings → Variables
 * 3. Ye environment variables add karo:
 * 
 *    SMTP_HOST = "mail.technocoders.com" (ya jo bhi tumhara SMTP server hai)
 *    SMTP_PORT = "587" (ya 465 for SSL)
 *    SMTP_USER = "info@technocoders.com"
 *    SMTP_PASS = "Gj01@uq1992" (tumhara password - DASHBOARD MEIN, CODE MEIN NAHI!)
 *    RECIPIENT_EMAIL = "info@technocoders.com"
 * 
 * 4. Save karo aur deploy karo
 * 
 * IMPORTANT: Password KABHI code mein mat likho! Hamesha environment variables use karo!
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    try {
      const formData = await request.json();
      const { name, email, phone, subject, message, service } = formData;

      // Validate
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Email content
      const emailSubject = `New Contact Form: ${subject || 'General Inquiry'}`;
      const emailBody = `
New Contact Form Submission from Technocoders Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone || 'Not provided'}
🏢 Company: ${service || 'Not specified'}
📝 Subject: ${subject || 'General Inquiry'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Sent: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 From: Technocoders Contact Form
      `.trim();

      const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #5eb3c7 0%, #7dc4d6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; padding: 15px; background: white; border-left: 4px solid #5eb3c7; border-radius: 4px; }
    .field strong { color: #5eb3c7; display: block; margin-bottom: 5px; }
    .message-box { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; border: 1px solid #e0e0e0; }
    .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🚀 New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0;">Technocoders Website</p>
    </div>
    <div class="content">
      <div class="field">
        <strong>👤 Name</strong>
        ${name}
      </div>
      <div class="field">
        <strong>📧 Email</strong>
        <a href="mailto:${email}" style="color: #5eb3c7;">${email}</a>
      </div>
      <div class="field">
        <strong>📱 Phone</strong>
        ${phone || 'Not provided'}
      </div>
      <div class="field">
        <strong>🏢 Company/Service</strong>
        ${service || 'Not specified'}
      </div>
      <div class="field">
        <strong>📝 Subject</strong>
        ${subject || 'General Inquiry'}
      </div>
      <div class="message-box">
        <strong style="color: #5eb3c7; display: block; margin-bottom: 10px;">💬 Message:</strong>
        <p style="white-space: pre-wrap; margin: 0;">${message}</p>
      </div>
    </div>
    <div class="footer">
      <p>📅 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      <p>🌐 Sent from Technocoders Contact Form</p>
    </div>
  </div>
</body>
</html>
      `.trim();

      // OPTION 1: Use MailChannels (Recommended - FREE)
      const mailChannelsResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: env.RECIPIENT_EMAIL || 'info@technocoders.com' }],
          }],
          from: {
            email: 'noreply@technocoders.com',
            name: 'Technocoders Website',
          },
          reply_to: { email: email, name: name },
          subject: emailSubject,
          content: [
            { type: 'text/plain', value: emailBody },
            { type: 'text/html', value: htmlBody },
          ],
        }),
      });

      if (!mailChannelsResponse.ok) {
        throw new Error('Failed to send email');
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully to info@technocoders.com' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      console.error('Error:', error);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to send email. Please contact us directly at info@technocoders.com or call +91 9687140960' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 SETUP GUIDE - STEP BY STEP

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Cloudflare Dashboard Setup
───────────────────────────────────

1. Cloudflare Dashboard open karo: https://dash.cloudflare.com
2. Workers & Pages section mein jao
3. "technocoders-email-handler" worker select karo
4. Settings → Variables → Environment Variables mein jao
5. Add these variables:

   Variable Name: RECIPIENT_EMAIL
   Value: info@technocoders.com
   Type: Text
   [Save]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 2: Deploy Worker
──────────────────────

Terminal mein ye command run karo:

cd b:/Technocoders_new_website_2026
npm run deploy

Ya manually:

wrangler pages deploy dist --project-name=technocoders-website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 3: Test Contact Form
──────────────────────────

1. Website open karo: https://technocoders.com/contact
2. Form fill karo:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. Submit karo
4. Check email: info@technocoders.com
5. Spam folder bhi check karo (pehli baar spam mein ja sakta hai)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TROUBLESHOOTING
────────────────

❌ Email nahi aa raha?

1. Spam folder check karo
2. Cloudflare logs dekho:
   wrangler tail technocoders-email-handler

3. Environment variable check karo:
   - Dashboard → Workers → Settings → Variables
   - RECIPIENT_EMAIL set hai?

4. Worker deployed hai?
   - Dashboard → Workers → Deployments

❌ CORS error?

Browser console mein error dekho. Worker mein CORS headers already set hain.

❌ Form submit nahi ho raha?

1. Browser console check karo (F12)
2. Network tab mein request dekho
3. Response status code check karo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHY NOT HARDCODE PASSWORD?
───────────────────────────

❌ NEVER DO THIS:
const password = "Gj01@uq1992"; // Code mein password = DANGER!

Problems:
1. Code GitHub pe push hua = Password leak
2. Anyone can see = Security breach
3. Hard to change = Har baar code update karna padega
4. Not professional = Industry standard nahi hai

✅ ALWAYS DO THIS:
const password = env.SMTP_PASS; // Environment variable = SAFE!

Benefits:
1. Password secure rahega
2. Easy to change (dashboard se)
3. Professional approach
4. Industry standard

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CURRENT SETUP (MailChannels)
─────────────────────────────

✅ FREE - No cost
✅ Fast - Instant delivery
✅ Reliable - 99.9% uptime
✅ No credentials needed - Just works!
✅ Cloudflare optimized

Email Flow:
User Form → Cloudflare Worker → MailChannels → info@technocoders.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS
──────────

1. ✅ Set RECIPIENT_EMAIL in Cloudflare Dashboard
2. ✅ Deploy worker
3. ✅ Test form
4. ✅ Confirm email received
5. 📖 Read docs/EMAIL_SETUP_GUIDE.md for advanced features

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUPPORT
───────

Email: info@technocoders.com
Phone: +91 9687140960
Website: https://technocoders.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/