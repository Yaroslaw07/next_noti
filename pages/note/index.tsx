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
      <MyBackdrop open={status=="loading"} />
      <NotiLayout>
        <Container component="main" sx={{ height: "90%" }}>
          <Stack
            spacing={1}
            minHeight={"100%"}
            alignItems="center"
            justifyContent="center"
            textAlign={"center"}
            component="section"
          >
            <Icons.NoNoteOpen size={180} />
            <Typography variant="h3" sx={{ fontWeight: "600" }}>
              No note open
            </Typography>
          </Stack>
        </Container>
      </NotiLayout>
    </>
  );
}
