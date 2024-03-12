import { Box, Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import { FC, useEffect, useState } from "react";
import SidebarModule from "../../current-vault/components/layout/sidebar/base/SidebarModule";
import { useRouter } from "next/router";
import useCurrentNote from "@/features/notes/stores/currentNoteStore";
import { NOTE_INFOS_EVENTS } from "../notesInfoEvents";
import { useCurrentVault } from "@/features/current-vault/hooks/useCurrentVault";
import { useNotesInfo } from "../hooks/useNotesInfo";
import { useSocketStore } from "@/features/socket/socketStore";
import { MouseEvent } from "react";
import { useNoteInfosStore } from "../store/noteInfosStore";

const NotesList: FC = () => {
  const router = useRouter();

  const { currentVault } = useCurrentVault();

  const { loadNotes, notes, setNotes } = useNotesInfo();
  const { currentNoteId, currentNotePinned } = useCurrentNote();

  const { addNote, removeNote } = useNoteInfosStore();
  const { socket } = useSocketStore();

  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (currentVault === null && notes !== null) return;

    const fetchData = async () => {
      await loadNotes();
    };

    fetchData();
  }, [currentVault]);

  useEffect(() => {
    if (currentNoteId === null || currentNotePinned === null) {
      return;
    }

    console.log(notes);

    const updatedNotes =
      notes?.map((note) =>
        note.id === currentNoteId
          ? { ...note, pinned: currentNotePinned }
          : note
      ) || [];

    setNotes(updatedNotes);
  }, [currentNoteId, currentNotePinned]);

  useEffect(() => {
    if (socket === null) {
      return;
    }

    socket.on(NOTE_INFOS_EVENTS.NOTE_CREATED, ({ createdNote }) => {
      addNote(createdNote);
    });

    socket.on(NOTE_INFOS_EVENTS.NOTE_INFOS_UPDATED, ({ updatedNote }) => {
      if (updatedNote.id === currentNoteId) {
        return;
      }

      setNotes(
        (notes || []).map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    });

    socket.on(NOTE_INFOS_EVENTS.NOTE_DELETED, ({ deletedNoteId }) => {
      console.log(deletedNoteId, currentNoteId);

      if (deletedNoteId === currentNoteId) {
        router.push("/notes");
      }

      removeNote(deletedNoteId);
    });

    return () => {
      socket.off(NOTE_INFOS_EVENTS.NOTE_CREATED);
      socket.off(NOTE_INFOS_EVENTS.NOTE_INFOS_UPDATED);
      socket.off(NOTE_INFOS_EVENTS.NOTE_DELETED);
    };
  }, [socket, notes]);

  const toggleOrder = (event: MouseEvent<any>) => {
    event.stopPropagation();
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <SidebarModule
        sx={{
          ...(router.pathname === "/notes" && {
            backgroundColor: "additional.dark",
          }),
          justifyContent: "space-between",
        }}
        onClick={() => router.push("/notes")}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
        </Box>

        {order === "asc" ? (
          <Icons.DoubleArrowDown
            sx={{
              color: "text.secondary",
              fontSize: "20px",
            }}
            onClick={(e) => toggleOrder(e)}
          />
        ) : (
          <Icons.DoubleArrowUp
            sx={{
              color: "text.secondary",
              fontSize: "20px",
            }}
            onClick={(e) => toggleOrder(e)}
          />
        )}
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
            .filter((note) => note.isPinned)
            .sort((a, b) =>
              order === "asc"
                ? a.createdAt < b.createdAt
                  ? 1
                  : -1
                : a.createdAt > b.createdAt
                ? 1
                : -1
            )
            .map((currNote) => (
              <NotesItem key={currNote.id} note={currNote} />
            ))}
          {notes
            .filter((note) => !note.isPinned)
            .sort((a, b) =>
              order === "asc"
                ? a.createdAt < b.createdAt
                  ? 1
                  : -1
                : a.createdAt > b.createdAt
                ? 1
                : -1
            )
            .map((currNote) => (
              <NotesItem key={currNote.id} note={currNote} />
            ))}
        </Stack>
      )}
    </>
  );
};

export default NotesList;
