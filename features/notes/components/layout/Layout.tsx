import { Grid } from "@mui/material";
import Sidebar from "@/features/note-sidebar/components/Sidebar";
import Header from "./Header";
import { FC, JSXElementConstructor, ReactElement, useEffect } from "react";
import { useVaults } from "@/features/vaults/hooks/useVaults";
import Backdrop from "@/components/ui/Backdrop";
import { useRouter } from "next/router";
import { getAccessToken } from "@/features/auth/accessToken";
import useVaultStore from "@/features/vaults/store/vaultStore";
import useNoteStore from "../../store/notesStore";

interface NotiLayoutProps {
  children: React.ReactNode;
}

const NotiLayout: FC<NotiLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { currentVault } = useVaults();

  const { initializeSocket, closeSocket } = useVaultStore();
  const {
    initializeSocket: initializeNoteSocket,
    closeSocket: closeNoteSocket,
    currentNoteId,
    socket: noteSocket,
    joinNote,
    leaveNote,
  } = useNoteStore();

  useEffect(() => {
    if (currentVault === null) {
      return;
    }

    const initSocket = async () => {
      try {
        const token = await getAccessToken();

        const vaultSocket = await initializeSocket(token);
        const noteSocket = await initializeNoteSocket(token);

        if (vaultSocket === undefined || noteSocket === undefined) {
          router.push("/vaults");
          return;
        }

        vaultSocket.on("connect", () => {
          vaultSocket.emit("joinVault", currentVault.id);
        });

        return () => {
          closeSocket();
          closeNoteSocket();
        };
      } catch (error) {
        console.log(error);
        router.push("/auth/login");
      }
    };
    initSocket();
  }, [currentVault?.id]);

  useEffect(() => {
    if (
      currentVault !== null &&
      currentNoteId !== null &&
      noteSocket !== null
    ) {
      joinNote(currentNoteId);
    }

    return () => {
      if (noteSocket !== null && currentNoteId !== null) {
        leaveNote(currentNoteId!);
      }
    };
  }, [currentNoteId, noteSocket]);

  if (currentVault === null || noteSocket === null) {
    return <Backdrop open={true} />;
  }

  return (
    <Grid container wrap="nowrap">
      <Backdrop open={currentVault === null} />
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
