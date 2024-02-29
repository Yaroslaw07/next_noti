import { createWithEqualityFn } from "zustand/traditional";
import { ContentBlock } from "../types/blockTypes";

interface blocksStore {
  blocks: ContentBlock[] ;
  setBlocks: (blocks: ContentBlock[]) => void;
  addBlock: (block: ContentBlock) => void;
  updateBlock: (id: string, props: Partial<ContentBlock>) => void;
  deleteBlock: (id: string) => void;
}

export const useBlocksStore = createWithEqualityFn<blocksStore>()(
  (set, get) => ({
    blocks: [],

    setBlocks: (blocks: ContentBlock[]) => {
      set({ blocks });
    },

    addBlock: (block: ContentBlock) => {
      set((state: any) => {
        return {
          blocks: [...state.blocks, block],
        };
      });
    },

    updateBlock: (id: string, props: Partial<ContentBlock>) => {
      set((state: any) => {
        return {
          blocks: state.blocks.map((block: ContentBlock) => {
            if (block.id === id) {
              return { ...block, ...props };
            } else {
              return block;
            }
          }),
        };
      });
    },

    deleteBlock: (id: string) => {
      set((state: any) => {
        return {
          blocks: state.blocks.filter((block: ContentBlock) => block.id !== id),
        };
      });
    },
  })
);
