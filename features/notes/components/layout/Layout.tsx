import { Grid } from "@mui/material";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Header from "./Header";
import {
  FC,
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import { useVaults } from "@/lib/hooks/useVaults";
import Backdrop from "../../../../components/ui/Backdrop";
import { useRouter } from "next/router";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import { getAccessToken } from "@/features/auth/accessToken";
import useVaultStore from "@/features/vaults/store/vaultStore";
interface NotiLayoutProps {
  children: React.ReactNode;
}

const NotiLayout: FC<NotiLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { currentVault } = useVaults();

  const { note } = useCurrentNote();

  const { initializeSocket, closeSocket } = useVaultStore();

  const currentNoteId = useRef<string | null>(null);

  useEffect(() => {
    if (note?.id) {
      currentNoteId.current = note.id;
    }
  }, [note?.id]);

  useEffect(() => {
    if (currentVault === null || currentVault === undefined) {
      currentVault === null && router.push("/vaults");
      return;
    }

    const initSocket = async () => {
      try {
        const token = await getAccessToken();

        const socket = await initializeSocket(token);

        if (socket === undefined) {
          router.push("/auth/vaults");
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
