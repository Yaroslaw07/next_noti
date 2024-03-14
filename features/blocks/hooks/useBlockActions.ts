import { shallow } from "zustand/shallow";
import { useBlocksStore } from "../store/blocksStore";
import { Block, BlockType } from "../types/blockTypes";
import { useBatchStore } from "@/features/batch/batchStore";
import { BATCH_EVENTS } from "@/features/batch/batchEvents";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useTrackingChangesStore } from "@/features/notes/stores/trackingChangesStore";
import { blocksConversions } from "../types/blockConversionTypes";
import { useToast } from "@/lib/hooks/useToast";

interface BlocksActionsProps {
  id: string;
  order: number;
}

export const useBlocksActions = ({ id, order }: BlocksActionsProps) => {
  const { addBlock, updateBlock, deleteBlock, getBlockById } = useBlocksStore(
    (state) => state,
    shallow
  );

  const { addChangedBlockId, hasChangedBlockId, removeChangedBlockId } =
    useTrackingChangesStore((state) => state, shallow);

  const { addEvent } = useBatchStore((state) => state, shallow) || {};

  const { openToast } = useToast();

  const addBlockHandler = (props?: any) => {
    const newBlock: Block = {
      id: uuidv4(),
      type: "text",
      order: order + 1,
      props: props || {
        text: "",
      },
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    addEvent(BATCH_EVENTS.NOTE_BLOCK_CREATED_BATCH, newBlock);
    addBlock(newBlock);

    return newBlock;
  };

  const currentProps = useRef<any>({});
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const updateBlockPropsHandler = (updateData: Partial<Block>) => {
    currentProps.current =
      { ...currentProps.current, ...updateData } || updateData;

    if (timeoutIdRef.current === null) {
      addChangedBlockId(id);
      timeoutIdRef.current = setTimeout(() => {
        if (!hasChangedBlockId(id)) {
          return;
        }

        updateData = { ...currentProps.current, updatedAt: Date.now() };
        addEvent(BATCH_EVENTS.NOTE_BLOCK_UPDATED_BATCH + "_" + id, updateData);
        updateBlock(id, updateData);
        removeChangedBlockId(id);
        currentProps.current = {};
        timeoutIdRef.current = null;
      }, 1000);
    }
  };

  const updateBlockTypeHandler = (newType: BlockType) => {
    const conversionsHandler = blocksConversions[newType];

    const block = getBlockById(id);

    if (!block) {
      return;
    }

    const updatedBlock = {
      ...block,
      type: newType,
      props: conversionsHandler(block.props),
    };

    addEvent(BATCH_EVENTS.NOTE_BLOCK_UPDATED_BATCH + "_" + id, updatedBlock);
    updateBlock(id, updatedBlock);
  };

  const deleteBlockHandler = () => {
    removeChangedBlockId(id);
    addEvent(BATCH_EVENTS.NOTE_BLOCK_DELETED_BATCH + "_" + id);
    deleteBlock(id);
  };

  return {
    addBlock: addBlockHandler,
    updateBlockProps: updateBlockPropsHandler,
    updateBlockType: updateBlockTypeHandler,
    deleteBlock: deleteBlockHandler,
  };
};
