import { Box, Container, Fab, Input } from "@mui/material";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";

const Note = () => {
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
      </Container>
    </Box>
  );
};

export default Note;
