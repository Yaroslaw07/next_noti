import { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import useNoteStore from "@/features/notes/store/notesStore";
import NoNote from "@/features/notes/components/NoNote";
import { getNotiLayout } from "@/features/notes/components/layout/Layout";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";

const NoNotePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Noti | Notes</title>
      </Head>
      <NoNote />
    </>
  );
};

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

  return {
    props: {},
  };
}

NoNotePage.getLayout = (page) => {
  return getNotiLayout(page);
};

export default NoNotePage;
