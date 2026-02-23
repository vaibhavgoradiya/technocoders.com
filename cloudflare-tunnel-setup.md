# 🚇 Cloudflare Tunnel Setup Guide

## 📋 Overview

Cloudflare Tunnel tumhare local Node.js email server ko internet pe expose karega **without VPS or port forwarding**. Yeh completely secure hai aur free hai!

---

## 🎯 What You'll Get

- ✅ Local server accessible at: `https://technocoders.com/api/contact`
- ✅ No VPS needed
- ✅ No port forwarding
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Free forever

---

## 📦 Step 1: Install Cloudflared

### Windows:
```powershell
# Download and install
winget install --id Cloudflare.cloudflared
```

**Or manually:**
1. Download: https://github.com/cloudflare/cloudflared/releases/latest
2. Download `cloudflared-windows-amd64.exe`
3. Rename to `cloudflared.exe`
4. Move to `C:\Windows\System32\` (or add to PATH)

### Verify Installation:
```bash
cloudflared --version
```

---

## 🔐 Step 2: Login to Cloudflare

```bash
cloudflared tunnel login
```

**What happens:**
1. Browser window opens
2. Select your domain: `technocoders.com`
3. Authorize
4. Certificate saved to: `~/.cloudflared/cert.pem`

---

## 🚇 Step 3: Create Tunnel

```bash
cloudflared tunnel create technocoders-email
```

**Output:**
```
Tunnel credentials written to: ~/.cloudflared/<TUNNEL-ID>.json
Created tunnel technocoders-email with id <TUNNEL-ID>
```

**Save the TUNNEL-ID!** You'll need it.

---

## ⚙️ Step 4: Configure Tunnel

Create configuration file:

**Windows:** `C:\Users\<YourUsername>\.cloudflared\config.yml`  
**Mac/Linux:** `~/.cloudflared/config.yml`

**Content:**
```yaml
tunnel: <YOUR-TUNNEL-ID>
credentials-file: C:\Users\<YourUsername>\.cloudflared\<TUNNEL-ID>.json

ingress:
  # Route /api/contact to local email server
  - hostname: technocoders.com
    path: /api/contact
    service: http://localhost:3001
  
  # Catch-all rule (required)
  - service: http_status:404
```

**Replace:**
- `<YOUR-TUNNEL-ID>` with actual tunnel ID
- `<YourUsername>` with your Windows username
- Path to credentials file

---

## 🌐 Step 5: Create DNS Record

```bash
cloudflared tunnel route dns technocoders-email technocoders.com
```

**Or manually in Cloudflare Dashboard:**
1. Go to: DNS → Records
2. Add CNAME record:
   - **Type:** CNAME
   - **Name:** `@` (or subdomain like `api`)
   - **Target:** `<TUNNEL-ID>.cfargotunnel.com`
   - **Proxy:** ✅ Proxied (orange cloud)

---

## 🚀 Step 6: Start Tunnel

### Test Run (Foreground):
```bash
cloudflared tunnel run technocoders-email
```

**You should see:**
```
INF Connection registered connIndex=0
INF Connection registered connIndex=1
INF Connection registered connIndex=2
INF Connection registered connIndex=3
```

### Test:
1. Keep tunnel running
2. Start email server: `npm run email-server`
3. Visit: https://technocoders.com/contact
4. Submit form
5. Check email! ✅

---

## 🔄 Step 7: Run as Service (Auto-start)

### Windows Service:

```powershell
# Install as service
cloudflared service install

# Start service
cloudflared service start

# Check status
cloudflared service status
```

### Mac/Linux:

```bash
# Install as service
sudo cloudflared service install

# Start service
sudo systemctl start cloudflared

# Enable auto-start
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared
```

---

## 📝 Step 8: Auto-start Email Server

### Windows (Task Scheduler):

1. Open Task Scheduler
2. Create Basic Task
3. Name: "Technocoders Email Server"
4. Trigger: At startup
5. Action: Start a program
6. Program: `node`
7. Arguments: `b:\Technocoders_new_website_2026\server\email-server.js`
8. Start in: `b:\Technocoders_new_website_2026`

### Or use PM2:

```bash
# Install PM2
npm install -g pm2

# Start email server
pm2 start server/email-server.js --name technocoders-email

# Save configuration
pm2 save

# Setup auto-start
pm2 startup
# Follow the command it gives you

# Check status
pm2 status
```

---

## ✅ Verification

### 1. Check Tunnel Status:
```bash
cloudflared tunnel info technocoders-email
```

### 2. Check Email Server:
```bash
# Should be running on port 3001
curl http://localhost:3001/api/health
```

### 3. Test Live:
```bash
# Test from outside
curl -X POST https://technocoders.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Testing"}'
```

### 4. Check Logs:
```bash
# Tunnel logs
cloudflared tunnel info technocoders-email

# Email server logs (if using PM2)
pm2 logs technocoders-email
```

---

## 🐛 Troubleshooting

### Issue 1: Tunnel Not Connecting

**Check:**
```bash
# Verify tunnel exists
cloudflared tunnel list

# Check config file
cat ~/.cloudflared/config.yml

# Test connection
cloudflared tunnel run technocoders-email
```

### Issue 2: 502 Bad Gateway

**Causes:**
- Email server not running
- Wrong port in config
- Firewall blocking

**Fix:**
```bash
# Check if email server is running
curl http://localhost:3001/api/health

# Restart email server
pm2 restart technocoders-email

# Check tunnel logs
cloudflared tunnel info technocoders-email
```

### Issue 3: DNS Not Resolving

**Fix:**
```bash
# Re-create DNS record
cloudflared tunnel route dns technocoders-email technocoders.com

# Or manually in Cloudflare Dashboard
# DNS → Add CNAME → <TUNNEL-ID>.cfargotunnel.com
```

---

## 📊 Monitoring

### Cloudflare Dashboard:
1. Go to: Zero Trust → Access → Tunnels
2. Click on: technocoders-email
3. View: Traffic, Health, Logs

### Local Monitoring:
```bash
# Tunnel status
cloudflared tunnel info technocoders-email

# Email server status (PM2)
pm2 status
pm2 logs technocoders-email

# Email server status (manual)
curl http://localhost:3001/api/health
```

---

## 🔒 Security

**Cloudflare Tunnel provides:**
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ No exposed ports
- ✅ Encrypted connection
- ✅ Access control (optional)

**Additional Security:**
```bash
# Add rate limiting in Cloudflare Dashboard
# Security → WAF → Rate Limiting Rules
# Limit: 10 requests per minute per IP for /api/contact
```

---

## 💰 Cost

**Cloudflare Tunnel:** FREE ✅  
**Cloudflare Pages:** FREE ✅  
**Total Cost:** $0/month 🎉

---

## 🎯 Summary

**Setup Time:** 15-20 minutes  
**Maintenance:** Zero (auto-starts on boot)  
**Cost:** Free  
**Performance:** Excellent (Cloudflare edge network)

**What You Get:**
- ✅ Local server accessible globally
- ✅ Automatic HTTPS
- ✅ No VPS needed
- ✅ No port forwarding
- ✅ DDoS protection
- ✅ Free forever

---

## 📞 Support

**Issues?**
- Cloudflare Docs: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
- Community: https://community.cloudflare.com/

**Need Help?**
- Check tunnel logs: `cloudflared tunnel info technocoders-email`
- Check email server: `pm2 logs technocoders-email`
- Test locally: `curl http://localhost:3001/api/health`

---

**Ready to start? Follow Step 1!** 🚀