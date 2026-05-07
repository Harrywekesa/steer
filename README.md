# Steer - Full-Stack React Native Prototype

Steer is a role-based mobility app prototype with:
- Driver flows (registration, browse owner, booking, active trip, session completion)
- Owner flows (registration, dashboard, incoming request handling)
- Backend APIs for auth, bookings, realtime trip updates, and M-Pesa payment lifecycle

## Repository Structure
- `mobile/`: Expo React Native app (`expo-router`, React Query, Zustand, Secure Store)
- `backend/`: Express + TypeScript API + WebSocket realtime events
- `shared/`: Shared domain contracts/types

## Prerequisites
- Node.js 20+
- npm 10+
- Android phone (Expo Go) or iPhone (Expo Go/TestFlight/dev build)
- Same Wi-Fi network for your computer and phone (recommended)

## 1) Run Backend Locally
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Backend starts on `http://localhost:4000`.

## 2) Configure Mobile Environment
In `mobile/.env`, set your machine LAN IP so your phone can reach the backend:

```env
EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_LAN_IP:4000
EXPO_PUBLIC_WS_URL=ws://YOUR_COMPUTER_LAN_IP:4000
```

Example:
```env
EXPO_PUBLIC_API_URL=http://192.168.1.45:4000
EXPO_PUBLIC_WS_URL=ws://192.168.1.45:4000
```

## 3) Start Mobile App
```bash
cd mobile
copy .env.example .env
npm install
npm start
```

## Install on Your Phone

### Option A: Fastest (Expo Go)
1. Install **Expo Go** from Play Store/App Store.
2. Start app with `npm start` inside `mobile`.
3. Scan the QR code shown in terminal:
   - Android: use Expo Go scanner directly.
   - iPhone: use Camera app QR scanner then open in Expo Go.

### Option B: Development Build (recommended for native-heavy features)
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Log in:
   ```bash
   eas login
   ```
3. Build and install:
   - Android:
     ```bash
     cd mobile
     eas build -p android --profile development
     ```
   - iOS:
     ```bash
     cd mobile
     eas build -p ios --profile development
     ```
4. Install the generated build on your device, then run:
   ```bash
   npx expo start --dev-client
   ```

## Core API Endpoints
- `POST /auth/register`
- `POST /bookings`
- `PATCH /trips/:id/status`
- `POST /trips/:id/location`
- `POST /payments/mpesa/initiate`
- `POST /payments/mpesa/webhook`

## Environment Strategy
- `dev`: local backend + Expo local runtime
- `staging`: hosted API + sandbox M-Pesa credentials
- `prod`: hosted API + production credentials from secret manager

## Payment Webhook Runbook
1. Verify callback signature/shared secret.
2. Resolve callback to `paymentId`.
3. Persist status (`settled`/`failed`) and receipt.
4. Emit realtime `payment_status` event.
5. If callback delays, keep payment `pending` and retry status sync.
