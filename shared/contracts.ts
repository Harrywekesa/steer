export type Role = "driver" | "owner";

export type TripStatus = "requested" | "matched" | "in_progress" | "completed";

export interface User {
  id: string;
  role: Role;
  fullName: string;
  phone: string;
  profileComplete: boolean;
}

export interface Booking {
  id: string;
  ownerId: string;
  driverId: string;
  mode: "Practice" | "Familiarize" | "Transport";
  pickup: string;
  dropoff: string;
  status: TripStatus;
  scheduledAt: string;
}

export interface Trip {
  id: string;
  bookingId: string;
  status: TripStatus;
  lastLat: number;
  lastLng: number;
  startedAt?: string;
  endedAt?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amountKes: number;
  provider: "mpesa";
  status: "initiated" | "pending" | "settled" | "failed";
  receipt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
