import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import {
  FC,
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import { useVaults } from "@/lib/hooks/useVaults";
import Backdrop from "../ui/Backdrop";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import { useUiUpdate } from "@/lib/hooks/useUiUpdate";
import useCurrentNote from "@/lib/hooks/useCurrentNote";

interface NotiLayoutProps {
  children: React.ReactNode;
}

const NotiLayout: FC<NotiLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { currentVault } = useVaults();

  const { setToNotesListUpdate } = useUiUpdate();
  const { note } = useCurrentNote();

  const currentNoteId = useRef<string | null>(null);

  useEffect(() => {
    if (note?.id) {
      currentNoteId.current = note.id;
    }
  }, [note?.id]);

  useEffect(() => {
    if (currentVault === null) {
      router.push("/vaults");
      return;
    }

    const socket = io(`${process.env.NEXT_PUBLIC_APP_API_URL}`, {
      query: {
        vaultId: currentVault?.id,
      },
    });

    socket.on("newNote", () => {
      setToNotesListUpdate(true);
    });

    socket.on("noteDeleted", (noteId) => {
      if (currentNoteId.current !== null && currentNoteId.current === noteId) {
        console.log("here");
        router.replace("/notes/");
      }
      setToNotesListUpdate(true);
    });

    return () => {
      socket.close();
    };
  }, [currentVault?.id]);

  return (
    <Grid container>
      <Backdrop open={currentVault === undefined} />
      <Grid item>
        <Sidebar />
      </Grid>
      <Grid xs item>
        <Header />
        {children}
      </Grid>
    </Grid>
  );
};

const getNotiLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  return <NotiLayout>{page}</NotiLayout>;
};

export { NotiLayout, getNotiLayout };
