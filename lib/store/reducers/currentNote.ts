import { Note } from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

interface currentNoteState {
  note?: Note;
  status: string;
}

const initialState: currentNoteState = {
  note: undefined,
  status: "loading",
};

const currentNoteSlice = createSlice({
  name: "currentNote",
  initialState: initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.note = action.payload;
      if (state.note !== null) {
        state.status = "success";
      } else {
        state.status = "failed";
      }
    },
    updateTitle: (state, action) => {
      if (state.note) {
        state.note.title = action.payload.title;
      }
    },
    updateContent: (state, action) => {
      if (state.note) {
        console.log("updateContent", action.payload.content);
        state.note.content = action.payload.content;
      }
    },
  },
});

export const { setCurrentNote, updateTitle, updateContent } =
  currentNoteSlice.actions;
export default currentNoteSlice.reducer;
