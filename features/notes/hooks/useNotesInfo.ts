import { NoteInfo } from "@/types/note";
import { useRouter } from "next/router";
import api from "../../../lib/api/api";
import useVaultStore from "../../vaults/store/vaultStore";
import { current } from "@reduxjs/toolkit";

export const useNotesInfo = () => {
  const router = useRouter();

  const { currentVault } = useVaultStore();

  const getNotesHandler = async () => {
    try {
      const response = await api.get<NoteInfo[]>("/notes/", {
        headers: {
          vault_id: currentVault!.id,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addNoteHandler = async () => {
    try {
      const response = await api.post<NoteInfo>("/notes/", undefined, {
        headers: {
          vault_id: currentVault!.id,
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
          vault_id: currentVault!.id,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // const savingRedirect = async (url: string) => {
  //   if (isChangedFromAutosave) {
  //     saveCurrentNote().then(() => {
  //       dispatch(setIsChangedFromAutosave(false));

  //       if (isTitleChanged) {
  //         dispatch(setIsTitleChanged(false));
  //       }

  //       router.push(url);
  //     });
  //   } else if (isTitleChanged) {
  //     dispatch(setIsTitleChanged(false));
  //     router.push(url);
  //   } else router.push(url);
  // };

  return {
    getNotes: getNotesHandler,
    addNote: addNoteHandler,
    removeNote: removeNoteHandler,
    // handleRedirect: savingRedirect,
  };
};
