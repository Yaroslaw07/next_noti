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
        width: "200px",

        mr: "4px",

        backgroundColor: "additional.main",

        display: "flex",
        flexDirection: "column",
        gap: "2px",
        alignContent: "center",

        borderRadius: "0px",

        paddingY: "8px",
        paddingX: "4px",
      }}
    >
      {children}
    </Paper>
  );
};

export default SidebarWrapper;
