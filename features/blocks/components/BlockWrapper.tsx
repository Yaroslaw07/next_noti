import { Icons } from "@/components/Icons";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { Box, Stack } from "@mui/material";
import { useTheme } from "next-themes";
import { FC, ReactNode, memo, useState } from "react";
import BlockWrapperMenu from "./BlockWrapperMenu";

interface BlockWrapperProps {
  children: ReactNode;
  id: string;
  type: string;
}

const BlockWrapper: FC<BlockWrapperProps> = ({ children, id, type }) => {
  const { resolvedTheme } = useTheme();
  const themeConfig = getCurrentTheme(resolvedTheme);

  const { editMode } = useEditModeStore();

  const [isHovered, setIsHovered] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      spacing={1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      direction={"row"}
      alignItems={"start"}
      sx={{ marginLeft: "-30px" }}
    >
      <Stack>
        <Box sx={{ height: "4px", width: "24px" }}></Box>
        <Icons.BlockWrapperIcon
          onClick={(e) => handleOpen(e)}
          sx={{
            color: "text.secondary",
            fontSize: "21px",
            opacity: !editMode && isHovered ? "100%" : "0%",
            borderRadius: "8px",
            "&:hover": {
              color: themeConfig.palette.primary.dark,
              background: themeConfig!.palette.additional?.dark,
            },
          }}
        />
      </Stack>
      {children}
      <BlockWrapperMenu
        id={id}
        type={type}
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={open}
      />
    </Stack>
  );
};

export default memo(BlockWrapper);
