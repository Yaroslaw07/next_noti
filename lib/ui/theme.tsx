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
      main: "#3a3a3a", //black
      dark: "#474747",
    },
    secondary: {
      main: "#fafafa", // white
      dark: "#e4e4e7",
    },
    additional: {
      dark: "#d6d6d6",
      contrastText: "#fafafa",
      main: "#ededed",
      light: "#fafafa",
    },

    text: {
      primary: "#262626",
      secondary: "#515151",
    },
    background: {
      default: "#fafafa",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "Poppins, Space Grotesk, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#262626",
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
          textTransform: "capitalize",
          border: "1px solid",
          borderColor: "#262626",
          fontSize: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: "4px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: "30px",
          fontSize: "1.1rem",
          display: "flex",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.1rem",
        },
      },
    },
  },
});

export default theme;
