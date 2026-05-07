import { router } from "expo-router";
import { PrimaryButton, Screen, Title, Muted } from "../../src/components/ui";

export default function OwnerProfile() {
  return (
    <Screen>
      <Title>James Mutua</Title>
      <Muted>Toyota Vitz · 2019 · 4.8 rating</Muted>
      <PrimaryButton label="Book This Owner" onPress={() => router.push("/driver/booking")} />
    </Screen>
  );
}
