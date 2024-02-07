import { Note as NoteType } from "@/features/notes/types/noteTypes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import { GetServerSidePropsContext } from "next";
import fetchCall from "@/lib/api/fetch";
import { parseCookies } from "nookies";
import Head from "next/head";
import { getNotiLayout } from "@/features/notes/components/layout/NoteLayout";
import { Box, Container } from "@mui/material";
import NoteTitle from "@/features/notes/components/NoteTitle";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import NoteContent from "@/features/note-content/components/NoteContent";
import { useFocusedBlockStore } from "@/features/notes/store/focusedBlockStore";

interface NotePageProps {
  note: NoteType;
}

const NotePage: NextPageWithLayout<NotePageProps> = ({
  note,
}: NotePageProps) => {
  const router = useRouter();

  const { enterNote, leaveNote } = useCurrentNote();
  const { setFocusedBlockId } = useFocusedBlockStore();

  useEffect(() => {
    if (note == null) {
      router.push("/notes");
    }

    enterNote(note.id, note.title);
    setFocusedBlockId(null);

    return () => {
      leaveNote();
    };
  }, [note?.id]);

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
        <Container sx={{ marginX: "auto", width: "min(75%, 1000px)" }}>
          <Box sx={{ height: "60px" }}></Box>
          <NoteTitle />
          <Box sx={{ height: "16px" }}></Box>
          <NoteContent originalBlocks={note.blocks} />
        </Container>
      </Box>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const noteId = context.query.noteId as string;
  const cookies = parseCookies(context);

  if (!cookies.currentVault) {
    return {
      redirect: {
        destination: "/vaults",
        permanent: false,
      },
    };
  }

  const response = await fetchCall(context, `/notes/${noteId}`, {
    method: "GET",
    headers: {
      vault_id: JSON.parse(cookies.currentVault).id,
    },
  });

  if (response == undefined || response.status !== 200) {
    return {
      redirect: {
        destination: "/notes",
        permanent: false,
      },
    };
  }

  return {
    props: {
      note: await response?.json(),
    },
  };
}

NotePage.getLayout = (page) => {
  return getNotiLayout(page);
};

export default NotePage;
