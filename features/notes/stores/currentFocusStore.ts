import { createWithEqualityFn } from "zustand/traditional";

interface FocusStore {
  focusedBlockId: string | null;
  setFocusedBlockId: (blockId: string | null) => void;
}

export const useFocusedStore = createWithEqualityFn<FocusStore>((set) => ({
  focusedBlockId: null,

  setFocusedBlockId: (blockId: string | null) => {
    set({ focusedBlockId: blockId });
  },
}));
