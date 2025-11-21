# 🚀 Deployment Guide

Complete step-by-step guide to deploy the Serene Spa Portal to Vercel with GitHub integration.

## Prerequisites

- ✅ GitHub account (free)
- ✅ Vercel account (free tier works perfectly)
- ✅ n8n instance URL (optional for initial deployment)
- ✅ Project code pushed to GitHub

## Step 1: Prepare Your GitHub Repository

### 1.1 Initialize Git (if not already done)

```bash
cd iot_app_tech460
git init
```

### 1.2 Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it `medspa-portal` or your preferred name
4. Keep it **Public** or **Private** (your choice)
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

### 1.3 Push Your Code

```bash
git add .
git commit -m "Initial commit: Complete Med Spa Portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Find your GitHub repository and click **"Import"**

### 2.2 Configure Project

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 2.3 Add Environment Variables

Click **"Environment Variables"** and add these:

| Name | Value | Notes |
|------|-------|-------|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | `https://your-n8n.com/webhook` | Your n8n base URL |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Will be provided after first deploy |
| `NEXTAUTH_SECRET` | Generate using command below | Must be secure |
| `NEXT_PUBLIC_APP_NAME` | `Serene Spa Portal` | Your branding |

**Generate NEXTAUTH_SECRET:**

```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like `https://your-app.vercel.app`

### 2.5 Update NEXTAUTH_URL

1. Copy your Vercel deployment URL
2. Go to **Settings** → **Environment Variables**
3. Edit `NEXTAUTH_URL` to your actual Vercel URL
4. Redeploy by going to **Deployments** → Three dots → **Redeploy**

## Step 3: Connect n8n Webhooks

### 3.1 Required n8n Endpoints

Your n8n instance needs to respond to these routes:

```
POST   /webhook/book              # New bookings
POST   /webhook/cancel            # Cancellations
POST   /webhook/chat              # AI chat
POST   /webhook/intake            # Intake forms
GET    /webhook/appointments      # List appointments
GET    /webhook/events            # Event logs
POST   /webhook/send-reminder     # Manual reminders
```

### 3.2 Test Webhook Connection

Use this test command:

```bash
curl -X POST https://your-vercel-app.vercel.app/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "phone": "555-1234",
    "service": "facial",
    "preferredDate": "2025-12-01",
    "preferredTime": "10:00",
    "notes": "Test booking"
  }'
```

## Step 4: Custom Domain (Optional)

### 4.1 Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `spa.yourdomain.com`)
3. Follow DNS configuration instructions

### 4.2 Update Environment Variables

After adding custom domain:

1. Update `NEXTAUTH_URL` to your custom domain
2. Redeploy the application

## Step 5: Continuous Deployment

### Automatic Deployments

Every push to `main` will trigger a new deployment:

```bash
# Make changes
git add .
git commit -m "Update feature X"
git push

# Vercel automatically deploys!
```

### Preview Deployments

Create a branch for testing:

```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
```

Vercel creates a preview URL for this branch automatically!

## Step 6: Post-Deployment Checklist

- ✅ Test customer login: `customer@example.com` / `customer123`
- ✅ Test employee login: `employee@example.com` / `employee123`
- ✅ Book a test appointment
- ✅ Send a chat message
- ✅ Check employee dashboard
- ✅ Verify n8n webhooks are receiving data
- ✅ Test on mobile device
- ✅ Check console for errors

## Troubleshooting

### Build Failed

**Error: "Module not found"**

Solution: Check that all dependencies are in `package.json`

```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Environment variable undefined"**

Solution: Ensure all required env vars are set in Vercel settings

### Authentication Not Working

**Issue: Can't log in**

1. Check `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches deployment URL
3. Clear browser cache and cookies
4. Check browser console for errors

### n8n Connection Failing

**Issue: API calls timeout**

1. Verify n8n instance is running
2. Check CORS settings allow Vercel domain
3. Test n8n endpoint directly with curl
4. Check Vercel function logs

### Slow Performance

1. Enable Vercel Analytics in project settings
2. Check if n8n webhooks are responding quickly
3. Consider adding caching for frequently accessed data

## Monitoring & Logs

### View Deployment Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"**
4. Click on any deployment to see logs

### Real-time Function Logs

1. Go to your project
2. Click **"Functions"**
3. Select any API route to see invocation logs

### Analytics (Optional - Free)

1. Go to project settings
2. Enable **Vercel Analytics**
3. View traffic and performance metrics

## Security Best Practices

### Before Going to Production

1. **Change Default Credentials**
   - Replace mock users with real database
   - Implement proper password hashing

2. **Secure API Routes**
   - Add rate limiting
   - Implement proper authentication checks
   - Validate all inputs

3. **Environment Variables**
   - Never commit `.env` files
   - Rotate `NEXTAUTH_SECRET` regularly
   - Use Vercel's secret management

4. **HTTPS Only**
   - Vercel provides this by default
   - Ensure n8n also uses HTTPS

## Scaling Considerations

### Free Tier Limits

- 100GB bandwidth/month
- 100 serverless function executions/day
- Unlimited deployments

### When to Upgrade

Consider Pro plan ($20/month) if you need:
- More bandwidth
- Custom deployment retention
- Password-protected deployments
- Enhanced security features

## Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** Available on Pro plan
- **Community:** [GitHub Discussions](https://github.com/vercel/next.js/discussions)

---

**🎉 Congratulations!**

Your Med Spa Portal is now live and ready to handle appointments, chat interactions, and employee operations!

Next steps:
1. Connect your n8n workflows
2. Customize branding and colors
3. Add real database integration
4. Set up monitoring alerts
