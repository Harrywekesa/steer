import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000",
  timeout: 10_000
});

export async function register(role: "driver" | "owner", fullName: string, phone: string) {
  const { data } = await api.post("/auth/register", { role, fullName, phone });
  return data as { token: string; user: { id: string; role: "driver" | "owner" } };
}

export async function createBooking(payload: {
  ownerId: string;
  driverId: string;
  mode: string;
  pickup: string;
  dropoff: string;
  scheduledAt: string;
}) {
  const { data } = await api.post("/bookings", payload);
  return data;
}
