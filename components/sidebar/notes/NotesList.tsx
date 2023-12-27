import { Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import { useVaults } from "@/lib/hooks/useVaults";
import { FC, useEffect, useState } from "react";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";
import SidebarModule from "../SidebarModule";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";
import { NoteInfo } from "@/types/note";
import { useRouter } from "next/router";

const NotesList: FC = () => {
  const router = useRouter();

  const { currentVault } = useVaults();
  const { getNotes, handleRedirect } = useNotesInfo();
  const { note } = useCurrentNote();
  const { toNotesListUpdate, setToNotesListUpdate } = useUiUpdate();

  const [notes, setNotes] = useState<NoteInfo[]>([]);

  useEffect(() => {
    if (!toNotesListUpdate) return;

    if (currentVault == null) {
      setNotes([]);
      setToNotesListUpdate(false);
      return;
    }

    const fetchData = async () => {
      const response = await getNotes();
      setNotes(response!);
      setToNotesListUpdate(false);
    };

    fetchData();
  }, [toNotesListUpdate]);

  return (
    <>
      <SidebarModule
        sx={{
          ...(router.pathname === "/notes" && {
            backgroundColor: "#d8d8d8",
          }),
        }}
        onClick={() => handleRedirect("/notes")}
      >
        <Icons.ListOfNotes sx={{ fontSize: "30px", color: "text.secondary" }} />
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

      {!notes && !note ? (
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
            .map((currNote) => (
              <NotesItem
                key={currNote.id}
                note={currNote}
                active={currNote.id === note?.id}
                title={currNote.id === note?.id ? note?.title : undefined}
              />
            ))}
        </Stack>
      )}
    </>
  );
};

export default NotesList;
