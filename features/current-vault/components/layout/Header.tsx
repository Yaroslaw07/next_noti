import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { Icons } from "../../../../components/Icons";
import { useTheme } from "next-themes";
import { getCurrentTheme } from "@/lib/ui/getCurrentTheme";
import { FC, useState } from "react";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";
import { useRouter } from "next/router";

export const getToolbarSx = (theme: Theme) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "50px",
    [theme.breakpoints.up("sm")]: {
      minHeight: "50px",
      paddingX: "12px",
    },
  };
};

export const getHeaderIconSx = (theme: Theme) => {
  return {
    fontSize: "34px",
    marginTop: "-8px",
    borderRadius: "8px",
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.dark,
      background: theme.palette.additional?.dark,
    },
  };
};

interface HeaderProps {
  isVisible: boolean;
}

const Header: FC<HeaderProps> = ({ isVisible }) => {
  const {
    currentNoteId,
    currentNoteTitle,
    currentNotePinned,
    setCurrentNotePinned,
  } = useCurrentNote();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const themeConfig = getCurrentTheme(resolvedTheme);

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const isModalOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setTheme(value);
  };

  const truncatedTitle =
    currentNoteTitle && currentNoteTitle.length > 20
      ? `${currentNoteTitle.substring(0, 20)}...`
      : currentNoteTitle;

  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        height: "40px",
        opacity: isVisible ? "100" : "0",
        transition: isVisible
          ? "opacity 0.3s ease-in-out"
          : "opacity 0.3s ease-in-out",
      }}
    >
      <Toolbar sx={getToolbarSx(themeConfig)}>
        <Box sx={{ width: "30%" }}>
          {currentNoteId === null && router.pathname !== "/notes" ? (
            <Skeleton variant="text" width={"100%"} height={"40px"} />
          ) : (
            <Typography
              variant="subtitle1"
              sx={{
                paddingTop: "0px",
                fontSize: "1.05rem",
                fontWeight: "500",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {currentNoteId === null && "No note open"}
              {currentNoteId !== null && currentNoteTitle == ""
                ? "Untitled"
                : truncatedTitle}
            </Typography>
          )}
        </Box>
        <Stack direction={"row"} gap={"12px"} alignItems={"center"}>
          {currentNoteId && (
            <>
              {currentNotePinned ? (
                <Icons.Pinned
                  sx={{ ...getHeaderIconSx(themeConfig), fontSize: "24px" }}
                  onClick={() => setCurrentNotePinned(false)}
                />
              ) : (
                <Icons.ToPin
                  sx={{ ...getHeaderIconSx(themeConfig), fontSize: "22px" }}
                  onClick={() => setCurrentNotePinned(true)}
                />
              )}
            </>
          )}
          <Icons.More
            sx={getHeaderIconSx(themeConfig)}
            onClick={(e) => handleMenuOpen(e)}
          />
        </Stack>

        <Menu anchorEl={anchorEl} open={isModalOpen} onClose={handleMenuClose}>
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            }}
            disableRipple
          >
            <ToggleButtonGroup
              value={theme}
              exclusive
              onChange={handleThemeChange}
            >
              <ToggleButton value="light" disabled={theme === "light"}>
                <Icons.LightTheme />
              </ToggleButton>
              <ToggleButton value="dark" disabled={theme === "dark"}>
                <Icons.DarkTheme />
              </ToggleButton>
              <ToggleButton value="system" disabled={theme === "system"}>
                <Icons.DeviceTheme />
              </ToggleButton>
            </ToggleButtonGroup>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
