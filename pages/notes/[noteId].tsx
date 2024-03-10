import { NextPageWithLayout } from "../_app";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import Head from "next/head";
import { getNotiLayout } from "@/features/current-vault/components/layout/NoteLayout";
import { useEffect } from "react";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";
import { useBlocks } from "@/features/note-content/hooks/useBlocks";
import { validate as validateUUID } from "uuid";
import Note from "@/features/notes/components/Note";

interface NotePageProps {
  noteId: string;
}

const NotePage: NextPageWithLayout<NotePageProps> = ({ noteId }) => {
  const { setCurrentNote, clearCurrentNote } = useCurrentNote();
  const { setFocusedBlockId } = useFocusedBlockStore();

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
