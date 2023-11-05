import { List, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarModule from "./SidebarModule";
import Link from "@/components/ui/Link";
import useVaults from "@/hooks/useVaults";
import { NoteInfo } from "@/types/noteInfo";
import { FC, useEffect, useState } from "react";
import useCurrentNote from "@/hooks/useCurrentNote";

interface NotesListProps {
  newNoteAdded: boolean;
}

const NotesList: FC<NotesListProps> = ({ newNoteAdded }) => {
  const { currentVault } = useVaults();
  const [notes, setNotes] = useState<NoteInfo[]>([]);

  const { note: currentNote } = useCurrentNote();

  useEffect(() => {
    if (!currentVault) return;

    const fetchData = async () => {
      const response = await fetch(
        `/api/notes/getNotesInfo/?vaultId=${currentVault.id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setNotes(data.notes);
    };

    fetchData();
  }, [currentVault]);

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
          <Typography variant="h5">My notes</Typography>
        </SidebarModule>
      </Link>

      {!notes && !currentNote ? (
        "Loading..."
      ) : (
        <List
          sx={{
            overflowY: "auto",
            maxHeight: "100%",
            marginBottom: "12px",
          }}
        >
          {notes.map((note) => (
            <NotesItem
              key={note.id}
              note={note}
              active={note.id === currentNote?.id}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default NotesList;
