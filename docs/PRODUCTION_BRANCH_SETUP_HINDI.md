# Production Branch Setup - Hindi Guide

## Kya Kiya Gaya Hai? ✅

### 1. Production Branch Create Kiya
```bash
git checkout -b production
git push -u origin production
```

**Result**: 
- ✅ Production branch successfully create ho gaya
- ✅ GitHub pe push ho gaya
- ✅ Main branch ke saath sync hai

### 2. Current Branch Structure
```
main (development/staging)
  ↓
production (live website)
```

## Ab Aapko Kya Karna Hai? 🎯

### Step 1: Cloudflare Dashboard Mein Jaayein
1. Login karein: https://dash.cloudflare.com
2. **Workers & Pages** pe click karein
3. **technocoders.com** project select karein

### Step 2: Production Branch Set Karein
1. **Settings** tab pe jaayein
2. **Builds & deployments** section dhoondhein
3. **Production branch** setting mein:
   - Current: `main`
   - Change to: `production` ⬅️ **YEH CHANGE KARNA HAI**
4. **Save** button pe click karein

### Step 3: Verify Karein
1. **Deployments** tab pe jaayein
2. Naya deployment trigger karein (automatically hoga)
3. Check karein ki deployment `production` branch se ho rahi hai

## Deployment Flow

### Pehle (Old Way) ❌
```
main branch → Push → Production deployment
```
**Problem**: Development code directly production pe ja raha tha

### Ab (New Way) ✅
```
main branch → Push → Preview deployment (testing)
     ↓
   (test karein)
     ↓
production branch → Merge → Production deployment (live site)
```
**Benefit**: Testing ke baad hi production pe jaata hai

## Daily Workflow

### Development Karte Waqt
```bash
# 1. Main branch pe kaam karein
git checkout main

# 2. Code changes karein
# ... coding ...

# 3. Commit aur push karein
git add .
git commit -m "Feature: New feature"
git push origin main

# 4. Preview URL pe test karein
# Cloudflare automatically preview deployment banayega
```

### Production Pe Deploy Karte Waqt
```bash
# 1. Production branch pe switch karein
git checkout production

# 2. Main branch se merge karein
git merge main

# 3. Push karein
git push origin production

# 4. Cloudflare automatically production deploy karega
# Live site: https://technocoders.com
```

## Important Commands

### Branch Check Karna
```bash
# Current branch dekhna
git branch

# All branches dekhna (local + remote)
git branch -a
```

### Branch Switch Karna
```bash
# Main branch pe jaana
git checkout main

# Production branch pe jaana
git checkout production
```

### Latest Code Pull Karna
```bash
# Current branch ka latest code
git pull origin <branch-name>

# Example
git pull origin main
git pull origin production
```

## Troubleshooting

### Problem: Cloudflare mein production branch option nahi dikh raha
**Solution**: 
- GitHub integration check karein
- Repository access verify karein
- Cloudflare support se contact karein

### Problem: Deployment fail ho rahi hai
**Solution**:
- Build logs check karein
- Dependencies verify karein (`npm install`)
- Environment variables check karein

### Problem: Changes production pe nahi dikh rahe
**Solution**:
- Browser cache clear karein (Ctrl + Shift + R)
- Cloudflare deployment status check karein
- DNS propagation wait karein (2-5 minutes)

## Environment Variables

Cloudflare Pages mein yeh variables add karna mat bhoolna:

### Production Environment
```
VITE_EMAILJS_SERVICE_ID=service_lb2xluh
VITE_EMAILJS_TEMPLATE_ID=template_vbh18l5
VITE_EMAILJS_PUBLIC_KEY=PHx_pSxCesT6Hqfou
```

### Preview Environment
Same variables preview environment mein bhi add karein

**Kaise Add Karein:**
1. Cloudflare dashboard → Settings
2. Environment variables section
3. Add variable button
4. Variable name aur value enter karein
5. Production/Preview select karein
6. Save karein

## Benefits of Production Branch

### 1. Safety ✅
- Development code directly production pe nahi jaata
- Testing ke baad hi deploy hota hai

### 2. Control ✅
- Aap decide kar sakte hain kab production pe deploy karna hai
- Rollback easy hai agar kuch galat ho

### 3. Preview ✅
- Main branch pe changes preview URL pe test kar sakte hain
- Production affect nahi hota

### 4. Professional ✅
- Industry standard practice
- Team collaboration easy hota hai

## Quick Reference

### Branch Purpose
| Branch | Purpose | URL |
|--------|---------|-----|
| `main` | Development/Testing | Preview URL |
| `production` | Live Website | technocoders.com |

### Common Commands
```bash
# Status check
git status

# Branch list
git branch -a

# Switch branch
git checkout <branch-name>

# Merge main to production
git checkout production
git merge main
git push origin production

# Pull latest
git pull origin <branch-name>
```

## Next Steps

1. ✅ Production branch create ho gaya
2. ⏳ **Cloudflare mein production branch set karein** ← **AB YEH KARNA HAI**
3. ⏳ Test deployment karein
4. ⏳ Verify karein ki site theek se kaam kar rahi hai

## Support

Agar koi problem aaye toh:
1. Documentation padhein: `docs/CLOUDFLARE_PRODUCTION_BRANCH_SETUP.md`
2. Build logs check karein
3. GitHub repository settings verify karein

---

**Created**: March 24, 2026
**Status**: Production branch ready, Cloudflare configuration pending
**Action Required**: Cloudflare dashboard mein production branch set karna hai