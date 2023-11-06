import { List, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarModule from "./SidebarModule";
import Link from "@/components/ui/Link";
import useVaults from "@/lib/hooks/useVaults";
import { NoteInfo } from "@/types/noteInfo";
import { FC, useEffect, useState } from "react";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useSidebarUpdate } from "@/lib/hooks/useSidebarUpdate";

const NotesList: FC = () => {
  const { currentVault } = useVaults();
  const { note: currentNote } = useCurrentNote();
  const {toUpdate,setToUpdate} = useSidebarUpdate();

  const [notes, setNotes] = useState<NoteInfo[]>([]);  

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

    setToUpdate(false);
    fetchData();
  }, [currentVault, toUpdate]);



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
              title={note.id === currentNote?.id ? currentNote?.title : undefined}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default NotesList;
