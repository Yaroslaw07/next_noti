import useNoteStore from "../store/notesStore";
import { NOTE_EVENTS } from "../notesEvents";
import { shallow } from "zustand/shallow";
import { useSocketStore } from "@/lib/socketStore";

export const useCurrentNote = () => {
  const { setCurrentNoteId, setCurrentNoteTitle } = useNoteStore(
    (state) => ({
      setCurrentNoteId: state.setCurrentNoteId,
      setCurrentNoteTitle: state.setCurrentNoteTitle,
    }),
    shallow
  );

  const socket = useSocketStore((state) => state.socket, shallow);

  const enterNoteHandler = (noteId: string, noteTitle: string) => {
    setCurrentNoteId(noteId);
    setCurrentNoteTitle(noteTitle);
  };

  const leaveNoteHandler = () => {
    setCurrentNoteId(null);
    setCurrentNoteTitle(null);
  };

  const saveTitleHandler = (noteId: string, newTitle: string) => {
    if (socket) {
      socket.emit(NOTE_EVENTS.TO_UPDATE_NOTE_TITLE, {
        noteId,
        newTitle,
      });
    }
  };

  return {
    enterNote: enterNoteHandler,
    leaveNote: leaveNoteHandler,

    saveTitle: saveTitleHandler,
  };
};
