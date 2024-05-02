import { create } from "zustand";

type AuthState = {
  isLoading: boolean;
  getUsername: () => string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  getUsername: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("username");
    }
    return null;
  },
  signIn: async (username, password) => {
    set(() => ({ isLoading: true }));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    if (!(username === "admin" && password === "Admin@1234")) {
      set(() => ({ isLoading: false }));
      throw new Error("Invalid Username or Password");
    }
    localStorage.setItem("username", username);
    set(() => ({ isLoading: false }));
  },
  signOut: async () => {
    set(() => ({ isLoading: true }));
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    localStorage.removeItem("username");
    set(() => ({ isLoading: false }));
  },
}));

export default useAuthStore;
