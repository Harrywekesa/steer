import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

export function Title({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Muted({ children }: PropsWithChildren) {
  return <Text style={styles.muted}>{children}</Text>;
}

export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#090b14" },
  content: { flex: 1, padding: 20, gap: 12 },
  title: { color: "#f4f5ff", fontSize: 28, fontWeight: "700" },
  muted: { color: "#a8adca", fontSize: 14 },
  button: {
    marginTop: 8,
    backgroundColor: "#3DFFA0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center"
  },
  buttonText: { color: "#05080c", fontWeight: "700", fontSize: 16 }
});
