import { Note } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface currentNoteState {
  note?: Note;
  status: string;
};

const initialState: currentNoteState = {
  note: undefined,
  status: "loading"
};

const currentNoteSlice = createSlice({
    name: "currentNote",
    initialState:initialState,
    reducers: {
      setCurrentNote: (state, action) => {
        state.note = action.payload.note;
        if (state.note) {
          state.status = "success";
        } else {
          state.status = "failed";
        }
      }
    }
});

export const { setCurrentNote } = currentNoteSlice.actions;
export default currentNoteSlice.reducer;



