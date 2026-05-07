import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

type Role = "driver" | "owner";

interface AuthState {
  token: string | null;
  role: Role | null;
  setSession: (token: string, role: Role) => Promise<void>;
  clear: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const TOKEN_KEY = "steer_token";
const ROLE_KEY = "steer_role";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  setSession: async (token, role) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(ROLE_KEY, role);
    set({ token, role });
  },
  clear: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(ROLE_KEY);
    set({ token: null, role: null });
  },
  hydrate: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const role = (await SecureStore.getItemAsync(ROLE_KEY)) as Role | null;
    set({ token, role });
  }
}));
