import { create } from "zustand";

export const useSideMenu = create<{
  open: boolean;
  toggle: () => void;
  openMenu: () => void;
  close: () => void;
}>((set) => ({
  open: true,
  toggle: () => set((state) => ({ open: !state.open })),
  openMenu: () => set(() => ({ open: true })),
  close: () => set(() => ({ open: false })),
}));
