# 🚀 Technocoders Website

AI-First Software Development Company Portfolio Website built with React, Vite, and modern web technologies.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646cff.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Email Setup](#email-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Documentation](#documentation)

---

## ✨ Features

### Core Features
- 🎨 **Modern Design** - Premium UI with glass-morphism effects
- ⚡ **High Performance** - 60fps GPU-accelerated animations
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎭 **Smooth Animations** - Framer Motion + GSAP
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- 🔒 **Secure** - Security headers and CORS protection
- 📧 **Contact Form** - Nodemailer with auto-reply
- 🎉 **Easter Eggs** - Konami code, confetti, matrix rain

### Pages
- 🏠 Home - Landing page with hero, showcase, features
- 📖 About - Company story and statistics
- 💼 Services - 6 service offerings
- 📞 Contact - Contact form with Cal.com integration
- 🏢 Inside - Company culture
- 📄 Privacy Policy & Terms

### Components (30+)
- Header with mobile menu
- Footer with social links
- Animated background
- Page transitions
- Scroll progress bar
- Custom cursor
- Loading skeletons
- And many more...

---

## 🔧 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.11** - Build tool
- **React Router DOM 7.12.0** - Routing
- **Framer Motion 12.30.0** - Animations
- **GSAP 3.14.2** - Advanced animations
- **Lucide React** - Icons
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web server
- **Nodemailer** - Email sending
- **CORS** - Cross-origin support
- **Dotenv** - Environment variables

### Deployment
- **Cloudflare Pages** - Frontend hosting
- **Cloudflare Workers** - Serverless functions (optional)
- **VPS/Cloud** - Email server hosting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Email account for SMTP (Gmail, Hostinger, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/technocoders/website.git
cd website
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your SMTP credentials:
```env
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=info@technocoders.com
```

4. **Start development servers**
```bash
npm run dev:all
```

This starts:
- Frontend: `http://localhost:5173`
- Email Server: `http://localhost:3001`

---

## 📧 Email Setup

### Quick Setup (Gmail)

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. **Configure `.env`**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=info@technocoders.com
```

4. **Test the setup**
```bash
npm run email-server
```

Visit: `http://localhost:3001/api/health`

### Detailed Setup Guide

For complete setup instructions including other email providers (Hostinger, Outlook, Yahoo), see:

📖 **[Nodemailer Setup Guide](docs/NODEMAILER_SETUP_GUIDE.md)**

---

## 💻 Development

### Available Scripts

```bash
# Start frontend only
npm run dev

# Start email server only
npm run email-server

# Start both frontend + email server
npm run dev:all

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

### Project Structure

```
technocoders-website/
├── src/
│   ├── components/      # React components (30+)
│   ├── pages/          # Page components (8)
│   ├── hooks/          # Custom hooks (9)
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app
│   └── main.jsx        # Entry point
├── server/
│   └── email-server.js # Email server
├── public/             # Static assets
├── docs/               # Documentation
├── .env.example        # Environment template
├── package.json        # Dependencies
└── vite.config.js      # Vite config
```

### Adding New Components

1. Create component file: `src/components/MyComponent.jsx`
2. Create styles: `src/components/MyComponent.css`
3. Import and use in pages

### Custom Hooks

Available hooks in `src/hooks/`:
- `useScrollAnimation` - Scroll-triggered animations
- `useTypewriter` - Typewriter text effect
- `useNumberCounter` - Animated counters
- `useParallax` - Parallax effects
- `useMagneticCursor` - Magnetic cursor
- And more...

---

## 🌐 Deployment

### Frontend (Cloudflare Pages)

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Cloudflare**
```bash
npm run deploy
```

Or use Cloudflare Dashboard:
- Build command: `npm run build`
- Output directory: `dist`

### Email Server (VPS/Cloud)

1. **Upload to server**
```bash
scp -r server/ .env user@your-server.com:/var/www/technocoders/
```

2. **Install dependencies**
```bash
ssh user@your-server.com
cd /var/www/technocoders
npm install --production
```

3. **Run with PM2**
```bash
npm install -g pm2
pm2 start server/email-server.js --name technocoders-email
pm2 save
pm2 startup
```

4. **Configure Nginx**
```nginx
location /api/contact {
    proxy_pass http://localhost:3001/api/contact;
}
```

For detailed deployment instructions, see:
📖 **[Deployment Guide](docs/NODEMAILER_SETUP_GUIDE.md#production-deployment)**

---

## 📚 Documentation

### Available Documentation

- 📖 [Complete Project Analysis](docs/COMPLETE_IN_DEPTH_PROJECT_ANALYSIS_2026.md)
- 📧 [Nodemailer Setup Guide](docs/NODEMAILER_SETUP_GUIDE.md)
- 🚀 [Cloudflare Deployment](docs/CLOUDFLARE_DEPLOYMENT.md)
- 📝 [Email Setup Guide](docs/EMAIL_SETUP_GUIDE.md)
- 🎨 [Premium Features](docs/PREMIUM_FEATURES_COMPLETE.md)
- 📊 [Design Improvements](docs/DESIGN_IMPROVEMENTS_SUMMARY.md)

---

## 🧪 Testing

### Test Email Server

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Test Contact Form

1. Start servers: `npm run dev:all`
2. Open: `http://localhost:5173/contact`
3. Fill and submit form
4. Check email inbox

---

## 🔒 Security

### Implemented Security Features

- ✅ Security headers (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ CORS protection
- ✅ Input validation
- ✅ Environment variables for sensitive data
- ✅ HTTPS in production

### Recommendations

- Add rate limiting
- Implement CAPTCHA
- Add CSP headers
- Use HTTPS only

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

**Technocoders**

- 🌐 Website: [technocoders.com](https://technocoders.com)
- 📧 Email: info@technocoders.com
- 📱 Phone: +91 9687140960
- 💼 LinkedIn: [linkedin.com/company/technocoders](https://linkedin.com/company/technocoders)
- 📘 Facebook: [facebook.com/technocoders1](https://facebook.com/technocoders1)
- 📸 Instagram: [@technocoders_](https://instagram.com/technocoders_)

---

## 🙏 Acknowledgments

- React team for amazing framework
- Vite team for blazing fast build tool
- Framer Motion for smooth animations
- GSAP for advanced animations
- Cloudflare for hosting and CDN
- All open-source contributors

---

## 📊 Project Stats

- **Components:** 30+
- **Pages:** 8
- **Custom Hooks:** 9
- **Lines of Code:** 15,000+
- **Performance Score:** 9.2/10
- **Status:** ✅ Production Ready

---

**Built with ❤️ by Technocoders**

*Last Updated: February 14, 2026*#   t e c h n o c o d e r s . c o m  
 