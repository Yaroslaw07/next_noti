import { getNotiLayout } from "@/components/noti/Layout";
import Note from "@/components/noti/Note";
import Backdrop from "@/components/ui/Backdrop";
import { setCurrentNote } from "@/lib/reducers/currentNote";
import { AppDispatch } from "@/lib/store";
import { Note as NoteType } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextPageWithLayout } from "../_app";

interface NotePageProps {
  note: NoteType;
}

const NotePage: NextPageWithLayout<NotePageProps> = (props: NotePageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (props.note == null) {
      router.push("/note");
    }

    dispatch(setCurrentNote(props));
  });

  return (
    <>
      <Backdrop open={status == "loading"} />
      <Note />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const noteId = context.query.noteId as string;

  const { note } = await fetch("http://localhost:3000/api/notes/" + noteId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return {
    props: {
      note: note,
    },
  };
}

NotePage.getLayout = (page) => {
  return getNotiLayout(page);
};

export default NotePage;
