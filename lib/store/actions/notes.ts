import { Note } from "@/types/note";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "@/lib/api/api";
import {
  setIsChangedFromAutosave,
  setIsTitleChanged,
} from "../reducers/currentNote";

export const saveCurrentNote = createAsyncThunk<undefined, undefined>(
  "notes/saveCurrentNote",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const currentVault = state.currentVault.vault!;
      const currentNote = state.currentNote.note;
      const isTitleUpdated = state.currentNote.isTitleChanged;
      dispatch(setIsChangedFromAutosave(false));
      dispatch(setIsTitleChanged(false));

      await api.put<Note>(
        `/notes/${currentNote?.id}`,
        {
          title: currentNote?.title || "",
          blocks: currentNote?.blocks || "",
          isTitleUpdated,
        },
        {
          headers: {
            vault_id: currentVault.id,
          },
        }
      );
    } catch (error) {
      return rejectWithValue("Failed to save note");
    }
  }
);
