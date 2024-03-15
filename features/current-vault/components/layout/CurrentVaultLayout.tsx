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
import { useBatchStore } from "@/features/batch/batchStore";
import { useTrackingChangesStore } from "@/features/notes/stores/trackingChangesStore";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";

interface CurrentVaultLayoutProps {
  children: React.ReactNode;
}

const CurrentVaultLayout: FC<CurrentVaultLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { currentVault, selectVault, leaveVault } = useCurrentVault();

  const { socket } = useSocketStore();
  const { anyChanges } = useBatchStore();

  const { isEmpty } = useTrackingChangesStore();
  const { editMode, setEditMode } = useEditModeStore();

  const emptyTrackingChanges = isEmpty();

  const disableEditMode = () => {
    editMode && setEditMode(false);
  };

  useEffect(() => {
    if (anyChanges || !emptyTrackingChanges) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [anyChanges, emptyTrackingChanges]);

  useEffect(() => {
    if (!currentVault) {
      return;
    }

    const initVaultSocket = async () => {
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

    initVaultSocket();

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

  if (currentVault === null || socket === null) {
    return <Backdrop open={true} />;
  }

  return (
    <Grid
      container
      wrap="nowrap"
      style={{ height: "100vh", width: "100vw" }}
      onMouseMove={disableEditMode}
    >
      <Grid item>
        <Sidebar />
      </Grid>
      <Grid xs item>
        <Stack spacing={0} sx={{ height: "100%", width: "100%" }}>
          <Header isVisible={!editMode} />
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

const getCurrentVaultLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  return (
    <SocketLayout>
      <CurrentVaultLayout>{page}</CurrentVaultLayout>
    </SocketLayout>
  );
};

export { CurrentVaultLayout as NotiLayout, getCurrentVaultLayout };
