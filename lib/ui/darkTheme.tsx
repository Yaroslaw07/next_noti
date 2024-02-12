import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#3a3a3a",
      dark: "#474747",
    },
    secondary: {
      main: "#fafafa",
      dark: "#e4e4e7",
    },
    additional: {
      dark: "#e5e5e5",
      contrastText: "#fafafa",
      main: "#f4f4f4",
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
      styleOverrides: {
        "::selection": {
          backgroundColor: "#3a3a3a",
          color: "#fafafa",
          BorderAllRounded: "8px",
        },
        "::-moz-selection": {
          backgroundColor: "#3a3a3a",
          color: "#fafafa",
          borderRadius: "8px",
        },
      },
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

export default darkTheme;
