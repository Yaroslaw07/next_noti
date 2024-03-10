import BatchLayout from "@/features/batch/components/BatchLayout";
import NoteContent from "@/features/note-content/components/NoteContent";
import { Box, Container } from "@mui/material";
import { FC } from "react";
import NoteTitle from "./NoteTitle";

interface NoteProps {
  noteId: string;
}

const Note: FC<NoteProps> = ({ noteId }) => {
  return (
    <BatchLayout noteId={noteId}>
      <Box
        component="main"
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Container sx={{ marginX: "auto", width: "min(66%, 1000px)" }}>
          <Box sx={{ height: "60px" }}></Box>
          <NoteTitle />
          <NoteContent />
        </Container>
      </Box>
    </BatchLayout>
  );
};

export default Note;
