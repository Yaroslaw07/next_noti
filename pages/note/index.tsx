import Head from "next/head";
import NotiLayout from "@/components/noti/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MyBackdrop from "@/components/ui/Backdrop";
import NoNote from "@/components/noti/NoNote";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setCurrentNote } from "@/lib/reducers/currentNote";
import { useEffect } from "react";

export default function NoNotePage() {

  const router = useRouter();
  const {status} = useSession();

  if (status == "unauthenticated") {
    router.push("/login");
  }

  const dispatch = useDispatch<AppDispatch>();
  const note = null;

  useEffect(() => {
    dispatch(setCurrentNote({ note }));
  },);
  
  
  return (
    <>
      <Head>
        <title>No note open</title>
      </Head>
      <MyBackdrop open={status == "loading"} />
      <NotiLayout>
        <NoNote/>
      </NotiLayout>
    </>
  );
}
