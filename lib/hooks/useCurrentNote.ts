import store, { RootState, useAppDispatch } from "@/lib/store/store";
import { useSelector } from "react-redux";
import { updateContent, updateTitle } from "../store/reducers/currentNote";
import api from "../api/api";
import { Note } from "@/types/note";
import uiUpdate from "../store/reducers/uiUpdate";
import { useUiUpdate } from "./useUiUpdate";

const useCurrentNote = () => {
  const { note, status } = useSelector((state: RootState) => state.currentNote);
  const { setToNotesListUpdate } = useUiUpdate();

  const dispatch = useAppDispatch();

  const updateTitleHandler = (title: string) => {
    dispatch(updateTitle({ title }));
  };

  const updateContentHandler = (content: string) => {
    dispatch(updateContent({ content }));
  };

  const saveCurrentNoteHandler = async () => {
    try {
      const currentVault = store.getState().currentVault.vault!;
      const currentNote = store.getState().currentNote.note;

      const response = await api.patch<Note>(
        `/notes/${currentNote?.id}`,
        {
          title: note?.title,
          content: note?.content || "",
        },
        {
          headers: {
            vault_id: currentVault.id,
          },
        }
      );
      setToNotesListUpdate(true);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  console.log("useCurrentNote", note, status);

  return {
    note,
    status,
    updateTitle: updateTitleHandler,
    updateContent: updateContentHandler,
    saveCurrentNote: saveCurrentNoteHandler,
  };
};

export default useCurrentNote;
