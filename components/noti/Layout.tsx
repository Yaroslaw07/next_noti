import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import { FC } from "react";

interface NotiLayoutProps {
  children: React.ReactNode;
}

const NotiLayout: FC<NotiLayoutProps> = ({ children }) => {
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
