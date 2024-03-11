import { NextPageWithLayout } from "../_app";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import Head from "next/head";
import { getCurrentVaultLayout } from "@/features/current-vault/components/layout/CurrentVaultLayout";
import { useEffect } from "react";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useBlocks } from "@/features/note-content/hooks/useBlocks";
import { validate as validateUUID } from "uuid";
import Note from "@/features/notes/components/Note";
import { useFocusedStore } from "@/features/notes/stores/currentFocusStore";

interface NotePageProps {
  noteId: string;
}

const NotePage: NextPageWithLayout<NotePageProps> = ({ noteId }) => {
  const { setCurrentNote, clearCurrentNote } = useCurrentNote();
  const { setFocusedBlockId } = useFocusedStore();

  const { getNoteById, joinNoteRoom, leaveNoteRoom } = useNotes();
  const { setBlocks } = useBlocks();

  const { openToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const resp = await getNoteById(noteId);
      if (resp.ok) {
        const { note } = resp.data;
        joinNoteRoom(note.id);
        setCurrentNote(note.id, note.title, note.isPinned);
        setBlocks(note.blocks);
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

  return (
    <>
      <Head>
        <title>Noti | Notes</title>
      </Head>
      <Note noteId={noteId} />
    </>
  );
};

NotePage.getLayout = getCurrentVaultLayout;

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
