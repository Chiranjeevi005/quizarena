# QuizArena Operations & Deployment Guide

## 1. Deployment
QuizArena is designed to be deployed to Vercel or any standard Node.js server capable of running Next.js.
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Database Migrations**: `npx prisma migrate deploy`

## 2. Environment Variables
Ensure all required environment variables are set in your deployment environment (see `.env.example`).
Critical vars: `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`.

## 3. Operations & Monitoring
- **Health Check**: `/api/health`
- **Analytics**: Admin Dashboard `/admin/operations`
- **Event Relay**: The EventRegistry and OutboxRelay initialize automatically on server start.

## 4. Runbook & Troubleshooting
- **Database Connection Issues**: Verify the Supabase connection pooler is active. The health check will fail with 503 if the DB is unreachable.
- **Authentication Failures**: Ensure `AUTH_SECRET` matches across all instances. Check Google OAuth credentials.
- **Build Failures**: Run `npm run lint` and `npx tsc --noEmit` locally. 
