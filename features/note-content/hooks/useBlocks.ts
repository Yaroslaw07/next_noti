import { ContentBlock } from "@/features/notes/types/noteTypes";
import { useSocketStore } from "@/lib/socketStore";
import { useEffect, useRef, useState } from "react";
import { BLOCK_EVENTS } from "../blocksEvents";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";

export const useBlocks = (originalBlocks: ContentBlock[]) => {
  const { socket } = useSocketStore();

  const [blocks, setBlocks] = useState<ContentBlock[]>(originalBlocks);
  const { focusedBlockId, setFocusedBlockId } = useFocusedBlockStore();

  const focusedBlockIdRef = useRef<typeof focusedBlockId>();

  useEffect(() => {
    focusedBlockIdRef.current = focusedBlockId;
  }, [focusedBlockId]);

  useEffect(() => {
    if (socket === null) return;

    socket?.on(BLOCK_EVENTS.BLOCK_CREATED, (payload) => {
      const { createdBlock, senderId } = payload;
      setBlocks((prevBlocks) => {
        const newBlocks = prevBlocks.map((block) => {
          if (block.order >= createdBlock.order) {
            return { ...block, order: block.order + 1 };
          } else {
            return block;
          }
        });
        newBlocks.push(createdBlock);

        if (senderId === socket.id) {
          setFocusedBlockId(createdBlock.id);
        }
        return newBlocks;
      });
    });

    socket?.on(BLOCK_EVENTS.BLOCK_PROPS_UPDATED, (payload) => {
      setBlocks((prevBlocks) => {
        const newBlocks = prevBlocks.map((block) => {
          if (block.id === payload.blockId) {
            return { ...block, props: payload.newProps };
          } else {
            return block;
          }
        });

        return newBlocks;
      });
    });

    socket?.on(BLOCK_EVENTS.BLOCK_DELETED, (payload) => {
      setBlocks((prevBlocks) => {
        const deleteBlock = prevBlocks.find(
          (block) => block.id === payload.blockId
        );

        const deletedBlockOrder = deleteBlock?.order || 0;

        deletedBlockOrder === 0
          ? setFocusedBlockId("title")
          : focusedBlockIdRef.current &&
            focusedBlockIdRef.current === payload.blockId &&
            setFocusedBlockId(
              getPrevBlockId(deletedBlockOrder, prevBlocks) || null
            );

        const newBlocks = prevBlocks
          .filter((block) => block.id !== payload.blockId)
          .map((block) => {
            if (block.order > deletedBlockOrder) {
              return { ...block, order: block.order - 1 };
            } else {
              return block;
            }
          });

        return newBlocks;
      });
    });

    return () => {
      socket?.off(BLOCK_EVENTS.BLOCK_CREATED);
      socket?.off(BLOCK_EVENTS.BLOCK_PROPS_UPDATED);
      socket?.off(BLOCK_EVENTS.BLOCK_DELETED);
    };
  }, [socket]);

  useEffect(() => {
    setBlocks(originalBlocks);
  }, [originalBlocks]);

  const getNextBlockId = (order: number, blocks: ContentBlock[]) => {
    const block = blocks.find((block) => block.order === order + 1);
    return block ? block.id : null;
  };

  const getPrevBlockId = (order: number, blocks: ContentBlock[]) => {
    const block = blocks.find((block) => block.order === order - 1);
    return block ? block.id : null;
  };

  return {
    blocks,
    getNextBlockId,
    getPrevBlockId,
  };
};