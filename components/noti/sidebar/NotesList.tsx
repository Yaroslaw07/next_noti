import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";

const fetchNotes = () => {
  return [
    { id: "dasda", title: "Hello" },
    { id: "da5", title: "Hello2" },
  ];
};

const NotesList = () => {
  return (
    <>
      <Box sx={{ display: "flex", paddingLeft: "4%", gap: "3px" }}>
        <Icons.Logo size={32} />
        <Typography variant="h6" sx={{ color: "primary.dark" }}>
          My notes
        </Typography>
      </Box>

      <List sx={{ height: "100",paddingY:"2px" }}>
          {fetchNotes().map((note) => (
            <NotesItem key={note.id} note={note} />
          ))}
      </List>
    </>
  );
};

export default NotesList;
