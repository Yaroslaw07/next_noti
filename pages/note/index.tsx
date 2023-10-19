import Header from "@/components/Header";
import { Icons } from "@/components/Icons";
import Sidebar from "@/components/Sidebar";
import {
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function NoNotePage() {

  return (
    <Grid container>
      <Grid item>
        <Sidebar />
      </Grid>
      <Grid xs item>
        <Header />
        <div style={{ height: "10%" }}></div>
        <Container component="main" sx={{height:"70%"}}>
        <Stack
          spacing={0}
          minHeight={"100%"}
          alignItems="center"
          justifyContent="center"
          textAlign={"center"}
          component="section"
        >
          <Icons.NoNoteOpen size={200}/>
          <Typography variant="h2" sx={{fontWeight:"700"}}>No note open</Typography>
        </Stack>
        </Container>
      </Grid>
    </Grid>
  );
}
