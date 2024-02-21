import { Paper } from "@mui/material";
import { FC } from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({ children }) => {
  return (
    <Paper
      component="aside"
      sx={{
        height: "100dvh",
        width: "240px",

        mr: "4px",

        backgroundColor: "additional.light",

        display: "flex",
        flexDirection: "column",
        gap: "0px",
        alignContent: "center",

        borderRadius: "0px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",

        paddingY: "4px",
        paddingLeft: "8px",
        paddingRight: "4px",
      }}
    >
      {children}
    </Paper>
  );
};

export default SidebarWrapper;
