import { PaletteColor } from "@mui/material";

interface CustomColors {
  additional?: PaletteColor;
}

declare module "@mui/material/styles" {
  interface Palette extends CustomColors {}
  interface PaletteOptions extends CustomColors {}
}
