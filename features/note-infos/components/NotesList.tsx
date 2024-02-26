import { Box, Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import { FC, useEffect, useState } from "react";
import SidebarModule from "../../current-vault/components/layout/sidebar/base/SidebarModule";
import { NoteInfo } from "../types/noteInfoTypes";
import { useRouter } from "next/router";
import useNoteStore from "@/features/notes/stores/notesStore";
import { NOTE_INFOS_EVENTS } from "../notesInfoEvents";
import { useCurrentVault } from "@/features/current-vault/hooks/useCurrentVault";
import { useNotesInfo } from "../hooks/useNotesInfo";
import { useSocketStore } from "@/features/socket/socketStore";
import { MouseEvent } from "react";

const NotesList: FC = () => {
  const router = useRouter();

  const { currentVault } = useCurrentVault();
  const { getNotes } = useNotesInfo();

  const { socket } = useSocketStore();
  const { currentNoteId, currentNoteTitle } = useNoteStore();

  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

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
            .filter((note) => note.pinned)
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
          {notes
            .filter((note) => !note.pinned)
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
