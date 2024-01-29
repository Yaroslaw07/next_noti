import useNoteStore from "../store/notesStore";

export const useCurrentNote = () => {
  const { setCurrentNoteId, setCurrentNoteTitle } = useNoteStore();

  const enterNoteHandler = (noteId: string, noteTitle: string) => {
    setCurrentNoteId(noteId);
    setCurrentNoteTitle(noteTitle);
  };

  const leaveNoteHandler = () => {
    setCurrentNoteId(null);
    setCurrentNoteTitle(null);
  };

  return {
    enterNote: enterNoteHandler,
    leaveNote: leaveNoteHandler,
  };
};
