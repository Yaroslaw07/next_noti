import useNoteStore from "../stores/notesStore";
import { NOTE_EVENTS } from "../notesEvents";
import { shallow } from "zustand/shallow";
import { useSocketStore } from "@/features/socket/socketStore";

export const useCurrentNote = () => {
  const { setCurrentNoteId, setCurrentNoteTitle, setCurrentNotePinned } =
    useNoteStore(
      (state) => ({
        setCurrentNoteId: state.setCurrentNoteId,
        setCurrentNoteTitle: state.setCurrentNoteTitle,
        setCurrentNotePinned: state.setCurrentNotePinned,
      }),
      shallow
    );

  const socket = useSocketStore((state) => state.socket, shallow);

  const enterNoteHandler = (
    noteId: string,
    noteTitle: string,
    pinned: boolean
  ) => {
    setCurrentNoteId(noteId);
    setCurrentNoteTitle(noteTitle);
    setCurrentNotePinned(pinned);
  };

  const leaveNoteHandler = () => {
    setCurrentNoteId(null);
    setCurrentNoteTitle(null);
    setCurrentNotePinned(null);
  };

  const saveTitleHandler = (newTitle: string) => {
    if (socket) {
      socket.emit(NOTE_EVENTS.TO_UPDATE_NOTE_TITLE, {
        newTitle,
      });
    }
  };

  const updatePinHandler = (pinned: boolean) => {
    if (socket) {
      socket.emit(NOTE_EVENTS.TO_UPDATE_NOTE_PIN, {
        pinned,
      });
    }
  };

  return {
    enterNote: enterNoteHandler,
    leaveNote: leaveNoteHandler,
    updatePin: updatePinHandler,
    saveTitle: saveTitleHandler,
  };
};
