import { Grid } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header";
import { FC, JSXElementConstructor, ReactElement, useEffect } from "react";
import useVaults from "@/lib/hooks/useVaults";
import Backdrop from "../ui/Backdrop";
import { Provider } from "react-redux";
import store from "@/lib/store";

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

const getNotiLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => {
  return (
    <Provider store={store}>
      <NotiLayout>{page}</NotiLayout>
    </Provider>
  );
};

export { NotiLayout, getNotiLayout };
