import { Grid, Stack } from "@mui/material";
import Sidebar from "@/features/current-vault/components/layout/sidebar/Sidebar";
import { FC, JSXElementConstructor, ReactElement, useEffect } from "react";
import Backdrop from "@/components/ui/Backdrop";
import { useRouter } from "next/router";
import { VAULT_EVENTS } from "@/features/vaults/vaultsEvents";
import { useCurrentVault } from "../../hooks/useCurrentVault";
import { useSocketStore } from "@/features/socket/socketStore";
import { SocketLayout } from "@/features/socket/SocketLayout";
import Header from "./Header";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useNotes } from "@/features/notes/hooks/useNotes";

interface NoteLayoutProps {
  children: React.ReactNode;
}

const NoteLayout: FC<NoteLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { currentVault, selectVault, leaveVault } = useCurrentVault();
  const { socket } = useSocketStore();

  const { currentNoteId } = useCurrentNote();
  const { joinNoteRoom, leaveNoteRoom } = useNotes();

  useEffect(() => {
    if (!currentVault) {
      return;
    }

    const initNoteSocket = async () => {
      try {
        if (socket === null) {
          router.push("/vaults");
          return;
        }

        socket?.emit(VAULT_EVENTS.JOIN_VAULT_ROOM, currentVault.id);
      } catch (error) {
        console.log(error);
        router.push("/auth/login");
      }
    };
    initNoteSocket();

    socket?.on(VAULT_EVENTS.VAULT_UPDATED, (vault) => {
      selectVault(vault);
    });

    socket?.on(VAULT_EVENTS.VAULT_DELETED, () => {
      leaveVault();
      router.push("/vaults");
    });

    return () => {
      socket?.off(VAULT_EVENTS.VAULT_UPDATED);
      socket?.off(VAULT_EVENTS.VAULT_DELETED);
      socket?.emit(VAULT_EVENTS.LEAVE_VAULT_ROOM, currentVault.id);
    };
  }, [currentVault]);

  useEffect(() => {
    if (currentVault !== null && currentNoteId !== null && socket !== null) {
      joinNoteRoom(currentNoteId);
    }

    return () => {
      if (socket !== null && currentNoteId !== null) {
        leaveNoteRoom(currentNoteId);
      }
    };
  }, [currentNoteId, socket]);

  if (currentVault === null || socket === null) {
    return <Backdrop open={true} />;
  }

  return (
    <>
      <Backdrop open={currentVault === null} />
      <Grid container wrap="nowrap" style={{ height: "100vh", width: "100vw" }}>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid xs item>
          <Stack spacing={0} sx={{ height: "100%", width: "100%" }}>
            <Header />
            {children}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

const getNotiLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  return (
    <SocketLayout>
      <NoteLayout>{page}</NoteLayout>
    </SocketLayout>
  );
};

export { NoteLayout as NotiLayout, getNotiLayout };
