import { Note } from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

interface currentNoteState {
  note?: Note;
  loadStatus: "loading" | "success" | "failed" | "not-init";
  isChangedFromAutosave: boolean;
  isTitleChanged: boolean;
}

const initialState: currentNoteState = {
  note: undefined,
  loadStatus: "loading",
  isChangedFromAutosave: false,
  isTitleChanged: false,
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
        state.loadStatus = "not-init";
      }
    },
    setIsChangedFromAutosave: (state, action) => {
      state.isChangedFromAutosave = action.payload;
    },
    setIsTitleChanged: (state, action) => {
      state.isTitleChanged = action.payload;
    },
    updateTitle: (state, action) => {
      if (state.note) {
        state.note.title = action.payload.title;
        state.isChangedFromAutosave = true;
        state.isTitleChanged = true;
      }
    },
    updateContent: (state, action) => {
      if (state.note) {
        const index = state.note.blocks.findIndex(
          (block) => block.id === action.payload.id
        );

        state.note.blocks[index].props = action.payload.props;

        state.isChangedFromAutosave = true;
      }
    },
  },
});

export const {
  setCurrentNote,
  updateTitle,
  updateContent,
  setIsChangedFromAutosave,
  setIsTitleChanged,
} = currentNoteSlice.actions;
export default currentNoteSlice.reducer;
