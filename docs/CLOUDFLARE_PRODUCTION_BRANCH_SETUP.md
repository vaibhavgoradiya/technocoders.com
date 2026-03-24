# Cloudflare Pages - Production Branch Setup Guide

## Overview
Yeh guide aapko batayega ki Cloudflare Pages ko kaise configure karein taaki deployments **production** branch se ho, **main** branch se nahi.

## Current Status
✅ **Production branch successfully created and pushed to GitHub**
- Branch name: `production`
- Remote URL: https://github.com/vaibhavgoradiya/technocoders.com.git
- Status: Active and synced with main branch

## Cloudflare Pages Configuration Steps

### Step 1: Cloudflare Dashboard Login
1. Cloudflare dashboard mein login karein: https://dash.cloudflare.com
2. **Workers & Pages** section mein jaayein
3. Apni project **technocoders.com** ko select karein

### Step 2: Production Branch Configuration
1. **Settings** tab pe click karein
2. **Builds & deployments** section mein jaayein
3. **Production branch** setting ko dhoondhein
4. Current value: `main` (yeh change karna hai)
5. New value: `production` (yeh set karna hai)

### Step 3: Configuration Update
```
Production branch: production
Preview branches: All branches except production
Branch deployments: Enabled
```

### Step 4: Save Changes
1. **Save** button pe click karein
2. Configuration update hone ka wait karein
3. Confirmation message aayega

### Step 5: Trigger New Deployment
Production branch se pehli deployment trigger karne ke liye:

```bash
# Production branch pe switch karein
git checkout production

# Koi chhota change karein (optional)
git commit --allow-empty -m "Trigger production deployment"

# Push karein
git push origin production
```

## Branch Strategy

### Production Branch (`production`)
- **Purpose**: Live production deployments
- **URL**: https://technocoders.com
- **Auto-deploy**: Yes (jab bhi production branch update ho)
- **Environment**: Production
- **Testing**: Full QA required before merge

### Main Branch (`main`)
- **Purpose**: Development and staging
- **URL**: Preview URL (e.g., main.technocoders.pages.dev)
- **Auto-deploy**: Yes (preview deployment)
- **Environment**: Staging/Development
- **Testing**: Development testing

## Workflow

### Development Workflow
```bash
# 1. Main branch pe kaam karein
git checkout main
git pull origin main

# 2. Changes karein aur test karein
# ... code changes ...

# 3. Commit aur push karein (preview deployment hogi)
git add .
git commit -m "Feature: Description"
git push origin main

# 4. Preview URL pe test karein
# URL: https://main.technocoders.pages.dev (ya similar)

# 5. Sab theek hai toh production pe merge karein
git checkout production
git merge main
git push origin production

# 6. Production deployment automatically trigger hogi
# URL: https://technocoders.com
```

### Hotfix Workflow
```bash
# 1. Directly production branch pe kaam karein
git checkout production
git pull origin production

# 2. Urgent fix karein
# ... fix code ...

# 3. Commit aur push karein
git add .
git commit -m "Hotfix: Description"
git push origin production

# 4. Fix ko main branch mein bhi merge karein
git checkout main
git merge production
git push origin main
```

## Verification Steps

### After Configuration
1. Cloudflare dashboard mein **Deployments** tab check karein
2. Latest deployment ka **Branch** column check karein
3. Yeh `production` show karna chahiye, `main` nahi

### Testing
1. Production branch mein koi change karein:
   ```bash
   git checkout production
   echo "# Test" >> README.md
   git add README.md
   git commit -m "Test: Production deployment"
   git push origin production
   ```

2. Cloudflare dashboard mein deployment status check karein
3. Deployment successful hone ke baad site check karein: https://technocoders.com

## Important Notes

### ⚠️ Critical Points
1. **Production branch ko directly edit na karein** - Always main se merge karein
2. **Testing required** - Production pe push karne se pehle main branch pe test karein
3. **Backup** - Important changes se pehle backup lein
4. **Rollback** - Agar kuch galat ho toh previous commit pe revert kar sakte hain

### 🔄 Automatic Deployments
- **Production branch push** → Production deployment (technocoders.com)
- **Main branch push** → Preview deployment (preview URL)
- **Other branches push** → Preview deployment (branch-specific URL)

### 📊 Deployment Status
Cloudflare dashboard mein aap dekh sakte hain:
- **Production**: Latest production deployment
- **Preview**: Latest preview deployments
- **Build logs**: Detailed build information
- **Analytics**: Traffic and performance metrics

## Troubleshooting

### Issue: Deployment production branch se nahi ho rahi
**Solution:**
1. Cloudflare Settings → Builds & deployments check karein
2. Production branch setting verify karein
3. GitHub integration check karein
4. Deployment logs check karein

### Issue: Preview deployments disable ho gayi hain
**Solution:**
1. Settings → Builds & deployments
2. "Enable preview deployments" option enable karein
3. Branch patterns configure karein

### Issue: Build fail ho rahi hai
**Solution:**
1. Build logs check karein
2. Dependencies verify karein
3. Build command check karein: `npm run build`
4. Output directory check karein: `dist`

## Current Configuration

### Project Details
- **Project Name**: technocoders.com
- **Framework**: Vite (React)
- **Build Command**: `npm run build`
- **Build Output**: `dist`
- **Node Version**: 18.x (from .node-version file)

### Branch Setup
- **Production Branch**: `production` ✅
- **Main Branch**: `main` ✅
- **Remote**: origin (GitHub)

### Environment Variables
Environment variables `.env` file mein hain:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

**Note**: Yeh variables Cloudflare Pages dashboard mein bhi add karne honge:
1. Settings → Environment variables
2. Production aur Preview dono ke liye add karein

## Next Steps

1. ✅ Production branch created and pushed
2. ⏳ Cloudflare Pages configuration update (manual step)
3. ⏳ Test deployment from production branch
4. ⏳ Verify production site working correctly
5. ⏳ Document any issues or changes needed

## Support

Agar koi issue aaye toh:
1. Cloudflare documentation check karein: https://developers.cloudflare.com/pages
2. Build logs carefully padhein
3. GitHub repository settings verify karein
4. Cloudflare support se contact karein (if needed)

---

**Last Updated**: March 24, 2026
**Status**: Production branch ready, Cloudflare configuration pending