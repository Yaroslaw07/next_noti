import { NoteInfo } from "@/types/note";
import store, { useAppDispatch } from "../store/store";
import api from "../api/api";
import useCurrentNote from "./useCurrentNote";
import { setToUpdate } from "../store/reducers/currentNote";
import { useRouter } from "next/router";
import { useUiUpdate } from "./useUiUpdate";

export const useNotesInfo = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { note, toUpdate, saveCurrentNote } = useCurrentNote();
  const { setToNotesListUpdate } = useUiUpdate();

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

  const handleRedirect = (url: string) => {
    if (note == null || toUpdate == false) {
      router.push(url);
    }

    if (toUpdate) {
      saveCurrentNote().then(() => {
        setToNotesListUpdate(true);
        dispatch(setToUpdate(false));
        router.push(url);
      });
    }
  };

  return {
    getNotes: getNotesHandler,
    addNote: addNoteHandler,
    removeNote: removeNoteHandler,
    handleRedirect,
  };
};
