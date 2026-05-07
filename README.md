# Steer Full-Stack Prototype

## Projects
- `mobile`: Expo React Native client with role-based flows.
- `backend`: Express + WebSocket API for auth, bookings, trip updates, and M-Pesa payment lifecycle.
- `shared`: shared domain contracts.

## Run
1. Backend
   - `cd backend`
   - copy `.env.example` to `.env`
   - `npm install`
   - `npm run dev`
2. Mobile
   - `cd mobile`
   - copy `.env.example` to `.env`
   - `npm install`
   - `npm start`

## API Endpoints
- `POST /auth/register`
- `POST /bookings`
- `PATCH /trips/:id/status`
- `POST /trips/:id/location`
- `POST /payments/mpesa/initiate`
- `POST /payments/mpesa/webhook`

## Environments
- `dev`: local Expo + local backend.
- `staging`: hosted API URL and sandbox M-Pesa credentials.
- `prod`: production API URL and live credentials in secure secret manager.

## Payment Callback Runbook
1. Confirm webhook signature/shared secret validation.
2. Match callback to `paymentId` and update payment status.
3. Broadcast `payment_status` event to connected clients.
4. If callback delayed, expose payment as `pending` and retry status sync job.
