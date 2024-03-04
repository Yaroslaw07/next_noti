import { createWithEqualityFn } from "zustand/traditional";
import { ContentBlock } from "../types/blockTypes";

interface blocksStore {
  blocks: ContentBlock[];
  setBlocks: (blocks: ContentBlock[]) => void;

  addBlock: (block: ContentBlock) => void;
  updateBlock: (id: string, props: Partial<ContentBlock>) => void;
  deleteBlock: (id: string) => void;

  getBlockByOrder: (order: number) => ContentBlock | null;
}

export const useBlocksStore = createWithEqualityFn<blocksStore>()(
  (set, get) => ({
    blocks: [],

    setBlocks: (blocks: ContentBlock[]) => {
      set({ blocks });
    },

    addBlock: (block: ContentBlock) => {
      set((state) => {
        const order = block.order;

        const newBlocks = state.blocks.map((block) => {
          if (block.order >= order) {
            return { ...block, order: block.order + 1 };
          } else {
            return block;
          }
        });

        newBlocks.push(block);

        return {
          blocks: newBlocks,
        };
      });
    },

    updateBlock: (id: string, props: Partial<ContentBlock>) => {
      set((state) => {
        const index = state.blocks.findIndex((block) => block.id === id);

        if (index !== -1) {
          state.blocks[index] = {
            ...state.blocks[index],
            ...props,
          };
        }

        return { ...state };
      });
    },

    deleteBlock: (id: string) => {
      set((state: any) => {
        const order = state.blocks.find(
          (block: ContentBlock) => block.id === id
        )?.order;

        if (order === undefined) {
          return state;
        }

        state.blocks = state.blocks.map((block: ContentBlock) => {
          if (block.order > order) {
            return { ...block, order: block.order - 1 };
          } else {
            return block;
          }
        });

        return {
          blocks: state.blocks.filter((block: ContentBlock) => block.id !== id),
        };
      });
    },

    getBlockByOrder(order) {
      return get().blocks.find((block) => block.order == order) || null;
    },
  })
);
