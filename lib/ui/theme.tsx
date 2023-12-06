import { createTheme } from "@mui/material";

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

    background: {
      default: "#fafafa",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
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
  },
});

export default theme;
