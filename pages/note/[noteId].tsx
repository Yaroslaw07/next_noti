import NotiLayout from "@/components/noti/Layout";
import Note from "@/components/noti/Note";
import Backdrop from "@/components/ui/Backdrop";
import { setCurrentNote } from "@/lib/reducers/currentNote";
import { AppDispatch } from "@/lib/store";
import { Note as NoteType } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useDispatch } from "react-redux";

export default function NotePage(note: NoteType) {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setCurrentNote(note));
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Noti Note</title>
      </Head>
      <Backdrop open={status == "loading"} />
      <NotiLayout>
        <Note />
      </NotiLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const noteId = context.query.noteId as string;

  const {note} = await fetch("http://localhost:3000/api/notes/" + noteId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return {
    props: {
      note: note ?? null,
    },
  };
}
