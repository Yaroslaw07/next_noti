import { NoteInfo } from "@/types/note";
import store from "../store/store";
import api from "../api/api";

export const useNotesInfo = () => {
  const getNotesHandler = async () => {
    try {
      const currentVault = store.getState().currentVault.vault!;

      const response = await api.get<NoteInfo[]>("/notes/", {
        headers: {
          vault_id: currentVault.id,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addNoteHandler = async () => {
    try {
      const currentVault = store.getState().currentVault.vault!;

      const response = await api.post<NoteInfo>("/notes/", undefined, {
        headers: {
          vault_id: currentVault.id,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const removeNoteHandler = async (noteId: string) => {
    try {
      const response = await api.delete<NoteInfo>(`/notes/${noteId}`, {
        headers: {
          vault_id: store.getState().currentVault.vault!.id,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getNotes: getNotesHandler,
    addNote: addNoteHandler,
    removeNote: removeNoteHandler,
  };
};
