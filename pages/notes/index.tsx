import { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import useNoteStore from "@/features/notes/store/notesStore";
import NoNote from "@/features/notes/components/NoNote";
import { getNotiLayout } from "@/features/notes/components/layout/Layout";

const NoNotePage: NextPageWithLayout = () => {
  const { setCurrentNoteId } = useNoteStore();

  useEffect(() => {
    setCurrentNoteId(null);
  }, []);

  return (
    <>
      <Head>
        <title>Noti | No Note</title>
      </Head>
      <NoNote />
    </>
  );
};

NoNotePage.getLayout = (page) => {
  return getNotiLayout(page);
};

export default NoNotePage;
