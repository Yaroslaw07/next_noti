import { useBlocksStore } from "../store/blocksStore";
import { shallow } from "zustand/shallow";

const movableBlockTypes = ["text", "header1", "header2"];

export const useBlocks = () => {
  const { blocks, setBlocks, getBlockByOrder } = useBlocksStore(
    (state) => state
  );

  const getNextBlockId = (order: number) => {
    for (let i = order + 1; i < blocks.length; i++) {
      const block = getBlockByOrder(i);
      if (block && movableBlockTypes.includes(block.type)) {
        return block;
      }
    }
    return null;
  };

  const getPrevBlockId = (order: number) => {
    for (let i = order - 1; i >= 0; i--) {
      const block = getBlockByOrder(i);
      if (block && movableBlockTypes.includes(block!.type)) {
        return block;
      }
    }
    return null;
  };

  return {
    blocks,
    setBlocks,

    getNextBlockId,
    getPrevBlockId,
  };
};
