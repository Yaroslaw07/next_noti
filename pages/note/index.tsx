import { Icons } from "@/components/Icons";
import {
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NotiLayout from "@/components/noti/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import MyBackdrop from "@/components/ui/Backdrop";
import NoNote from "@/components/noti/NoNote";

export default function NoNotePage() {

  const router = useRouter();
  const {status} = useSession();

  if (status == "unauthenticated") {
    router.push("/login");
  }

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
