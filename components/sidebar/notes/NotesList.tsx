import { List, Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import SidebarWrapper from "../modules/SidebarItem";
import Link from "@/components/ui/Link";
import { useVaults } from "@/lib/hooks/useVaults";
import { FC, useEffect, useState } from "react";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";
import SidebarModule from "../SidebarModule";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";

const NotesList: FC = () => {
  const { currentVault } = useVaults();

  const { getNotes } = useNotesInfo();
  const { note: currentNote } = useCurrentNote();

  const { toNotesListUpdate, setToNotesListUpdate } = useUiUpdate();

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    if (!currentVault) {
      setNotes([]);
      return;
    }

    if (currentVault == null) {
      setNotes([]);
      return;
    }

    if (toNotesListUpdate) {
      const fetchData = async () => {
        const response = await getNotes();
        setNotes(response!);
      };

      setToNotesListUpdate(false);
      fetchData();
    }
  }, [currentVault, toNotesListUpdate]);

  return (
    <>
      <Link href="/notes" sx={{ textDecoration: "none", width: "100%" }}>
        <SidebarModule>
          <Icons.ListOfNotes
            sx={{ fontSize: "30px", color: "text.secondary" }}
          />
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: "text.secondary",
              marginTop: "2px",
            }}
          >
            {"My Notes"}
          </Typography>
        </SidebarModule>
      </Link>

      {!notes && !currentNote ? (
        "Loading..."
      ) : (
        <Stack
          sx={{
            overflowY: "auto",
            maxHeight: "100%",
            paddingBottom: "8px",
            width: "100%",
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
        </Stack>
      )}
    </>
  );
};

export default NotesList;
