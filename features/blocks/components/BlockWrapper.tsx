import { Icons } from "@/components/Icons";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { Box, Stack } from "@mui/material";
import { useTheme } from "next-themes";
import { FC, ReactNode, memo, useEffect, useRef, useState } from "react";
import BlockWrapperMenu from "./menus/BlockWrapperMenu";
import BlockChangeTypeMenu from "./menus/BlockChangeTypeMenu";

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

  const iconRef = useRef<SVGSVGElement>(null);
  const [anchorElWrapperMenu, setAnchorElWrapperMenu] =
    useState<null | SVGSVGElement>(null);
  const [isOpenWrapperMenu, setIsOpenWrapperMenu] = useState(false);

  const handleCloseWrapperMenu = () => {
    setIsOpenWrapperMenu(false);
    setIsHovered(false);
  };

  const [anchorElChangeTypeMenu, setAnchorElChangeTypeMenu] =
    useState<null | SVGSVGElement>(null);
  const [isOpenChangeTypeMenu, setIsOpenChangeTypeMenu] = useState(false);

  const switchToOpenChangeTypeMenu = () => {
    setIsOpenWrapperMenu(false);
    setIsOpenChangeTypeMenu(true);
  };

  const handleCloseChangeTypeMenu = () => {
    setIsOpenChangeTypeMenu(false);
    setIsHovered(false);
  };

  useEffect(() => {
    setAnchorElChangeTypeMenu(iconRef.current);
    setAnchorElWrapperMenu(iconRef.current);
  }, []);

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
          onClick={() => setIsOpenWrapperMenu(true)}
          ref={iconRef}
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
        handleChangeTypeOption={() => switchToOpenChangeTypeMenu()}
        anchorEl={anchorElWrapperMenu}
        handleClose={() => handleCloseWrapperMenu()}
        isOpen={isOpenWrapperMenu}
      />
      <BlockChangeTypeMenu
        id={id}
        currentType={type}
        anchorEl={anchorElChangeTypeMenu}
        handleClose={() => handleCloseChangeTypeMenu()}
        isOpen={isOpenChangeTypeMenu}
      />
    </Stack>
  );
};

export default memo(BlockWrapper);
