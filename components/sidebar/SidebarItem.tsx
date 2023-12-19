import theme from "@/lib/ui/theme";
import {
  Box,
  ButtonBase,
  IconButton,
  SvgIconTypeMap,
  SxProps,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FC } from "react";

interface SidebarItemProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
  onClick?: (event?: any) => void;
}

const defaultSidebarSx = {
  height: "40px",
  width: "100%",

  display: "flex",
  alignContent: "center",
  alignItems: "center",
  justifyItems: "center",
  gap: "12px",

  margin: "auto 0",

  borderRadius: "8px",
  leftTopRadius: "0px",
  leftBottomRadius: "0px",

  paddingX: "14px",
  paddingY: "5px",

  transition: "box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: `${theme.palette.additional?.dark} !important`,
  },

  cursor: "pointer",
};

const SidebarWrapper: FC<SidebarItemProps> = ({ Icon, title, onClick }) => {
  return (
    <ButtonBase
      sx={{ justifyContent: "start", width: "100%", color: "primary.dark" }}
    >
      <Box sx={defaultSidebarSx} onClick={onClick}>
        <Icon sx={{ fontSize: "24px", color: "text.secondary" }}></Icon>
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default SidebarWrapper;
