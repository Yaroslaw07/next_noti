import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#dedede",
      dark: "#e4e4e7",
    },
    secondary: {
      main: "#212121",
      dark: "#494949",
    },
    additional: {
      dark: "#303030",
      contrastText: "#2b2b2b",
      main: "#1e1e1e",
      light: "#141414",
    },

    text: {
      primary: "#dedede",
      secondary: "#d1d1d1",
    },
    background: {
      default: "#161616",
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
            width: "40px", // width of the scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "40px", // roundness of the thumb
            backgroundColor: "#888", // color of the thumb
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          background: "#161616",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          border: "1px solid",
          borderColor: "#fafafa",
          fontSize: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: "4px",
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #2d2a2a inset",
              WebkitTextFillColor: "#ededed",
            },
          },
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
