import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import { WebSocket, WebSocketServer } from "ws";
import { z } from "zod";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);
const jwtSecret = process.env.JWT_SECRET ?? "dev-secret";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, limit: 120 }));

type Role = "driver" | "owner";
type TripStatus = "requested" | "matched" | "in_progress" | "completed";

interface User {
  id: string;
  fullName: string;
  phone: string;
  role: Role;
  profileComplete: boolean;
}

const db = {
  users: new Map<string, User>(),
  bookings: new Map<string, any>(),
  trips: new Map<string, any>(),
  payments: new Map<string, any>()
};

const authSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  role: z.enum(["driver", "owner"])
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/auth/register", (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const user: User = {
    id: crypto.randomUUID(),
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    role: parsed.data.role,
    profileComplete: false
  };
  db.users.set(user.id, user);
  const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
  return res.json({ token, user });
});

app.post("/bookings", (req, res) => {
  const id = crypto.randomUUID();
  const booking = { id, ...req.body, status: "requested" as TripStatus };
  db.bookings.set(id, booking);
  broadcast({ type: "booking_created", booking });
  res.status(201).json(booking);
});

app.patch("/trips/:id/status", (req, res) => {
  const trip = db.trips.get(req.params.id) ?? { id: req.params.id, status: "requested" };
  trip.status = req.body.status;
  db.trips.set(req.params.id, trip);
  broadcast({ type: "trip_status", trip });
  res.json(trip);
});

app.post("/trips/:id/location", (req, res) => {
  const trip = db.trips.get(req.params.id) ?? { id: req.params.id, status: "in_progress" };
  trip.lastLat = req.body.lat;
  trip.lastLng = req.body.lng;
  db.trips.set(req.params.id, trip);
  broadcast({ type: "trip_location", tripId: trip.id, lat: trip.lastLat, lng: trip.lastLng });
  res.json({ ok: true });
});

app.post("/payments/mpesa/initiate", (req, res) => {
  const payment = {
    id: crypto.randomUUID(),
    bookingId: req.body.bookingId,
    amountKes: req.body.amountKes,
    provider: "mpesa",
    status: "pending",
    checkoutRequestId: `CHK-${Date.now()}`
  };
  db.payments.set(payment.id, payment);
  res.status(201).json(payment);
});

app.post("/payments/mpesa/webhook", (req, res) => {
  const payment = db.payments.get(req.body.paymentId);
  if (!payment) return res.status(404).json({ message: "Payment not found" });
  payment.status = req.body.success ? "settled" : "failed";
  payment.receipt = req.body.receipt;
  db.payments.set(payment.id, payment);
  broadcast({ type: "payment_status", payment });
  return res.json({ ok: true });
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });
const clients = new Set<any>();
wss.on("connection", (socket: WebSocket) => {
  clients.add(socket);
  socket.on("close", () => clients.delete(socket));
});

function broadcast(payload: unknown) {
  const text = JSON.stringify(payload);
  for (const client of clients) {
    if (client.readyState === 1) client.send(text);
  }
}
