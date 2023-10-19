import Header from "@/components/noti/Header";
import { Icons } from "@/components/Icons";
import Sidebar from "@/components/noti/Sidebar";
import {
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import NotiLayout from "@/components/noti/Layout";

export default function NoNotePage() {

  return (
    <>
      <Head>
        <title>No note open</title>
      </Head>
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
            <Typography variant="h2" sx={{ fontWeight: "600" }}>
              No note open
            </Typography>
          </Stack>
        </Container>
      </NotiLayout>
    </>
  );
}
