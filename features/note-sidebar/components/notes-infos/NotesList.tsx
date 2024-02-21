import { Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import { useCurrentVault } from "@/features/vaults/hooks/useCurrentVault";
import { FC, useEffect, useState } from "react";
import SidebarModule from "../base/SidebarModule";
import { useNotesInfo } from "../../hooks/useNotesInfo";
import { NoteInfo } from "../../types/noteInfoTypes";
import { useRouter } from "next/router";
import useNoteStore from "@/features/notes/stores/notesStore";
import { NOTE_INFOS_EVENTS } from "../../notesInfoEvents";
import { useSocketStore } from "@/lib/socketStore";

const NotesList: FC = () => {
  const router = useRouter();

  const { currentVault } = useCurrentVault();
  const { getNotes } = useNotesInfo();

  const { socket } = useSocketStore();
  const { currentNoteId, currentNoteTitle } = useNoteStore();

  const [notes, setNotes] = useState<NoteInfo[]>([]);

  useEffect(() => {
    if (currentVault === null) return;

    const fetchData = async () => {
      const response = await getNotes();
      setNotes(response.data);
    };

    fetchData();
  }, [currentVault]);

  useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.on(NOTE_INFOS_EVENTS.NOTE_CREATED, (createdNote) => {
      setNotes((prev) => [...prev, createdNote]);
    });

    socket.on(NOTE_INFOS_EVENTS.NOTE_INFOS_UPDATED, (updatedNote) => {
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    });

    socket.on(NOTE_INFOS_EVENTS.NOTE_DELETED, (deletedNote) => {
      setNotes((prev) => prev.filter((note) => note.id !== deletedNote.id));
    });

    return () => {
      socket.off(NOTE_INFOS_EVENTS.NOTE_CREATED);
      socket.off(NOTE_INFOS_EVENTS.NOTE_INFOS_UPDATED);
      socket.off(NOTE_INFOS_EVENTS.NOTE_DELETED);
    };
  }, [socket]);

  return (
    <>
      <SidebarModule
        sx={{
          ...(router.pathname === "/notes" && {
            backgroundColor: "additional.dark",
          }),
        }}
        onClick={() => router.push("/notes")}
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

      {!notes ? (
        "Loading..."
      ) : (
        <Stack
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            paddingBottom: "8px",
            width: "100%",
          }}
        >
          {notes
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((currNote) => (
              <NotesItem
                key={currNote.id}
                note={currNote}
                active={currNote.id === currentNoteId}
                title={
                  currNote.id === currentNoteId
                    ? currentNoteTitle || ""
                    : undefined
                }
              />
            ))}
        </Stack>
      )}
    </>
  );
};

export default NotesList;
