import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Text } from "react-native";
import { PrimaryButton, Screen, Title } from "../../src/components/ui";
import { initiateMpesaPayment } from "../../src/lib/payments/mpesa";

export default function SessionEnd() {
  const payment = useMutation({
    mutationFn: () => initiateMpesaPayment("booking-1", 1148)
  });

  return (
    <Screen>
      <Title>Session Complete</Title>
      <Text style={{ color: "white" }}>Pay your owner via M-Pesa and return home.</Text>
      <PrimaryButton label={payment.isPending ? "Initiating..." : "Pay KES 1,148 via M-Pesa"} onPress={() => payment.mutate()} />
      <PrimaryButton label="Back to Home" onPress={() => router.replace("/driver/home")} />
    </Screen>
  );
}
