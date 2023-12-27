import { Note } from "@/types/note";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "@/lib/api/api";
import { setIsChangedFromAutosave } from "../reducers/currentNote";

export const saveCurrentNote = createAsyncThunk<undefined, undefined>(
  "notes/saveCurrentNote",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const currentVault = state.currentVault.vault!;
      const currentNote = state.currentNote.note;

      await api.patch<Note>(
        `/notes/${currentNote?.id}`,
        {
          title: currentNote?.title,
          content: currentNote?.content || "",
        },
        {
          headers: {
            vault_id: currentVault.id,
          },
        }
      );

      dispatch(setIsChangedFromAutosave(false));
    } catch (error) {
      return rejectWithValue("Failed to save note");
    }
  }
);
