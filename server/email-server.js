/**
 * Node.js Email Server using Nodemailer
 * This server handles contact form submissions using webmail SMTP
 */

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create Nodemailer transporter with Technocoders email SMTP
// Fallback configuration if .env file is not available
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'as.cheapohosting.com',
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER || 'info@technocoders.com',
    pass: process.env.SMTP_PASS || '6sZ4HUP4L3Zv@Vw',
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  }
});

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║           📧 SMTP Configuration Details                   ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('   🌐 Host:', process.env.SMTP_HOST || 'mail.technocoders.com');
console.log('   🔌 Port:', process.env.SMTP_PORT || 465);
console.log('   🔒 Secure:', process.env.SMTP_SECURE === 'true' ? 'Yes (SSL/TLS)' : 'No');
console.log('   👤 User:', process.env.SMTP_USER || 'info@technocoders.com');
console.log('   🔑 Pass:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
console.log('   📬 Recipient:', process.env.RECIPIENT_EMAIL || 'info@technocoders.com');
console.log('════════════════════════════════════════════════════════════\n');

// Verify SMTP connection with detailed logging
console.log('🔄 Testing SMTP connection...\n');
transporter.verify((error, success) => {
  if (error) {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║           ❌ SMTP CONNECTION FAILED                        ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Response Code:', error.responseCode);
    console.error('Command:', error.command);
    console.log('\n💡 Troubleshooting Tips:');
    console.log('   1. Check if email password is correct');
    console.log('   2. Verify SMTP host: mail.technocoders.com');
    console.log('   3. Confirm SMTP port: 465 (SSL/TLS)');
    console.log('   4. Check if email account exists');
    console.log('   5. Verify firewall/antivirus settings');
    console.log('════════════════════════════════════════════════════════════\n');
  } else {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║           ✅ SMTP CONNECTION SUCCESSFUL                    ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('   ✓ Server is ready to send emails');
    console.log('   ✓ Authentication successful');
    console.log('   ✓ Connection established to mail.technocoders.com');
    console.log('════════════════════════════════════════════════════════════\n');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, service } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Email content for admin
    const adminEmailContent = `
New Contact Form Submission from Technocoders Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Contact Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone || 'Not provided'}
🏢 Company/Service: ${service || 'Not specified'}
📝 Subject: ${subject || 'General Inquiry'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Submitted: ${new Date().toLocaleString('en-IN', { 
  timeZone: 'Asia/Kolkata',
  dateStyle: 'full',
  timeStyle: 'long'
})}

🌐 Source: Technocoders Contact Form
    `.trim();

    // HTML version for admin
    const adminEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #5eb3c7 0%, #7dc4d6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
    .label { font-weight: bold; color: #5eb3c7; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #5eb3c7; margin-top: 15px; }
    .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎉 New Contact Form Submission</h2>
      <p>Technocoders Website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">📧 Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">📱 Phone:</div>
        <div class="value">${phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">🏢 Company/Service:</div>
        <div class="value">${service || 'Not specified'}</div>
      </div>
      <div class="field">
        <div class="label">📝 Subject:</div>
        <div class="value">${subject || 'General Inquiry'}</div>
      </div>
      <div class="message-box">
        <div class="label">💬 Message:</div>
        <div class="value">${message.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="field">
        <div class="label">⏰ Submitted:</div>
        <div class="value">${new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'long'
        })}</div>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from Technocoders Contact Form</p>
      <p>© ${new Date().getFullYear()} Technocoders. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Auto-reply email for customer
    const customerEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #5eb3c7 0%, #7dc4d6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
    .message { background: white; padding: 20px; border-radius: 4px; margin: 20px 0; }
    .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    .button { display: inline-block; padding: 12px 30px; background: #5eb3c7; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">TECHNOCODERS</div>
      <h2>Thank You for Contacting Us!</h2>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to Technocoders! We have received your message and our team will review it shortly.</p>
      
      <div class="message">
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <p>We typically respond within 24 hours during business days. If your inquiry is urgent, please feel free to call us at <strong>+91 9687140960</strong>.</p>
      
      <p>In the meantime, feel free to explore our services:</p>
      <a href="https://technocoders.com/services" class="button">View Our Services</a>
      
      <p>Best regards,<br>
      <strong>Technocoders Team</strong><br>
      AI-First IT Solutions</p>
    </div>
    <div class="footer">
      <p><strong>Technocoders</strong></p>
      <p>📧 info@technocoders.com | 📱 +91 9687140960</p>
      <p>🌐 <a href="https://technocoders.com" style="color: #5eb3c7;">technocoders.com</a></p>
      <p>© ${new Date().getFullYear()} Technocoders. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to admin
    const adminMailOptions = {
      from: {
        name: 'Technocoders Website',
        address: process.env.SMTP_USER || 'info@technocoders.com'
      },
      to: process.env.RECIPIENT_EMAIL || 'info@technocoders.com',
      replyTo: {
        name: name,
        address: email
      },
      subject: `🔔 New Contact Form: ${subject || 'General Inquiry'}`,
      text: adminEmailContent,
      html: adminEmailHTML
    };

    console.log('📧 Sending admin email to:', process.env.RECIPIENT_EMAIL || 'info@technocoders.com');

    // Send auto-reply to customer
    const customerMailOptions = {
      from: {
        name: 'Technocoders',
        address: process.env.SMTP_USER || 'info@technocoders.com'
      },
      to: {
        name: name,
        address: email
      },
      subject: 'Thank you for contacting Technocoders!',
      html: customerEmailHTML
    };

    console.log('📧 Sending auto-reply to:', email);

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin email sent successfully');
    
    await transporter.sendMail(customerMailOptions);
    console.log('✅ Customer auto-reply sent successfully');

    // Return success response
    res.json({
      success: true,
      message: 'Email sent successfully! We will get back to you soon.'
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later or contact us directly at info@technocoders.com'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Technocoders Email Server                            ║
║                                                            ║
║   ✅ Server running on port ${PORT}                           ║
║   📧 SMTP Host: ${process.env.SMTP_HOST || 'Not configured'}                    ║
║   👤 SMTP User: ${process.env.SMTP_USER || 'Not configured'}           ║
║   📬 Recipient: ${process.env.RECIPIENT_EMAIL || 'Not configured'}           ║
║                                                            ║
║   Endpoints:                                               ║
║   - GET  /api/health  (Health check)                      ║
║   - POST /api/contact (Send email)                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;