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

const fetchNote = async (id: string) => ({
  id,
  title: "Hello World",
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt accusamus aliquam error numquam amet, consectetur totam, doloremque odit perferendis iste doloribus quod magnam tempore optio quo, tempora suscipit ullam assumenda?",
});

export default function NotePage(note: NoteType) {
  

  const dispatch = useDispatch<AppDispatch>();
  dispatch(setCurrentNote(note))
  const {status} = useSession();

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

  const note = await fetchNote(noteId);  

  // Return the data as props
  return {
    props: {
      note
    },
  };
}
