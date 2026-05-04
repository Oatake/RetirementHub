"use client"
import { create } from "zustand"
import type { User, UserProfile } from "@/lib/mock/types"
import { MOCK_USER, MOCK_PROFILE } from "@/lib/mock/data"

interface AuthStore {
  user: User | null
  profile: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void
  logout: () => void
  updateProfile: (data: Partial<UserProfile>) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: MOCK_USER,
  profile: MOCK_PROFILE,
  isAuthenticated: true,
  isLoading: false,
  login: () => set({ user: MOCK_USER, profile: MOCK_PROFILE, isAuthenticated: true }),
  logout: () => set({ user: null, profile: null, isAuthenticated: false }),
  updateProfile: (data) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    })),
}))
