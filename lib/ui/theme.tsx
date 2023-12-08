import { createTheme } from "@mui/material";
import {
  PaletteColor,
  Palette as defaultPalette,
} from "@mui/material/styles/createPalette";

interface CustomColors {
  additional?: PaletteColor;
}

declare module "@mui/material/styles" {
  interface Palette extends CustomColors {}
  interface PaletteOptions extends CustomColors {}
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#262626", //black
      dark: "#404040",
    },
    secondary: {
      main: "#fafafa", // white
      dark: "#e4e4e7",
    },
    additional: {
      dark: "#262626",
      contrastText: "#fafafa",
      main: "#ededed",
      light: "#f2f2f2",
    },

    text: {
      primary: "#262626",
    },
    background: {
      default: "#fafafa",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "primary.main",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#fafafa",
          color: "#262626",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          border: "2px solid",
          borderColor: "primary.main",
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
