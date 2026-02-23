/**
 * Cloudflare Worker for handling contact form submissions with SMTP
 * IMPORTANT: This approach requires email credentials to be stored as environment variables
 * 
 * Required Environment Variables (Set in Cloudflare Dashboard):
 * - SMTP_HOST: Your SMTP server (e.g., smtp.gmail.com, mail.technocoders.com)
 * - SMTP_PORT: SMTP port (usually 587 for TLS, 465 for SSL)
 * - SMTP_USER: Your email address (info@technocoders.com)
 * - SMTP_PASS: Your email password (NEVER hardcode this!)
 * - RECIPIENT_EMAIL: Email to receive form submissions
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      // Parse form data
      const formData = await request.json();
      const { name, email, phone, subject, message, service } = formData;

      // Validate required fields
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
      const emailContent = `
New Contact Form Submission from Technocoders Website

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'General Inquiry'}
Service: ${service || 'Not specified'}

Message:
${message}

---
Sent from: Technocoders Contact Form
Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `.trim();

      // OPTION 1: Use MailChannels (Current - Recommended)
      // This is FREE and works great with Cloudflare Workers
      const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: env.RECIPIENT_EMAIL || 'info@technocoders.com' }],
              dkim_domain: 'technocoders.com',
              dkim_selector: 'mailchannels',
            },
          ],
          from: {
            email: 'noreply@technocoders.com',
            name: 'Technocoders Website',
          },
          reply_to: {
            email: email,
            name: name,
          },
          subject: `New Contact Form: ${subject || 'General Inquiry'}`,
          content: [
            {
              type: 'text/plain',
              value: emailContent,
            },
            {
              type: 'text/html',
              value: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #5eb3c7;">New Contact Form Submission</h2>
                  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                    <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
                    <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                  </div>
                  <div style="margin-top: 20px; padding: 20px; background: #fff; border-left: 4px solid #5eb3c7;">
                    <h3>Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                  </div>
                  <div style="margin-top: 20px; padding: 10px; background: #f9f9f9; font-size: 12px; color: #666;">
                    <p>Sent from: Technocoders Contact Form</p>
                    <p>Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                  </div>
                </div>
              `,
            },
          ],
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('MailChannels error:', errorText);
        throw new Error('Failed to send email via MailChannels');
      }

      // Return success response
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      console.error('Error processing request:', error);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to process request. Please try again or contact us directly at info@technocoders.com' 
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
ALTERNATIVE OPTION 2: Direct SMTP (Not recommended for Cloudflare Workers)

Cloudflare Workers don't support direct SMTP connections.
If you need SMTP, you have these options:

1. Use a third-party email API service:
   - SendGrid (https://sendgrid.com)
   - Mailgun (https://www.mailgun.com)
   - AWS SES (https://aws.amazon.com/ses/)
   - Resend (https://resend.com)

2. Use MailChannels (Current approach - FREE and works great)

3. Create a separate backend server (Node.js/Express) with nodemailer:
   - Deploy on Vercel, Railway, or your own server
   - Use nodemailer with your SMTP credentials
   - Call this backend from your Cloudflare Worker

Example with SendGrid:
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: env.RECIPIENT_EMAIL }],
    }],
    from: { email: 'noreply@technocoders.com' },
    subject: subject,
    content: [{ type: 'text/plain', value: emailContent }],
  }),
});
*/