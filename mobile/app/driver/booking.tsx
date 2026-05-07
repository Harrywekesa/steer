import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { PrimaryButton, Screen, Title, Muted } from "../../src/components/ui";
import { createBooking } from "../../src/lib/api/client";

export default function BookingScreen() {
  const mutation = useMutation({
    mutationFn: () =>
      createBooking({
        ownerId: "owner-1",
        driverId: "driver-1",
        mode: "Practice",
        pickup: "Kitale CBD",
        dropoff: "Kitale Town Circuit",
        scheduledAt: new Date().toISOString()
      }),
    onSuccess: () => router.push("/driver/active-session")
  });

  return (
    <Screen>
      <Title>Confirm Booking</Title>
      <Muted>Fare estimate and session options can be expanded here.</Muted>
      <PrimaryButton label={mutation.isPending ? "Requesting..." : "Confirm & Request"} onPress={() => mutation.mutate()} />
    </Screen>
  );
}
