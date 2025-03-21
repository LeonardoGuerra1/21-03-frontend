import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreState = {
  logged: boolean
  username: string | null
}

type AuthStoreActions = {
  setAccount: (username: string) => void
  unsetAccount: () => void,
  updateUsername: (username: string) => void
}

type AuthStore = AuthStoreState & AuthStoreActions

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      logged: false,
      username: null,

      setAccount: (username: string) =>
        set({
          logged: true,
          username: username.substring(0, 8)
        }),

      unsetAccount: () => 
        set({
          logged: false,
          username: null
        }),

      updateUsername: (username) =>
        set({
          username: username.substring(0, 8)
        })
    }), {
      name: "auth",
      // partialize: state => ({ logged: state.logged})
    }
  )
)