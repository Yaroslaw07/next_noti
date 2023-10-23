import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarModule from "./SidebarModule";
import Link from "@/components/ui/Link";

const fetchNotes = () => {
  return [
    { id: "dasda", title: "Hello" },
    { id: "da5", title: "Hello2" },
  ];
};

const NotesList = () => {

  

  return (
    <>
      <Link href="/note" sx={{ textDecoration: "none" }}>
        <SidebarModule sx={{ gap: "4px", paddingLeft: "8px" }}>
          <Icons.Logo size={34} />
          <Typography variant="h5" sx={{ color: "primary.dark" }}>
            My notes
          </Typography>
        </SidebarModule>
      </Link>

      <List sx={{ height: "100", paddingY: "2px" }}>
        {fetchNotes().map((note) => (
          <NotesItem key={note.id} note={note} />
        ))}
      </List>
    </>
  );
};

export default NotesList;
