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
      default: "secondary.main",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "primary.main",
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       "&:hover": {
    //         backgroundColor: "#404040",
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
