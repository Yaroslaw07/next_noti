import { Grid } from "@mui/material";
import Sidebar from "@/features/note-sidebar/components/Sidebar";
import Header from "./Header";
import { FC, JSXElementConstructor, ReactElement, useEffect } from "react";
import { useVaults } from "@/features/vaults/hooks/useVaults";
import Backdrop from "@/components/ui/Backdrop";
import { useRouter } from "next/router";
import useVaultStore from "@/features/vaults/store/vaultStore";
import useNoteStore from "../../store/notesStore";
import { VaultSocketLayout } from "@/features/vaults/components/layout/VaultSocketLayout";
import { VAULT_EVENTS } from "@/features/vaults/vaultsEvents";
import { useSocketStore } from "@/lib/socketStore";

interface NotiLayoutProps {
  children: React.ReactNode;
}

const NoteLayout: FC<NotiLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { currentVault } = useVaults();
  const { socket } = useSocketStore();

  const { joinNote, leaveNote, currentNoteId } = useNoteStore();

  useEffect(() => {
    if (!currentVault) {
      return;
    }

    const initNoteSocket = async () => {
      try {
        if (socket === undefined) {
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

    return () => {
      socket?.emit(VAULT_EVENTS.LEAVE_VAULT_ROOM, currentVault.id);
    };
  }, [currentVault]);

  useEffect(() => {
    if (currentVault !== null && currentNoteId !== null && socket !== null) {
      joinNote(socket, currentNoteId);
    }

    return () => {
      if (socket !== null && currentNoteId !== null) {
        leaveNote(socket, currentNoteId!);
      }
    };
  }, [currentNoteId, socket]);

  if (currentVault === null || socket === null) {
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
  return (
    <VaultSocketLayout>
      <NoteLayout>{page}</NoteLayout>
    </VaultSocketLayout>
  );
};

export { NoteLayout as NotiLayout, getNotiLayout };
