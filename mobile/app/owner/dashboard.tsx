import { router } from "expo-router";
import { PrimaryButton, Screen, Title, Muted } from "../../src/components/ui";

export default function OwnerDashboard() {
  return (
    <Screen>
      <Title>Owner Dashboard</Title>
      <Muted>See incoming requests and your earnings snapshot.</Muted>
      <PrimaryButton label="Open Incoming Request" onPress={() => router.push("/owner/incoming-request")} />
    </Screen>
  );
}
