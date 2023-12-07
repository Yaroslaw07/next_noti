import { getNotiLayout } from "@/components/noti/Layout";
import Note from "@/components/noti/Note";
import Backdrop from "@/components/ui/Backdrop";
import { setCurrentNote } from "@/lib/reducers/currentNote";
import { AppDispatch } from "@/lib/store";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NextPageWithLayout } from "../_app";

interface NotePageProps {
  note: string;
}

const NotePage: NextPageWithLayout<NotePageProps> = (props: NotePageProps) => {
  const dispatch = useDispatch<AppDispatch>();

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

  const { note } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

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
