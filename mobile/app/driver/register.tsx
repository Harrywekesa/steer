import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { z } from "zod";
import { Screen, Title } from "../../src/components/ui";
import { register } from "../../src/lib/api/client";
import { useAuthStore } from "../../src/lib/auth/store";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8)
});

export default function DriverRegister() {
  const setSession = useAuthStore((s) => s.setSession);
  const { control, handleSubmit } = useForm({ resolver: zodResolver(schema), defaultValues: { fullName: "", phone: "" } });
  const mutation = useMutation({
    mutationFn: (v: z.infer<typeof schema>) => register("driver", v.fullName, v.phone),
    onSuccess: async (res) => {
      await setSession(res.token, "driver");
      router.replace("/driver/home");
    }
  });

  return (
    <Screen>
      <Title>Driver Registration</Title>
      <Controller control={control} name="fullName" render={({ field }) => <TextInput style={styles.input} placeholder="Full name" placeholderTextColor="#999" {...field} />} />
      <Controller control={control} name="phone" render={({ field }) => <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#999" {...field} />} />
      <Pressable onPress={handleSubmit((v) => mutation.mutate(v))} style={styles.btn}>
        <Text style={styles.btnText}>{mutation.isPending ? "Submitting..." : "Continue"}</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#26304d", borderRadius: 10, color: "white", padding: 12 },
  btn: { backgroundColor: "#3DFFA0", borderRadius: 10, padding: 14, alignItems: "center" },
  btnText: { color: "#071208", fontWeight: "700" }
});
