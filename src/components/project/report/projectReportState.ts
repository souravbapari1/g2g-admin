import { count } from "console";
import { create } from "zustand";

type FilesState = {
  count: number;
  setCount: (count: number) => void;
  addCount: () => void;
  decCount: () => void;
};

export const useFilesState = create<FilesState>((set) => ({
  count: 0,
  setCount: (count) => set({ count }),
  addCount: () => set((state) => ({ count: state.count + 1 })),
  decCount: () => set((state) => ({ count: state.count - 1 })),
}));
