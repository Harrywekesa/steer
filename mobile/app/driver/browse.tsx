import { router } from "expo-router";
import { PrimaryButton, Screen, Title } from "../../src/components/ui";

export default function BrowseOwners() {
  return (
    <Screen>
      <Title>Available Owners</Title>
      <PrimaryButton label="View James Mutua" onPress={() => router.push("/driver/owner-profile")} />
    </Screen>
  );
}
