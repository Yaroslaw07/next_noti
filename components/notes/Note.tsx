import { Box, Container, Fab, Input } from "@mui/material";
import TextArea from "../ui/TextArea";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { updateContent } from "@/lib/store/reducers/currentNote";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";
import { Icons } from "../Icons";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";

const Note = () => {
  const { saveCurrentNote } = useCurrentNote();
  const { setToNotesListUpdate } = useUiUpdate();

  const saveNoteHandler = async () => {
    await saveCurrentNote();
    setToNotesListUpdate(true);
  };

  return (
    <Box sx={{ paddingX: "80px" }}>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: "90%",
          marginX: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: "80px" }}></Box>
        <NoteTitle />
        <NoteContent />
        <Fab
          color="primary"
          size="large"
          aria-label="save"
          sx={{ position: "absolute", bottom: "1rem", right: "1rem" }}
          onClick={saveNoteHandler}
        >
          <Icons.Save />
        </Fab>
      </Container>
    </Box>
  );
};

export default Note;
