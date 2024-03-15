import { createWithEqualityFn } from "zustand/traditional";
import { Block } from "../types/blockTypes";

interface blocksStore {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;

  addBlock: (block: Block) => void;
  updateBlock: (id: string, props: Partial<Block>) => void;
  deleteBlock: (id: string) => void;

  getBlockByOrder: (order: number) => Block | null;
  getBlockById: (id: string) => Block | null;
}

export const useBlocksStore = createWithEqualityFn<blocksStore>()(
  (set, get) => ({
    blocks: [],

    setBlocks: (blocks: Block[]) => {
      set({ blocks });
    },

    addBlock: (block: Block) => {
      set((state) => {
        if (state.blocks.some((b) => b.id === block.id)) {
          return state;
        }

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

    updateBlock: (id: string, props: Partial<Block>) => {
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
          (block: Block) => block.id === id
        )?.order;

        if (order === undefined) {
          return state;
        }

        state.blocks = state.blocks.map((block: Block) => {
          if (block.order > order) {
            return { ...block, order: block.order - 1 };
          } else {
            return block;
          }
        });

        return {
          blocks: state.blocks.filter((block: Block) => block.id !== id),
        };
      });
    },

    getBlockByOrder(order) {
      return get().blocks.find((block) => block.order == order) || null;
    },

    getBlockById(id) {
      return get().blocks.find((block) => block.id === id) || null;
    },
  })
);
