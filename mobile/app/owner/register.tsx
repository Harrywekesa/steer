import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Screen, Title, Muted } from "../../src/components/ui";
import { register } from "../../src/lib/api/client";
import { useAuthStore } from "../../src/lib/auth/store";

export default function OwnerRegister() {
  const setSession = useAuthStore((s) => s.setSession);
  const mutation = useMutation({
    mutationFn: () => register("owner", "James Mutua", "+254700000000"),
    onSuccess: async (res) => {
      await setSession(res.token, "owner");
      router.replace("/owner/dashboard");
    }
  });
  return (
    <Screen>
      <Title>Owner Registration</Title>
      <Muted>Step form scaffolded; replace with full fields next iteration.</Muted>
      <Pressable style={styles.btn} onPress={() => mutation.mutate()}>
        <Text style={styles.btnText}>{mutation.isPending ? "Submitting..." : "Create owner account"}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: "#3DFFA0", borderRadius: 10, padding: 14, alignItems: "center" },
  btnText: { color: "#071208", fontWeight: "700" }
});
