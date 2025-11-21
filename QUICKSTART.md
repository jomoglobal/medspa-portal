# ⚡ Quick Start Guide

Get your Med Spa Portal running in **5 minutes**!

## 🚀 Option 1: Run Locally (Fastest)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your preferred editor
# You can use the default values for local testing
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

### Step 5: Login
**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`

**Employee Account:**
- Email: `employee@example.com`
- Password: `employee123`

✅ **Done!** You're now running the portal locally.

---

## 🌐 Option 2: Deploy to Vercel (5 Minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" next to your repository
3. Click "Deploy" (use default settings)

### Step 3: Add Environment Variables
After first deployment, go to **Settings → Environment Variables** and add:

```
NEXT_PUBLIC_N8N_WEBHOOK_URL = https://your-n8n.com/webhook
NEXTAUTH_URL = https://your-app.vercel.app
NEXTAUTH_SECRET = (generate using: openssl rand -base64 32)
NEXT_PUBLIC_APP_NAME = Serene Spa Portal
```

### Step 4: Redeploy
Go to **Deployments** → Click ⋯ → **Redeploy**

✅ **Done!** Your app is live at `your-app.vercel.app`

---

## 📱 What to Test

### Customer Portal
1. **Dashboard** - `/customer/dashboard`
   - View upcoming appointments
   - See recent activity

2. **Book Appointment** - `/customer/book`
   - Fill out booking form
   - Select service and time slot

3. **AI Chat** - `/customer/chat`
   - Send messages to AI assistant
   - Test quick questions

4. **Intake Form** - `/customer/intake`
   - Submit medical information
   - Test form validation

### Employee Portal
1. **Dashboard** - `/employee/dashboard`
   - View today's schedule
   - Check stats

2. **Schedule** - `/employee/schedule`
   - Browse appointments
   - Send reminders

3. **Events** - `/employee/events`
   - View activity log
   - Filter by type

4. **Settings** - `/employee/settings`
   - Update API endpoints
   - Configure notifications

---

## 🔧 Common Issues

### "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
- Make sure you're using `.env.local` for local development
- For Vercel, set variables in project settings
- Restart dev server after changing `.env`

### Authentication not working
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies

### Port 3000 already in use
```bash
# Kill process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

---

## 🎯 Next Steps

### Customize Your Portal
1. **Update branding** - Edit `tailwind.config.js` for colors
2. **Change app name** - Update `NEXT_PUBLIC_APP_NAME`
3. **Add your logo** - Replace gradient div in `Navbar.tsx`

### Connect n8n
1. Set up n8n workflows
2. Update `NEXT_PUBLIC_N8N_WEBHOOK_URL`
3. Test webhook endpoints

### Add Real Database
1. Set up PostgreSQL or MongoDB
2. Replace mock users in `lib/auth.ts`
3. Create appointment and event tables

---

## 📚 Documentation

- **Full README:** [README.md](./README.md)
- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project Overview:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

## 💡 Tips

- Use **customer** account to test booking flow
- Use **employee** account to manage appointments
- Chat interface connects to n8n (requires webhook setup)
- All data is currently mock - safe to test freely

---

## 🎊 You're Ready!

Start exploring the portal and customize it for your needs. Check out the full documentation for deployment instructions and advanced features.

**Questions?** Review the [README.md](./README.md) for detailed information.
