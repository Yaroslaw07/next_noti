import { SvgIconTypeMap, SxProps, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";
import SidebarModule from "./SidebarModule";

interface SidebarItemProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
  onClick?: (event?: any) => void;
  sx?: SxProps;
}

const SidebarItem: FC<SidebarItemProps> = ({ Icon, title, onClick, sx }) => {
  const defaultSx = { ...sx, ...{ height: "32px", gap: "12px" } };

  return (
    <SidebarModule sx={defaultSx} onClick={onClick}>
      <Icon
        sx={{ fontSize: "23px", color: "text.secondary", paddingLeft: "4px" }}
      ></Icon>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "500",
          fontVariant: "titling-caps",
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>
    </SidebarModule>
  );
};

export default SidebarItem;
