import { useBatchStore } from "@/features/batch/batchStore";
import useCurrentNoteStore from "../stores/currentNoteStore";
import { shallow } from "zustand/shallow";
import { useRef } from "react";
import { BATCH_EVENTS } from "@/features/batch/batchEvent";

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

    title !== "" && (titleToSave.current = title);

    if (timeoutIdRef.current === null) {
      timeoutIdRef.current = setTimeout(() => {
        addEvent(BATCH_EVENTS.NOTE_INFO_UPDATED_BATCH, {
          title: titleToSave.current,
        });
        timeoutIdRef.current = null;
      }, 1000);
    }
  };

  const setCurrentNotePinHandler = (isPinned: boolean) => {
    if (currentNotePinned === isPinned) {
      return;
    }

    setCurrentNotePinned(isPinned);
    console.log("pinned: " + isPinned);
    addEvent(BATCH_EVENTS.NOTE_INFO_UPDATED_BATCH, {
      isPinned,
    });
  };

  const clearCurrentNoteHandler = () => {
    setCurrentNoteId(null);
    setCurrentNoteTitle(null);
    setCurrentNotePinned(null);
  };

  return {
    currentNoteId,
    currentNotePinned,
    currentNoteTitle,

    setCurrentNoteTitle: setCurrentNoteTitleHandler,
    setCurrentNotePinned: setCurrentNotePinHandler,

    setCurrentNote: setCurrentNoteHandler,
    clearCurrentNote: clearCurrentNoteHandler,
  };
};
