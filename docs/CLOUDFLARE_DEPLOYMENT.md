# Cloudflare Pages Deployment Guide

## Prerequisites
- Cloudflare account (free tier works)
- Wrangler CLI installed ✅
- Git repository (optional but recommended)

## Setup Steps

### 1. Login to Cloudflare
```bash
wrangler login
```
This will open a browser window to authenticate with your Cloudflare account.

### 2. Build the Project
```bash
npm run build
```
This creates the production build in the `dist` folder.

### 3. Deploy to Cloudflare Pages

#### Option A: Using Wrangler CLI (Recommended)
```bash
wrangler pages deploy dist --project-name=technocoders-website
```

#### Option B: Using Cloudflare Dashboard
1. Go to https://dash.cloudflare.com/
2. Navigate to "Workers & Pages"
3. Click "Create application" → "Pages" → "Upload assets"
4. Upload the `dist` folder
5. Set project name: `technocoders-website`

### 4. Configure Build Settings (If using Git integration)

If you connect your Git repository:

**Build Configuration:**
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node version: `18` or higher

**Environment Variables:**
None required for this project (all configs are in code)

## Custom Domain Setup

### 1. Add Custom Domain
```bash
wrangler pages domain add technocoders.com --project-name=technocoders-website
```

### 2. Or via Dashboard:
1. Go to your Pages project
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

## Deployment Commands

### Deploy Production
```bash
npm run build
wrangler pages deploy dist --project-name=technocoders-website --branch=main
```

### Deploy Preview (for testing)
```bash
npm run build
wrangler pages deploy dist --project-name=technocoders-website --branch=preview
```

### View Deployment
```bash
wrangler pages deployment list --project-name=technocoders-website
```

## Automatic Deployments (Git Integration)

### Connect Git Repository:
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect to Git (GitHub/GitLab)
4. Select repository: `Technocoders_new_website_2026`
5. Configure build settings (see above)
6. Click "Save and Deploy"

**Auto-deploy triggers:**
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployments
- Pull requests → Preview deployments

## Environment-Specific Configurations

### Production URL
After deployment, your site will be available at:
- `https://technocoders-website.pages.dev`
- Or your custom domain if configured

### Preview URLs
Preview deployments get unique URLs:
- `https://[branch].[project].pages.dev`

## Rollback Deployment

### Via CLI:
```bash
wrangler pages deployment list --project-name=technocoders-website
wrangler pages deployment rollback [DEPLOYMENT_ID] --project-name=technocoders-website
```

### Via Dashboard:
1. Go to project → Deployments
2. Find previous successful deployment
3. Click "..."