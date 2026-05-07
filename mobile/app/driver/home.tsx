import { router } from "expo-router";
import { PrimaryButton, Screen, Title, Muted } from "../../src/components/ui";

export default function DriverHome() {
  return (
    <Screen>
      <Title>Driver Home</Title>
      <Muted>Browse owners and start a booking.</Muted>
      <PrimaryButton label="Browse Owners" onPress={() => router.push("/driver/browse")} />
      <PrimaryButton label="Profile" onPress={() => router.push("/driver/owner-profile")} />
    </Screen>
  );
}
