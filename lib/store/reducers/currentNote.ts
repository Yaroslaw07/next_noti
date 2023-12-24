import { Note } from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

interface currentNoteState {
  note?: Note;
  loadStatus: "loading" | "success" | "failed";
  toUpdate: boolean;
}

const initialState: currentNoteState = {
  note: undefined,
  loadStatus: "loading",
  toUpdate: false,
};

const currentNoteSlice = createSlice({
  name: "currentNote",
  initialState: initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.note = action.payload;
      if (state.note !== null) {
        state.loadStatus = "success";
      } else {
        state.loadStatus = "failed";
      }
    },
    setToUpdate: (state, action) => {
      state.toUpdate = action.payload;
    },
    updateTitle: (state, action) => {
      if (state.note) {
        state.note.title = action.payload.title;
        state.toUpdate = true;
      }
    },
    updateContent: (state, action) => {
      if (state.note) {
        state.note.content = action.payload.content;
        state.toUpdate = true;
      }
    },
  },
});

export const { setCurrentNote, updateTitle, updateContent, setToUpdate } =
  currentNoteSlice.actions;
export default currentNoteSlice.reducer;
