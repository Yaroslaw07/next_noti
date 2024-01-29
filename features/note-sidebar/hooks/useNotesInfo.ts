import { useRouter } from "next/router";
import api from "../../../lib/api/api";
import useVaultStore from "../../vaults/store/vaultStore";
import { NoteInfo } from "../types/noteInfoTypes";
import notesInfoService from "../services/noteInfoService";

export const useNotesInfo = () => {
  const { currentVault } = useVaultStore();

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
