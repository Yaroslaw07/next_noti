import useThemeStore from "@/lib/stores/themeStore";
import { Box, BoxProps, Theme } from "@mui/material";
import { FC } from "react";

const getDefaultSidebarItemSx = (theme: Theme) => {
  return {
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
};

const SidebarModule: FC<BoxProps> = (props) => {
  const { getCurrentTheme } = useThemeStore();

  const defaultSidebarItemSx = getDefaultSidebarItemSx(getCurrentTheme());

  return <Box {...props} sx={{ ...defaultSidebarItemSx, ...props.sx }}></Box>;
};

export default SidebarModule;
