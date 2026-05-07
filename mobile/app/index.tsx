import { router } from "expo-router";
import { PrimaryButton, Screen, Title, Muted } from "../src/components/ui";

export default function SplashScreen() {
  return (
    <Screen>
      <Title>Steer</Title>
      <Muted>Drive · Learn · Explore</Muted>
      <PrimaryButton label="Get Started" onPress={() => router.push("/role-select")} />
    </Screen>
  );
}
