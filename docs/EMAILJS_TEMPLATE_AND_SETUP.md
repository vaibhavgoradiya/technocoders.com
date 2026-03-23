# 📧 EmailJS Complete Setup Guide - Technocoders Contact Form

**Date:** 23 March, 2026  
**Contact Form Fields:** name, email, phone, company, message

---

## 📋 Contact Form Fields Analysis

### Current Form Fields:
```javascript
{
  name: '',      // User's full name
  email: '',     // User's email address
  phone: '',     // User's phone number (optional)
  company: '',   // Company name (optional)
  message: ''    // User's message
}
```

---

## 🎨 Updated EmailJS Template

### Template HTML Code (EmailJS Dashboard में paste करें):

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px; max-width: 600px; margin: 0 auto;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #5eb3c7 0%, #7dc4d6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">🎉 New Contact Form Submission</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Technocoders Website</p>
  </div>

  <!-- Message Info -->
  <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd;">
    <div style="margin-bottom: 20px;">
      A message by <strong>{{name}}</strong> has been received. Kindly respond at your earliest convenience.
    </div>

    <!-- Contact Details Card -->
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h3 style="margin: 0 0 15px 0; color: #5eb3c7; font-size: 16px;">📋 Contact Details</h3>
      
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: bold; width: 120px;">👤 Name:</td>
          <td style="padding: 8px 0; color: #333;">{{name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: bold;">📧 Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:{{email}}" style="color: #5eb3c7; text-decoration: none;">{{email}}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: bold;">📱 Phone:</td>
          <td style="padding: 8px 0; color: #333;">{{phone}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: bold;">🏢 Company:</td>
          <td style="padding: 8px 0; color: #333;">{{company}}</td>
        </tr>
      </table>
    </div>

    <!-- Message Card -->
    <div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: lightgrey;">
      <table role="presentation">
        <tr>
          <td style="vertical-align: top;">
            <div style="padding: 6px 10px; margin: 0 10px; background-color: aliceblue; border-radius: 5px; font-size: 26px;" role="img">
              💬
            </div>
          </td>
          <td style="vertical-align: top;">
            <div style="color: #2c3e50; font-size: 16px;">
              <strong>{{name}}</strong>
            </div>
            <div style="color: #cccccc; font-size: 13px;">{{time}}</div>
            <div style="margin-top: 10px; padding: 15px; background: white; border-left: 4px solid #5eb3c7; border-radius: 4px;">
              <p style="font-size: 16px; margin: 0; white-space: pre-wrap; line-height: 1.6;">{{message}}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Action Button -->
    <div style="margin-top: 30px; text-align: center;">
      <a href="mailto:{{email}}" style="display: inline-block; padding: 12px 30px; background: #5eb3c7; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
        Reply to {{name}}
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
    <p style="margin: 0 0 10px 0;"><strong>Technocoders</strong></p>
    <p style="margin: 0; opacity: 0.8;">📧 info@technocoders.com | 📱 +91 9687140960</p>
    <p style="margin: 10px 0 0 0; opacity: 0.6;">This email was sent from Technocoders Contact Form</p>
    <p style="margin: 5px 0 0 0; opacity: 0.6;">© 2026 Technocoders. All rights reserved.</p>
  </div>
</div>
```

---

## 🔑 EmailJS Template Variables

### Variables to use in EmailJS Dashboard:

```
{{name}}      - User's full name
{{email}}     - User's email address
{{phone}}     - User's phone number
{{company}}   - Company name
{{message}}   - User's message
{{time}}      - Submission timestamp (auto-generated)
```

---

## 💻 Complete Contact.jsx Code

### Updated handleSubmit function:

```javascript
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Check if URL has hash and scroll to inquiry form
    if (window.location.hash === '#inquiry-form') {
      const element = document.getElementById('inquiry-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Get current timestamp in IST
      const now = new Date();
      const istTime = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      // Prepare template parameters
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not specified',
        message: formData.message,
        time: istTime
      };

      console.log('📧 Sending email via EmailJS...');
      console.log('📝 Template params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Email sent successfully:', result.text);

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact us directly at info@technocoders.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component (form JSX remains same)
};

export default Contact;
```

---

## 📦 Installation Steps

### Step 1: Install EmailJS
```bash
npm install @emailjs/browser
```

### Step 2: Add Keys to .env
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 3: Update Contact.jsx
- Add `import emailjs from '@emailjs/browser';` at top
- Replace `handleSubmit` function with code above

### Step 4: Create EmailJS Template
1. Go to EmailJS Dashboard
2. Create new template
3. Paste the HTML code provided above
4. Save template and copy Template ID

---

## 🎯 EmailJS Dashboard Setup

### Template Settings:

**To Email:** `info@technocoders.com`  
**From Name:** `{{name}}`  
**From Email:** `{{email}}`  
**Subject:** `New Contact Form: {{company}}`  
**Reply To:** `{{email}}`

### Auto-Reply (Optional):

You can also setup auto-reply in EmailJS:

**Subject:** `Thank you for contacting Technocoders!`  
**Message:**
```
Dear {{name}},

Thank you for reaching out to Technocoders! We have received your message and our team will review it shortly.

We typically respond within 24 hours during business days. If your inquiry is urgent, please feel free to call us at +91 9687140960.

Best regards,
Technocoders Team
AI-First IT Solutions

---
Technocoders
📧 info@technocoders.com
📱 +91 9687140960
🌐 technocoders.com
```

---

## ✅ Testing

### Test the Form:

1. Start dev server:
```bash
npm run dev
```

2. Go to: `http://localhost:5173/contact`

3. Fill the form:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: +91 9876543210
   - Company: Test Company
   - Message: This is a test message

4. Submit and check:
   - Console for logs
   - Your email inbox
   - EmailJS dashboard for delivery status

---

## 🔍 Troubleshooting

### Common Issues:

**Issue 1: "Public Key is required"**
```
Solution: Check .env file has VITE_EMAILJS_PUBLIC_KEY
```

**Issue 2: "Template not found"**
```
Solution: Verify VITE_EMAILJS_TEMPLATE_ID matches dashboard
```

**Issue 3: "Service not found"**
```
Solution: Verify VITE_EMAILJS_SERVICE_ID matches dashboard
```

**Issue 4: Environment variables not loading**
```
Solution: Restart dev server after adding .env variables
```

---

## 📊 Field Mapping

| Contact Form Field | EmailJS Variable | Required | Default |
|-------------------|------------------|----------|---------|
| `formData.name` | `{{name}}` | Yes | - |
| `formData.email` | `{{email}}` | Yes | - |
| `formData.phone` | `{{phone}}` | No | "Not provided" |
| `formData.company` | `{{company}}` | No | "Not specified" |
| `formData.message` | `{{message}}` | Yes | - |
| Auto-generated | `{{time}}` | Auto | IST timestamp |

---

## 🎨 Template Features

### Included in Template:
- ✅ Branded Technocoders colors (#5eb3c7)
- ✅ Gradient header
- ✅ All form fields displayed
- ✅ Clickable email link
- ✅ Reply button
- ✅ Professional footer
- ✅ Responsive design
- ✅ Emoji icons
- ✅ Timestamp in IST
- ✅ Message with line breaks preserved

---

**Setup Ready!** 🎉

Bas ab aap:
1. EmailJS keys add karein `.env` mein
2. `npm install @emailjs/browser` run karein
3. Contact.jsx update karein
4. Template create karein EmailJS dashboard mein

**© 2026 Technocoders. All rights reserved.**