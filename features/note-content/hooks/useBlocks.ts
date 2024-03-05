import { useBlocksStore } from "../store/blocksStore";
import { shallow } from "zustand/shallow";

const movableBlockTypes = ["text", "header1", "header2"];

export const useBlocks = () => {
  const { blocks, setBlocks, getBlockByOrder } = useBlocksStore(
    (state) => state,
    shallow
  );

  const getNextBlockId = (order: number) => {
    for (let i = order + 1; i <= blocks.length; i++) {
      const block = getBlockByOrder(i);
      console.log(i, "block", block);
      if (movableBlockTypes.includes(block!.type)) {
        return block;
      }
    }
    return null;
  };

  const getPrevBlockId = (order: number) => {
    for (let i = order - 1; i >= 0; i--) {
      const block = getBlockByOrder(i);
      if (movableBlockTypes.includes(block!.type)) {
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
