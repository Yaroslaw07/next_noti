import { getNotiLayout } from "@/components/notes/Layout";
import Note from "@/components/notes/Note";
import { Note as NoteType } from "@/types/note";
import { setCurrentNote } from "@/lib/store/reducers/currentNote";
import { AppDispatch } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextPageWithLayout } from "../_app";
import { GetServerSidePropsContext } from "next";
import customFetch from "@/lib/api/fetch";
import { parseCookies } from "nookies";
import Head from "next/head";

interface NotePageProps {
  note: NoteType;
}

const NotePage: NextPageWithLayout<NotePageProps> = ({
  note,
}: NotePageProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    if (note == null) {
      router.push("/notes");
    }

    dispatch(setCurrentNote(note));
  });

  return (
    <>
      <Head>
        <title>{note.title}</title>
      </Head>
      <Note />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const noteId = context.query.noteId as string;
  const cookies = parseCookies(context);

  const response = await customFetch(context, `/notes/${noteId}`, {
    method: "GET",
    headers: {
      vault_id: JSON.parse(cookies.currentVault).id,
    },
  });

  if (!response!.ok) {
    return {
      props: {
        note: null,
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
