import { getNotiLayout } from "@/components/notes/Layout";
import NoNote from "@/components/notes/NoNote";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store/store";
import { setCurrentNote } from "@/lib/store/reducers/currentNote";
import { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";

const NoNotePage: NextPageWithLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const note = null;

  useEffect(() => {
    dispatch(setCurrentNote({ note }));
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
