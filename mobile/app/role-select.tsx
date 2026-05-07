import { router } from "expo-router";
import { PrimaryButton, Screen, Title, Muted } from "../src/components/ui";

export default function RoleSelectScreen() {
  return (
    <Screen>
      <Title>Who are you?</Title>
      <Muted>Choose your role to continue.</Muted>
      <PrimaryButton label="I want to Drive" onPress={() => router.push("/driver/register")} />
      <PrimaryButton label="I'm a Vehicle Owner" onPress={() => router.push("/owner/register")} />
    </Screen>
  );
}
