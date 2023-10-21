import { Box, BoxProps } from "@mui/material";
import React, { FC } from "react";

interface SidebarModuleProps {
  children: React.ReactNode;
  opts?: BoxProps;
}

const SidebarModuleWrapper: FC<SidebarModuleProps> = ({ children,opts }) => {
  return (
    <Box
      sx={{
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        paddingY: "5px",
        margin: "auto 0",
        paddingLeft: "12px",
        paddingRight: "12px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
        gap: "8px",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          backgroundColor: "#d6d6d6",
        },
        alignContent: "center",
        cursor: "pointer",
      }}
      {...opts}
    >
      {children}
    </Box>
  );
};

export default SidebarModuleWrapper;
