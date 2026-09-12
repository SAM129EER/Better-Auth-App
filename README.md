# BetterAuth App

A modern full-stack authentication starter built with **Next.js 15+ (App Router)**, **Better Auth**, **Prisma ORM**, **Neon PostgreSQL**, **Tailwind CSS**, and **Base UI / Shadcn UI**.

Supports **Email & Password authentication** along with **Google** and **GitHub** OAuth providers.

---

## 🚀 Step-by-Step Setup Guide

Follow this guide to set up, configure, and run the project locally from scratch.

---

### Step 1: Project Initialization (Framework & Dependencies)

If building from scratch or setting up initial framework dependencies:

```bash
# 1. Create Next.js app (App Router, TypeScript, Tailwind CSS)
npx create-next-app@latest better-auth --typescript --tailwind --eslint --app --src-dir

# 2. Navigate to project root
cd better-auth

# 3. Install core dependencies
npm install better-auth @prisma/client @prisma/adapter-pg pg dotenv zod react-hook-form @hookform/resolvers lucide-react clsx tailwind-merge class-variance-authority @base-ui/react

# 4. Install dev dependencies
npm install -D prisma @types/node @types/react @types/react-dom @types/pg
```

---

### Step 2: Database & Prisma Setup

Initialize and configure Prisma with PostgreSQL.

```bash
# 1. Initialize Prisma schema
npx prisma init

# 2. Push schema changes to your database (Neon / PostgreSQL)
npx prisma db push

# 3. Generate Prisma Client bindings
npx prisma generate
```

---

### Step 3: Environment Variables Setup

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Configure `.env` with your credentials:

```env
# Database Connection URL (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-sample-pooler.region.aws.neon.tech/neondb?sslmode=require"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_generated_random_secret_key"
BETTER_AUTH_URL="http://localhost:3000"

# Email verification (Resend)
RESEND_API_KEY="re_your_resend_api_key"
EMAIL_FROM="Your App <noreply@your-verified-domain.com>"

# GitHub OAuth Credentials
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

> **Note on OAuth Callbacks:**
> - **GitHub Redirect URI:** `http://localhost:3000/api/auth/callback/github`
> - **Google Redirect URI:** `http://localhost:3000/api/auth/callback/google`

> **Email verification:** Create a Resend account, verify the domain used in
> `EMAIL_FROM`, and add `RESEND_API_KEY` and `EMAIL_FROM` to `.env`. New
> email/password users must verify their email before they can sign in.

---

### Step 4: Running the Application Locally

```bash
# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Project Architecture & Routes

| Route | Description |
|---|---|
| `/` | Landing page when unauthenticated; User Dashboard when authenticated |
| `/login` | Sign-in page with Email/Password & Social OAuth (Google, GitHub) |
| `/signup` | Account creation page with Zod schema validation |
| `/api/auth/[...all]` | Better Auth dynamic API route handler |

---

## 💻 Technical Stack

- **Framework:** Next.js (App Router, Server & Client Components)
- **Auth Engine:** Better Auth
- **Database:** Neon Serverless PostgreSQL
- **ORM:** Prisma
- **Form Handling & Validation:** React Hook Form + Zod (`@hookform/resolvers`)
- **Styling:** Tailwind CSS + Base UI / Shadcn UI primitives

---

## 📜 Useful Commands Quick Reference

```bash
# Generate Prisma Client
npx prisma generate

# Sync schema directly to DB without migrations
npx prisma db push

# Launch Prisma Studio (Database GUI Viewer)
npx prisma studio

# Build for Production
npm run build

# Start Production Server
npm run start
```
