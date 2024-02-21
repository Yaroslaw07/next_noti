import { shallow } from "zustand/shallow";
import { BLOCK_EVENTS } from "../blocksEvents";
import { useSocketStore } from "@/features/socket/socketStore";

export const useBlockEvents = () => {
  const socket = useSocketStore((state) => state.socket, shallow);

  const createBlockHandler = (order: number) => {
    if (socket) {
      socket.emit(BLOCK_EVENTS.TO_CREATE_BLOCK, {
        order,
      });
    }
  };

  const updateBlockPropsHandler = (blockId: string, newProps: any) => {
    if (socket) {
      socket.emit(BLOCK_EVENTS.TO_UPDATE_BLOCK_PROPS, {
        blockId,
        newProps,
      });
    }
  };

  const deleteBlockHandler = (blockId: string) => {
    if (socket) {
      socket.emit(BLOCK_EVENTS.TO_DELETE_BLOCK, {
        blockId,
      });
    }
  };

  return {
    createBlock: createBlockHandler,
    updateBlockProps: updateBlockPropsHandler,
    deleteBlock: deleteBlockHandler,
  };
};
