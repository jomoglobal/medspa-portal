# 🌿 Serene Spa Portal

A complete Next.js 14 web application for AI-powered Med Spa scheduling and operations management. Features separate customer and employee portals with a calm, spa-like design aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Customer Portal
- 🔐 **Secure Authentication** - Role-based login with NextAuth.js
- 📅 **Appointment Booking** - Easy scheduling with service selection and time slots
- 💬 **AI Chat Assistant** - 24/7 conversational support via n8n webhook
- 📋 **Pre-Visit Intake Forms** - Medical history and information collection
- 📊 **Dashboard** - View upcoming appointments and activity history
- ✉️ **Automated Reminders** - 1-week and 24-hour notifications

### Employee Portal
- 📆 **Appointment Schedule** - View and manage all bookings
- 👥 **Customer Management** - Access client information and history
- 🔔 **Manual Reminders** - Send custom appointment reminders
- 📈 **Event Stream** - Digital twin activity logs and system events
- ⚙️ **Settings** - Configure API endpoints and system preferences
- 📊 **Analytics Dashboard** - Track appointments and operations

### Technical Features
- 🎨 **Spa-Style Design** - Calming colors, clean typography, premium UI
- 📱 **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- 🔌 **n8n Integration** - All operations webhook-ready for automation
- 🚀 **Edge-Ready** - Optimized for Vercel deployment
- 🔒 **Role-Based Access** - Middleware-protected routes
- ♿ **Accessible** - WCAG-compliant components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- GitHub account
- Vercel account (free tier works)
- n8n instance (optional for testing)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd iot_app_tech460
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values:
   ```env
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-this
   NEXT_PUBLIC_APP_NAME=Serene Spa Portal
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

Use these credentials to test the application:

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`

**Employee Account:**
- Email: `employee@example.com`
- Password: `employee123`

## 📦 Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In Vercel project settings, add:
   ```
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=generate-a-secure-secret-key
   NEXT_PUBLIC_APP_NAME=Serene Spa Portal
   ```

4. **Deploy**
   Click "Deploy" and wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_N8N_WEBHOOK_URL
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXT_PUBLIC_APP_NAME
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

### NextAuth Secret Generation

Generate a secure secret for production:

```bash
openssl rand -base64 32
```

### n8n Webhook Endpoints

Your n8n instance should expose these endpoints:

- `POST /webhook/book` - New appointment bookings
- `POST /webhook/cancel` - Appointment cancellations
- `POST /webhook/chat` - AI chat messages
- `POST /webhook/intake` - Intake form submissions
- `GET /webhook/appointments` - Retrieve appointments list
- `GET /webhook/events` - Retrieve event logs
- `POST /webhook/send-reminder` - Send manual reminders

### Customizing Colors

Edit `tailwind.config.js` to change the spa color palette:

```js
colors: {
  spa: { /* neutral grays */ },
  calm: { /* cool tones */ },
  sage: { /* green accent */ },
}
```

## 📁 Project Structure

```
iot_app_tech460/
├── app/
│   ├── api/                    # API route handlers
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── book/               # Booking endpoint
│   │   ├── cancel/             # Cancellation endpoint
│   │   ├── chat/               # Chat endpoint
│   │   ├── intake/             # Intake form endpoint
│   │   ├── appointments/       # Get appointments
│   │   ├── events/             # Get events
│   │   └── send-reminder/      # Send reminders
│   ├── auth/
│   │   ├── login/              # Login page
│   │   └── register/           # Registration page
│   ├── customer/               # Customer portal
│   │   ├── dashboard/          # Customer dashboard
│   │   ├── book/               # Booking page
│   │   ├── chat/               # AI chat page
│   │   └── intake/             # Intake form page
│   ├── employee/               # Employee portal
│   │   ├── dashboard/          # Employee dashboard
│   │   ├── schedule/           # Schedule management
│   │   ├── events/             # Event logs
│   │   └── settings/           # System settings
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles
├── components/                 # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Navbar.tsx
│   └── SessionProvider.tsx
├── lib/                        # Utility functions
│   ├── auth.ts                 # NextAuth configuration
│   ├── api.ts                  # API client functions
│   └── utils.ts                # Helper functions
├── types/                      # TypeScript definitions
│   └── next-auth.d.ts
├── middleware.ts               # Route protection
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── package.json                # Dependencies
```

## 🎨 Design System

### Colors

- **Spa Neutrals** - Base grays for backgrounds and borders
- **Calm Blues** - Cool tones for text and secondary elements
- **Sage Greens** - Primary accent color for buttons and highlights

### Typography

- **Display Font** - Playfair Display (serif) for headings
- **Body Font** - Inter (sans-serif) for content

### Components

All components follow a consistent design language:
- Rounded corners (8-12px)
- Subtle shadows
- Smooth transitions (200ms)
- Accessible focus states

## 🔌 API Integration

### Customer Endpoints

```typescript
// Book appointment
POST /api/book
Body: { customerName, customerEmail, phone, service, preferredDate, preferredTime, notes }

// Cancel appointment
POST /api/cancel
Body: { appointmentId, reason }

// Chat with AI
POST /api/chat
Body: { message, customerId, sessionId }

// Submit intake form
POST /api/intake
Body: { medicalHistory, allergies, medications, skinConcerns, previousTreatments, emergencyContact, emergencyPhone }
```

### Employee Endpoints

```typescript
// Get appointments
GET /api/appointments
Returns: Array of appointment objects

// Get events
GET /api/events
Returns: Array of event logs

// Send reminder
POST /api/send-reminder
Body: { appointmentId, type: '1-week' | '24-hour' }
```

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- ✅ Login with customer account
- ✅ Login with employee account
- ✅ Logout functionality
- ✅ Route protection (try accessing /employee as customer)

**Customer Portal:**
- ✅ View dashboard
- ✅ Book appointment
- ✅ Chat with AI assistant
- ✅ Submit intake form

**Employee Portal:**
- ✅ View dashboard stats
- ✅ Browse appointment schedule
- ✅ Send manual reminders
- ✅ View event stream
- ✅ Update settings

## 🐛 Troubleshooting

### Build Errors

**Issue:** "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
```

**Issue:** Environment variables not working
- Ensure `.env` file exists and is not in `.gitignore`
- For Vercel, variables must be set in project settings
- Restart dev server after changing `.env`

### Authentication Issues

**Issue:** NextAuth session not persisting
- Check `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### API Connection

**Issue:** n8n webhook calls failing
- Verify `NEXT_PUBLIC_N8N_WEBHOOK_URL` is correct
- Check n8n instance is running and accessible
- Review CORS settings on n8n

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [n8n Documentation](https://docs.n8n.io)

## 🤝 Contributing

This is a demo project. For production use:

1. Replace mock user database with real authentication
2. Implement proper database for appointments and users
3. Add comprehensive error handling
4. Set up monitoring and analytics
5. Implement rate limiting on API routes
6. Add automated testing suite

## 📄 License

MIT License - feel free to use this project as a template for your own applications.

## 🆘 Support

For issues or questions:
- Check the troubleshooting section above
- Review n8n webhook configuration
- Verify environment variables are correctly set

## 🎯 Next Steps

After deployment:

1. **Connect n8n workflows** - Set up automation flows
2. **Add real database** - Implement PostgreSQL or MongoDB
3. **Enable email/SMS** - Configure notification providers
4. **Add analytics** - Track usage with Vercel Analytics
5. **Customize branding** - Update colors, logo, and content
6. **Set up monitoring** - Use Sentry or similar for error tracking

---

**Built with ❤️ using Next.js 14, TypeScript, and TailwindCSS**

Ready to deploy to Vercel and connect with n8n for full automation!
