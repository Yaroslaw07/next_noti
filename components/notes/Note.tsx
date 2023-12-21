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

const Note = () => {
  const { saveCurrentNote } = useCurrentNote();

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
          onClick={saveCurrentNote}
        >
          <Icons.Save />
        </Fab>
      </Container>
    </Box>
  );
};

export default Note;
