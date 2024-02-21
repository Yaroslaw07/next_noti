import useCurrentVaultStore from "../../current-vault/stores/currentVaultStore";
import notesInfoService from "../services/noteInfoService";

export const useNotesInfo = () => {
  const { currentVault } = useCurrentVaultStore();

  const getNotesHandler = async () => {
    return notesInfoService.getNotes(currentVault!.id);
  };

  const addNoteHandler = async () => {
    return notesInfoService.addNote(currentVault!.id);
  };

  const removeNoteHandler = async (noteId: string) => {
    return notesInfoService.removeNote(currentVault!.id, noteId);
  };

  return {
    getNotes: getNotesHandler,
    addNote: addNoteHandler,
    removeNote: removeNoteHandler,
  };
};
