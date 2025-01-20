// zustand is a small, fast and scalable bear-bones state-management solution. It has a very simple API and is easy to use. It is a great alternative to Redux, Recoil, and MobX.
import { create } from 'zustand';

export const useMobileNav = create((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));