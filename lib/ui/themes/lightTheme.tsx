import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3a3a3a",
      dark: "#474747",
    },
    secondary: {
      main: "#fafafa",
      dark: "#e4e4e7",
    },
    additional: {
      dark: "#e2e2e2",
      contrastText: "#fafafa",
      main: "#efefef",
      light: "#f7f7f7",
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
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar": {
            width: "8px", // width of the scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "8px", // roundness of the thumb
            backgroundColor: "#e2e2e2", // color of the thumb
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          background: "#fafafa",
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
          justifyContent: "center",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.05rem",
        },
      },
    },
  },
});

export default lightTheme;
