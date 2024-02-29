import { NextPageWithLayout } from "../_app";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import Head from "next/head";
import { validateUUID } from "@/lib/utils";
import { Box, Container } from "@mui/material";
import NoteTitle from "@/features/notes/components/NoteTitle";
import { getNotiLayout } from "@/features/current-vault/components/layout/NoteLayout";
import { useEffect } from "react";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useToast } from "@/lib/hooks/useToast";
import { useRouter } from "next/router";
import { useFocusedBlockStore } from "@/features/notes/stores/focusedBlockStore";

interface NotePageProps {
  noteId: string;
}

const NotePage: NextPageWithLayout<NotePageProps> = ({ noteId }) => {
  const { setCurrentNote, clearCurrentNote } = useCurrentNote();
  const { setFocusedBlockId } = useFocusedBlockStore();
  const { getNoteById } = useNotes();

  const { openToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const resp = await getNoteById(noteId);
      if (resp.ok) {
        console.log(resp.data);
        setCurrentNote(resp.data.id, resp.data.title, resp.data.isPinned);
      } else {
        openToast("Failed to fetch note " + noteId, "error");
        router.push("/notes");
      }
    };

    fetchNote();

    return () => {
      clearCurrentNote();
      setFocusedBlockId(null);
    };
  }, [noteId]);

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
        <Container sx={{ marginX: "auto", width: "min(65%, 1000px)" }}>
          <Box sx={{ height: "60px" }}></Box>
          <NoteTitle />
          <Box sx={{ height: "30px" }}></Box>
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
