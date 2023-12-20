import theme from "@/lib/ui/theme";
import { Box, SxProps } from "@mui/material";
import { FC } from "react";

interface SidebarModuleProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClick?: (event?: any) => void;
}

const defaultSidebarItemSx = {
  height: "44px",
  width: "100%",

  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyItems: "center",
  gap: "6px",

  margin: "auto 0",

  borderRadius: "8px",
  leftTopRadius: "0px",
  leftBottomRadius: "0px",

  paddingX: "5px",
  paddingY: "5px",

  transition: "box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: `${theme.palette.additional?.dark} !important`,
  },

  cursor: "pointer",
};

const SidebarModule: FC<SidebarModuleProps> = ({ sx, children, onClick }) => {
  return (
    <Box sx={{ ...defaultSidebarItemSx, ...sx }} onClick={onClick}>
      {children}
    </Box>
  );
};

export default SidebarModule;
