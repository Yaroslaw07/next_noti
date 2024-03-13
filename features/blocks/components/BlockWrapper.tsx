import { Icons } from "@/components/Icons";
import { useEditModeStore } from "@/features/notes/stores/editModeStore";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { Box, ButtonBase, Grid, Stack } from "@mui/material";
import { useTheme } from "next-themes";
import { FC, ReactNode, useState } from "react";

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
    </Stack>
  );
};

export default BlockWrapper;
