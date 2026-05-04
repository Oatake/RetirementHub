"use client"
import { create } from "zustand"

interface UiStore {
  isChatOpen: boolean
  isMobileMenuOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  isChatOpen: false,
  isMobileMenuOpen: false,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}))
