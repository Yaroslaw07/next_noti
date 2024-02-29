import {
  AppBar,
  Menu,
  MenuItem,
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
import { useState } from "react";
import { useCurrentNote } from "@/features/notes/hooks/useCurrentNote";

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
    fontSize: "38px",
    marginTop: "-8px",
    borderRadius: "8px",
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.primary.dark,
      background: theme.palette.additional?.dark,
    },
  };
};

const Header = () => {
  const {
    currentNoteId,
    currentNoteTitle,
    currentNotePinned,
    setCurrentNotePinned,
  } = useCurrentNote();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const themeConfig = getCurrentTheme(resolvedTheme);

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

  return (
    <AppBar component="nav" position="static" sx={{ height: "40px" }}>
      <Toolbar sx={getToolbarSx(themeConfig)}>
        <Typography
          variant="subtitle1"
          sx={{ paddingTop: "0px", fontSize: "1.15rem", fontWeight: "500" }}
        >
          {currentNoteId === null && "No note open"}
          {currentNoteId !== null && currentNoteTitle == ""
            ? "Untitled"
            : currentNoteTitle}
        </Typography>

        <Stack direction={"row"} gap={"12px"} alignItems={"center"}>
          {currentNotePinned && (
            <Icons.Pinned
              sx={{
                ...getHeaderIconSx(themeConfig),
                fontSize: "28px",
              }}
              onClick={() => setCurrentNotePinned(false)}
            />
          )}
          {!currentNotePinned && (
            <Icons.ToPin
              sx={{ ...getHeaderIconSx(themeConfig), fontSize: "28px" }}
              onClick={() => setCurrentNotePinned(true)}
            />
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
                backgroundColor: "inherit",
              },
            }}
            disableRipple
          >
            <ToggleButtonGroup
              value={theme}
              exclusive
              onChange={handleThemeChange}
            >
              <ToggleButton value="light">
                <Icons.LightTheme />
              </ToggleButton>
              <ToggleButton value="dark">
                <Icons.DarkTheme />
              </ToggleButton>
              <ToggleButton value="system">
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
