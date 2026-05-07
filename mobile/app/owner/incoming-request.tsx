import { PrimaryButton, Screen, Title, Muted } from "../../src/components/ui";
import { api } from "../../src/lib/api/client";

export default function IncomingRequest() {
  return (
    <Screen>
      <Title>Booking Request</Title>
      <Muted>Brian O. wants a Practice session tomorrow.</Muted>
      <PrimaryButton label="Accept Request" onPress={() => api.patch("/trips/trip-1/status", { status: "matched" })} />
      <PrimaryButton label="Decline" onPress={() => {}} />
    </Screen>
  );
}
