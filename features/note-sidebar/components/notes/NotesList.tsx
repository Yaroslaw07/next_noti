import { Stack, Typography } from "@mui/material";
import NotesItem from "./NotesItem";
import { Icons } from "@/components/Icons";
import { useVaults } from "@/features/vaults/hooks/useVaults";
import { FC, useEffect, useState } from "react";
import SidebarModule from "../SidebarModule";
import { useNotesInfo } from "../../hooks/useNotesInfo";
import { NoteInfo } from "../../types/noteInfoTypes";
import { useRouter } from "next/router";
import useVaultStore from "@/features/vaults/store/vaultStore";
import useNoteStore from "@/features/notes/store/notesStore";

const NotesList: FC = () => {
  const router = useRouter();

  const { currentVault } = useVaults();
  const { getNotes } = useNotesInfo();

  const { socket } = useVaultStore();
  const { currentNoteId, currentNoteTitle } = useNoteStore();

  const [notes, setNotes] = useState<NoteInfo[]>([]);

  console.log("NotesList", notes);

  useEffect(() => {
    if (currentVault === null) return;

    const fetchData = async () => {
      const response = await getNotes();
      console.log("response", response);
      setNotes(response.data);
    };

    fetchData();
  }, [currentVault]);

  useEffect(() => {
    if (socket === null || socket === undefined) {
      return;
    }

    socket.on("note-created", (createdNote) => {
      setNotes((prev) => [...prev, createdNote]);
      router.push(`/notes/${createdNote.id}`);
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
