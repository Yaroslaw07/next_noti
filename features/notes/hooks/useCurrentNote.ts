import { notesService } from "../service/notesService";
import useNoteStore from "../store/notesStore";
import { useVaults } from "@/features/vaults/hooks/useVaults";

export const useCurrentNote = () => {
  const { setCurrentNoteId, setCurrentNoteTitle } = useNoteStore();
  const { currentVault } = useVaults();

  const enterNoteHandler = (noteId: string, noteTitle: string) => {
    setCurrentNoteId(noteId);
    setCurrentNoteTitle(noteTitle);
  };

  const leaveNoteHandler = () => {
    setCurrentNoteId(null);
    setCurrentNoteTitle(null);
  };

  const saveTitleHandler = (noteId: string, newTitle: string) => {
    return notesService.updateTitle(currentVault?.id!, noteId, newTitle);
  };

  return {
    enterNote: enterNoteHandler,
    leaveNote: leaveNoteHandler,

    saveTitle: saveTitleHandler,
  };
};
