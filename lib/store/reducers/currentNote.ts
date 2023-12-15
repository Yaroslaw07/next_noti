import { createSlice } from "@reduxjs/toolkit";

interface currentNoteState {
  note?: any;
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
      state.note = action.payload.note;
      if (state.note) {
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
        state.note.content = action.payload.content;
      }
    },
  },
});

export const { setCurrentNote, updateTitle, updateContent } =
  currentNoteSlice.actions;
export default currentNoteSlice.reducer;
