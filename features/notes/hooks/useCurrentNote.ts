import useNoteStore from "../store/notesStore";
import { NOTE_EVENTS } from "../notesEvents";
import { shallow } from "zustand/shallow";

export const useCurrentNote = () => {
  const { setCurrentNoteId, setCurrentNoteTitle, socket } = useNoteStore(
    (state) => ({
      setCurrentNoteId: state.setCurrentNoteId,
      setCurrentNoteTitle: state.setCurrentNoteTitle,
      socket: state.socket,
    }),
    shallow
  );

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
