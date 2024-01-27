import { Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import { useVaults } from "@/lib/hooks/useVaults";
import { FC, useEffect, useState } from "react";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import SidebarModule from "../SidebarModule";
import { useNotesInfo } from "@/lib/hooks/useNotesInfo";
import { NoteInfo } from "@/types/note";
import { useRouter } from "next/router";
import useVaultStore from "@/lib/store/vaultSocketStore";

const NotesList: FC = () => {
  const router = useRouter();

  const { currentVault } = useVaults();
  const { getNotes, handleRedirect } = useNotesInfo();
  const { note } = useCurrentNote();
  const { socket } = useVaultStore();

  const [notes, setNotes] = useState<NoteInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNotes();
      setNotes(response!);
    };

    fetchData();
  }, [currentVault]);

  useEffect(() => {
    if (socket === null || socket === undefined) {
      return;
    }

    socket.on("note-created", (createdNote) => {
      setNotes((prev) => [...prev, createdNote]);
      handleRedirect(`/notes/${createdNote.id}`);
    });

    socket.on("noteInfos-updated", (updatedNote) => {
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    });

    socket.on("note-deleted", (deletedNoteId) => {
      console.log("note-deleted", deletedNoteId);
      setNotes((prev) => prev.filter((note) => note.id !== deletedNoteId));
    });

    return () => {
      socket.off("notes");
    };
  }, [socket]);

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
            overflowX: "hidden",
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
