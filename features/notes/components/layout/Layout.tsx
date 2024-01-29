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

  useEffect(() => {
    if (currentVault === null) {
      return;
    }

    const initSocket = async () => {
      try {
        const token = await getAccessToken();

        const socket = await initializeSocket(token);

        if (socket === undefined) {
          router.push("/vaults");
          return;
        }

        socket.on("connect", () => {
          socket.emit("joinVault", currentVault.id);
        });

        return () => {
          closeSocket();
        };
      } catch (error) {
        console.log(error);
        router.push("/auth/login");
      }
    };
    initSocket();
  }, [currentVault?.id]);

  return (
    <Grid container wrap="nowrap">
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
