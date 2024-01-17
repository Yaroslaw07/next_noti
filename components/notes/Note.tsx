import { Box, Container, Fab, Input, Skeleton } from "@mui/material";
import NoteTitle from "./NoteTitle";
import NoteContent from "./NoteContent";
import useCurrentNote from "@/lib/hooks/useCurrentNote";

const Note = () => {
  const { note } = useCurrentNote();

  if (note === undefined || note === null) {
    return (
      <Box sx={{ paddingX: "80px" }}>
        <Skeleton height={"100px"} />
      </Box>
    );
  } else {
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
  }
};

export default Note;
