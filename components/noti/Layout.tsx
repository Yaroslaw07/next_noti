import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import { FC, useEffect } from "react";
import useVaults from "@/lib/hooks/useVaults";
import useCurrentNote from "@/lib/hooks/useCurrentNote";
import Backdrop from "../ui/Backdrop";

interface NotiLayoutProps {
  children: React.ReactNode;
}

const NotiLayout: FC<NotiLayoutProps> = ({ children }) => {
  const { isLoading } = useVaults();

  if (isLoading) {
    return <Backdrop open={true} />;
  }

  return (
      <Grid container>
        
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

export default NotiLayout;
