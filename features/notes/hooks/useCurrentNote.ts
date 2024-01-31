import useNoteStore from "../store/notesStore";

export const useCurrentNote = () => {
  const { setCurrentNoteId, setCurrentNoteTitle } = useNoteStore();

  const { socket } = useNoteStore();

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
      socket.emit("hi", noteId, newTitle);
    }
  };

  return {
    enterNote: enterNoteHandler,
    leaveNote: leaveNoteHandler,

    saveTitle: saveTitleHandler,
  };
};
