import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import { FC, JSXElementConstructor, ReactElement } from "react";
import ProtectedRoute from "../ProtectedRoute";

interface NotiLayoutProps {
  children: React.ReactNode;
}

const NotiLayout: FC<NotiLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <Grid container>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid xs item>
          <Header />
          {children}
        </Grid>
      </Grid>
    </ProtectedRoute>
  );
};

const getNotiLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  return <NotiLayout>{page}</NotiLayout>;
};

export { NotiLayout, getNotiLayout };
