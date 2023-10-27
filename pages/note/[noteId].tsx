import NotiLayout from "@/components/noti/Layout";
import Note from "@/components/noti/Note";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NotePage() {
  const router = useRouter();

  const id = router.query.noteId;

  return (
    <>
    <Head>
      <title>Noti Note</title>
    </Head>
      <NotiLayout>
        <Note />
      </NotiLayout>
    </>
  );
}
