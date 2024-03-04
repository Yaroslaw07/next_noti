import { useBlocksStore } from "../store/blocksStore";
import { shallow } from "zustand/shallow";

export const useBlocks = () => {
  const { blocks, setBlocks } = useBlocksStore((state) => state, shallow);

  const getNextBlockId = (order: number) => {
    const block = blocks.find((block) => block.order === order + 1);
    return block ? block.id : null;
  };

  const getPrevBlockId = (order: number) => {
    const block = blocks.find((block) => block.order === order - 1);
    return block ? block.id : null;
  };

  return {
    blocks,
    setBlocks,

    getNextBlockId,
    getPrevBlockId,
  };
};
