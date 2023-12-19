import { List, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarWrapper from "./SidebarItem";
import Link from "@/components/ui/Link";
import { useVaults } from "@/lib/hooks/useVaults";
import { FC, useEffect, useState } from "react";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useNotesListUpdate } from "@/lib/hooks/useNotesListUpdate";

const NotesList: FC = () => {
  const { currentVault } = useVaults();
  const { note: currentNote } = useCurrentNote();
  const { toNotesListUpdate, setToNotesListUpdate } = useNotesListUpdate();

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    if (!currentVault) {
      setNotes([]);
      return;
    }

    if (toNotesListUpdate) {
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

      setToNotesListUpdate(false);
      fetchData();
    }
  }, [currentVault, toNotesListUpdate]);

  return (
    <>
      <Link href="/note" sx={{ textDecoration: "none", paddingBottom: "0px" }}>
        <SidebarWrapper
          Icon={Icons.ListOfNotes}
          title={"My notes"}
        ></SidebarWrapper>
      </Link>

      {!notes && !currentNote ? (
        "Loading..."
      ) : (
        <List
          sx={{
            overflowY: "auto",
            maxHeight: "100%",
            paddingY: "6px",
          }}
        >
          {notes
            .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
            .map((note) => (
              <NotesItem
                key={note.id}
                note={note}
                active={note.id === currentNote?.id}
                title={
                  note.id === currentNote?.id ? currentNote?.title : undefined
                }
              />
            ))}
        </List>
      )}
    </>
  );
};

export default NotesList;
