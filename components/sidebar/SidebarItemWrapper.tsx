import theme from "@/lib/ui/theme";
import { BorderAllRounded } from "@mui/icons-material";
import { Box, ButtonBase, SxProps } from "@mui/material";
import React, { FC } from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: (event?: any) => void;
}

const defaultSidebarWrapperSx = {
  height: "40px",
  width: "100%",

  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyItems: "center",
  gap: "16px",

  margin: "auto 0",

  borderRadius: "8px",

  paddingX: "12px",
  paddingY: "5px",

  transition: "box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: `${theme.palette.additional?.dark} !important`,
  },

  cursor: "pointer",
};

const SidebarWrapper: FC<SidebarWrapperProps> = ({ children, sx, onClick }) => {
  const mergedSx = { ...defaultSidebarWrapperSx, ...sx };

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

export default SidebarWrapper;
