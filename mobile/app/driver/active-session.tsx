import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { PrimaryButton, Screen, Title } from "../../src/components/ui";
import { api } from "../../src/lib/api/client";
import { useTripRealtime } from "../../src/lib/realtime/useTripRealtime";

export default function ActiveSession() {
  const [status, setStatus] = useState("in_progress");
  const [coords, setCoords] = useState<string>("locating...");

  useTripRealtime((payload) => {
    const value = payload as { type?: string; trip?: { status?: string } };
    if (value.type === "trip_status" && value.trip?.status) setStatus(value.trip.status);
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted" || !mounted) return;
      const position = await Location.getCurrentPositionAsync({});
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setCoords(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      await api.post("/trips/trip-1/location", { lat, lng });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Screen>
      <Title>Session Active</Title>
      <Text style={{ color: "white" }}>Status: {status}</Text>
      <Text style={{ color: "white" }}>Location: {coords}</Text>
      <PrimaryButton label="End Session" onPress={() => router.push("/driver/session-end")} />
    </Screen>
  );
}
