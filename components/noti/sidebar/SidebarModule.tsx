import { Box, ButtonBase, SxProps } from "@mui/material";
import React, { FC } from "react";

interface SidebarModuleProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: () => void;
}

const defaultSidebarModuleSx = {
  height: "40px",
  display: "flex",
  width:"100%",
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
}

const SidebarModule: FC<SidebarModuleProps> = ({ children,sx,onClick }) => {

   const mergedSx = { ...defaultSidebarModuleSx, ...sx};

  return (
    <ButtonBase sx={{justifyContent:"start",width:"100%",color: "primary.dark"}}>
      <Box sx={mergedSx} onClick={onClick}>
        {children}
      </Box>
    </ButtonBase>
  );
};

export default SidebarModule;
