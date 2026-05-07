import { useEffect } from "react";

export function useTripRealtime(onMessage: (payload: unknown) => void) {
  useEffect(() => {
    const url = (process.env.EXPO_PUBLIC_WS_URL ?? "ws://localhost:4000").replace(/^http/, "ws");
    const socket = new WebSocket(url);
    socket.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data));
      } catch {
        onMessage(event.data);
      }
    };
    return () => socket.close();
  }, [onMessage]);
}
