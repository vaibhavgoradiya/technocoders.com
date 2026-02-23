/**
 * Cloudflare Worker for handling contact form submissions
 * This worker receives form data and sends emails using SMTP
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

      // Send email using MailChannels (Cloudflare's email service)
      const emailResponse = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: env.RECIPIENT_EMAIL }], // info@technocoders.com
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
          ],
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
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
        error: 'Failed to process request' 
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