import { api } from "../api/client";

export async function initiateMpesaPayment(bookingId: string, amountKes: number) {
  const { data } = await api.post("/payments/mpesa/initiate", { bookingId, amountKes });
  return data as { id: string; status: string; checkoutRequestId: string };
}
