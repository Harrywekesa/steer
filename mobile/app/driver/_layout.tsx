import { Redirect, Slot } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../src/lib/auth/store";

export default function DriverLayout() {
  const { hydrate, role } = useAuthStore();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    hydrate().finally(() => setReady(true));
  }, [hydrate]);
  if (!ready) return null;
  if (role !== "driver") return <Redirect href="/role-select" />;
  return <Slot />;
}
