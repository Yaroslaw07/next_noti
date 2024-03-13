import { shallow } from "zustand/shallow";
import { useBlocksStore } from "../store/blocksStore";
import { Block } from "../types/blockTypes";
import { useBatchStore } from "@/features/batch/batchStore";
import { BATCH_EVENTS } from "@/features/batch/batchEvents";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useTrackingChangesStore } from "@/features/notes/stores/trackingChangesStore";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";

interface BlocksActionsProps {
  id: string;
  order: number;
}

export const useBlocksActions = ({ id, order }: BlocksActionsProps) => {
  const { addBlock, updateBlock, deleteBlock } = useBlocksStore(
    (state) => state,
    shallow
  );

  const { addChangedBlockId, hasChangedBlockId, removeChangedBlockId } =
    useTrackingChangesStore((state) => state, shallow);
  const { editMode, setEditMode } = useEditModeStore();

  const { addEvent } = useBatchStore((state) => state, shallow) || {};

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

  const updateBlockHandler = (props: Partial<Block>) => {
    currentProps.current = { ...currentProps.current, ...props } || props;

    !editMode && setEditMode(true);

    if (timeoutIdRef.current === null) {
      addChangedBlockId(id);
      timeoutIdRef.current = setTimeout(() => {
        if (!hasChangedBlockId(id)) {
          return;
        }

        props = { ...currentProps.current, updatedAt: Date.now() };
        addEvent(BATCH_EVENTS.NOTE_BLOCK_UPDATED_BATCH + "_" + id, props);
        updateBlock(id, props);
        removeChangedBlockId(id);
        currentProps.current = {};
        timeoutIdRef.current = null;
      }, 1000);
    }
  };

  const deleteBlockHandler = () => {
    removeChangedBlockId(id);
    addEvent(BATCH_EVENTS.NOTE_BLOCK_DELETED_BATCH + "_" + id);
    deleteBlock(id);
  };

  return {
    addBlock: addBlockHandler,
    updateBlock: updateBlockHandler,
    deleteBlock: deleteBlockHandler,
  };
};
