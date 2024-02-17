import { PaletteColor } from "@mui/material";

export type AllowedTheme = NonNullable<PaletteOptions["mode"]>;

export const DEFAULT_THEME: AllowedTheme = "light";

interface CustomColors {
  additional?: PaletteColor;
}

declare module "@mui/material/styles" {
  interface Palette extends CustomColors {}
  interface PaletteOptions extends CustomColors {}
}
