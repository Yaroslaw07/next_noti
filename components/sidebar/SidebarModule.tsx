import { Box, ButtonBase, SxProps } from "@mui/material";
import React, { FC } from "react";

interface SidebarModuleProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: (event?: any) => void;
}

const defaultSidebarModuleSx = {
  height: "40px",
  width: "100%",

  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyItems: "center",
  gap: "8px",

  margin: "auto 0",

  borderTopRightRadius: "8px",
  borderBottomRightRadius: "8px",

  paddingX: "12px",
  paddingY: "5px",

  transition: "box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: "#d6d6d6",
  },

  cursor: "pointer",
};

const SidebarModule: FC<SidebarModuleProps> = ({ children, sx, onClick }) => {
  
  const mergedSx = { ...defaultSidebarModuleSx, ...sx };

  return (
    <ButtonBase
      sx={{ justifyContent: "start", width: "100%", color: "primary.dark" }}
    >
      <Box sx={mergedSx} onClick={onClick}>
        {children}
      </Box>
    </ButtonBase>
  );
};

export default SidebarModule;
