import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import NoNote from "@/features/notes/components/NoNote";
import { parseCookies } from "nookies";
import { GetServerSidePropsContext } from "next";
import { getNotiLayout } from "@/features/current-vault/components/layout/NoteLayout";

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
