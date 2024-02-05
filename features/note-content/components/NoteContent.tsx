import { FC, useEffect, useRef, useState } from "react";
import TextBlock from "./block-type/TextBlock";
import { ContentBlock } from "../../notes/types/noteTypes";
import { useSocketStore } from "@/lib/socketStore";
import { BLOCK_EVENTS } from "../blocksEvents";

interface NoteContentProps {
  originalBlocks: ContentBlock[];
}

const NoteContent: FC<NoteContentProps> = ({ originalBlocks }) => {
  const { socket } = useSocketStore();

  const [blocks, setBlocks] = useState<ContentBlock[]>(originalBlocks);

  useEffect(() => {
    if (socket === null) return;

    socket?.on(BLOCK_EVENTS.BLOCK_CREATED, (payload) => {
      const { createdBlock, senderId } = payload;
      console.log("block created", createdBlock);
      setBlocks((prevBlocks) => {
        const newBlocks = prevBlocks.map((block) => {
          if (block.order >= createdBlock.order) {
            return { ...block, order: block.order + 1 };
          } else {
            return block;
          }
        });
        newBlocks.push(createdBlock);
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
        const deletedBlockOrder = prevBlocks.find(
          (block) => block.id === payload.blockId
        )!.order;
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
    const hello = originalBlocks.sort((a, b) => a.order - b.order);
    console.log(hello);
  }, [originalBlocks]);

  return (
    <>
      {blocks &&
        blocks
          .sort((a, b) => a.order - b.order)
          .map((block) => {
            return (
              <TextBlock
                key={block.id}
                blockId={block.id}
                order={block.order}
                props={block.props}
              ></TextBlock>
            );
          })}
    </>
  );
};

export default NoteContent;
