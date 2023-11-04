import { List, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarModule from "./SidebarModule";
import Link from "@/components/ui/Link";
import useVaults from "@/hooks/useVaults";
import { NoteInfo } from "@/types/noteInfo";
import { FC, useEffect, useState } from "react";

interface NotesListProps {
  newNoteAdded: boolean;
}


const NotesList:FC<NotesListProps> = (newNoteAdded) => {
  const { currentVault } = useVaults();
  const [notes, setNotes] = useState<NoteInfo[]>([]);

  useEffect(() => {
    if (!currentVault) return;

    const fetchData = async () => {
      const response = await fetch(`/api/notes/getNotesInfo/?vaultId=${currentVault.id}`, {
        method: "GET",
      });

      const data = await response.json();
      setNotes(data.notes);
    };

    fetchData();
  }, [currentVault, newNoteAdded]);


  return (
    <>
      <Link href="/note" sx={{ textDecoration: "none", paddingBottom: "0px" }}>
        <SidebarModule
          sx={{
            gap: "6px",
            fontSize: "1.2rem",
            paddingLeft: "8px",
          }}
        >
          <Icons.Logo size={30} />
          <Typography variant="h5" sx={{ color: "primary.dark" }}>
            My notes
          </Typography>
        </SidebarModule>
      </Link>

      {!notes ? (
        "Loading..."
      ) : (
        <List
          sx={{
            paddingY: "0px",
            overflow: "auto",
            maxHeight: "100%",
            overflowY: "auto",
            marginBottom:"12px"
          }}
        >
          {notes.map((note) => (
            <NotesItem key={note.id} note={note} />
          ))}
        </List>
      )}
    </>
  );
};

export default NotesList;
