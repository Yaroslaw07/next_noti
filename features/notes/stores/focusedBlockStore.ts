import { createWithEqualityFn } from "zustand/traditional";

interface FocusStore {
  focusedBlockId: string | null;
  setFocusedBlockId: (blockId: string | null) => void;
}

export const useFocusedBlockStore = createWithEqualityFn<FocusStore>((set) => ({
  focusedBlockId: null,

  setFocusedBlockId: (blockId: string | null) => {
    set({ focusedBlockId: blockId });
  },
}));
