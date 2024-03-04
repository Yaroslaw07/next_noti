import { NextPageWithLayout } from "../_app";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import NoteTitle from "@/features/notes/components/NoteTitle";
import { getNotiLayout } from "@/features/current-vault/components/layout/NoteLayout";
import { useEffect, useRef } from "react";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";
import { useBatchStore } from "@/features/batch/batchStore";
import { useSocketStore } from "@/features/socket/socketStore";
import { CURRENT_NOTE_SOCKET_EVENTS } from "@/features/notes/notesEvents";
import NoteContent from "@/features/note-content/components/NoteContent";
import { useBlocks } from "@/features/note-content/hooks/useBlocks";
import { validate as validateUUID } from "uuid";

interface NotePageProps {
  noteId: string;
}

const NotePage: NextPageWithLayout<NotePageProps> = ({ noteId }) => {
  const { setCurrentNote, clearCurrentNote } = useCurrentNote();
  const { setFocusedBlockId } = useFocusedBlockStore();
  const { anyChanges, getAndClearEvents } = useBatchStore();

  const { getNoteById, joinNoteRoom, leaveNoteRoom } = useNotes();
  const { setBlocks } = useBlocks();
  const { socket } = useSocketStore();

  const { openToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const resp = await getNoteById(noteId);
      if (resp.ok) {
        joinNoteRoom(resp.data.id);
        setCurrentNote(resp.data.id, resp.data.title, resp.data.isPinned);
        setBlocks(resp.data.blocks);
      } else {
        openToast("Failed to fetch note " + noteId, "error");
        router.push("/notes");
      }
    };

    fetchNote();

    return () => {
      leaveNoteRoom(noteId);
      clearCurrentNote();
      setFocusedBlockId(null);
    };
  }, [noteId]);

  useEffect(() => {
    if (socket !== null && anyChanges) {
      const batchUpdates = getAndClearEvents();

      const timeStamp = Date.now();

      console.log(batchUpdates, timeStamp);

      socket.emit(CURRENT_NOTE_SOCKET_EVENTS.TO_BATCH_UPDATE_NOTE, {
        batchUpdates,
        timeStamp,
      });
    }
  }, [noteId, socket, anyChanges]);

  return (
    <>
      <Head>
        <title>Noti | Notes</title>
      </Head>
      <Box
        component="main"
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Container sx={{ marginX: "auto", width: "min(66%, 1000px)" }}>
          <Box sx={{ height: "60px" }}></Box>
          <NoteTitle />
          {/* <Box sx={{ height: "30px" }}></Box> */}
          <NoteContent />
        </Container>
      </Box>
    </>
  );
};

NotePage.getLayout = getNotiLayout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = parseCookies(context);

  if (!cookies.currentVault) {
    return {
      redirect: {
        destination: "/vaults",
        permanent: false,
      },
    };
  }

  const noteId = context.query.noteId as string;

  if (!validateUUID(noteId)) {
    return {
      redirect: {
        destination: "/notes",
        permanent: false,
      },
    };
  }

  return {
    props: {
      noteId,
    },
  };
}

export default NotePage;
