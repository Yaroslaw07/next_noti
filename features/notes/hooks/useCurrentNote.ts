import { useBatchStore } from "@/features/batch/batchStore";
import useCurrentNoteStore from "../stores/currentNoteStore";
import { shallow } from "zustand/shallow";
import { useRef } from "react";
import { BATCH_EVENTS } from "@/features/batch/batchEvents";
import { useBlocksStore } from "@/features/blocks/store/blocksStore";
import { v4 as uuidv4 } from "uuid";
import { useFocusedStore } from "../stores/currentFocusStore";
import { useNoteInfosStore } from "@/features/note-infos/store/noteInfosStore";
import { useTrackingChangesStore } from "../stores/trackingChangesStore";
import { update } from "lodash";
import { useEditModeStore } from "../stores/editModeStore";

export const useCurrentNote = () => {
  const {
    currentNoteId,
    currentNotePinned,
    currentNoteTitle,
    setCurrentNoteId,
    setCurrentNoteTitle,
    setCurrentNotePinned,
  } = useCurrentNoteStore((state) => state, shallow);

  const { addEvent } = useBatchStore((state) => state, shallow);
  const { updateNote } = useNoteInfosStore();
  const { addBlock } = useBlocksStore((state) => state, shallow);

  const { setFocusedBlockId } = useFocusedStore();
  const { editMode, setEditMode } = useEditModeStore();
  const { addChangedBlockId, removeChangedBlockId } = useTrackingChangesStore();

  const titleToSave = useRef<string | null>(null);

  const setCurrentNoteHandler = (
    noteId: string,
    noteTitle: string,
    isPinned: boolean
  ) => {
    setCurrentNoteId(noteId);
    setCurrentNotePinned(isPinned);
    setCurrentNoteTitle(noteTitle);
  };

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const setCurrentNoteTitleHandler = (title: string) => {
    setCurrentNoteTitle(title);

    !editMode && setEditMode(true);
    title !== "" && (titleToSave.current = title);

    if (timeoutIdRef.current === null) {
      addChangedBlockId("title");

      timeoutIdRef.current = setTimeout(() => {
        addEvent(BATCH_EVENTS.NOTE_INFO_UPDATED_BATCH, {
          title: titleToSave.current,
          updatedAt: Date.now(),
        });
        updateNote({ id: currentNoteId!, title: titleToSave.current! });
        removeChangedBlockId("title");
        timeoutIdRef.current = null;
      }, 1000);
    }
  };

  const setCurrentNotePinHandler = (isPinned: boolean) => {
    if (currentNotePinned === isPinned) {
      return;
    }

    setCurrentNotePinned(isPinned);
    addEvent(BATCH_EVENTS.NOTE_INFO_UPDATED_BATCH, {
      isPinned,
      updatedAt: Date.now(),
    });
    updateNote({
      id: currentNoteId!,
      isPinned,
    });
  };

  const clearCurrentNoteHandler = () => {
    setCurrentNoteId(null);
    setCurrentNoteTitle(null);
    setCurrentNotePinned(false);
  };

  const addBlockAfterTitle = (props?: any) => {
    if (currentNoteId === null) {
      return;
    }

    const newBlock = {
      id: uuidv4(),
      type: "text",
      order: 0,
      props: props || {
        text: "",
      },
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    addEvent(BATCH_EVENTS.NOTE_BLOCK_CREATED_BATCH, newBlock);

    addBlock(newBlock);

    setFocusedBlockId(newBlock.id);
  };

  return {
    currentNoteId,
    currentNotePinned,
    currentNoteTitle,

    setCurrentNoteId,
    setCurrentNoteTitle: setCurrentNoteTitleHandler,
    setCurrentNotePinned: setCurrentNotePinHandler,

    setCurrentNote: setCurrentNoteHandler,
    clearCurrentNote: clearCurrentNoteHandler,

    addBlockAfterTitle,
  };
};
