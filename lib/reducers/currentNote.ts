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

    }
});

export default currentNoteSlice.reducer;



