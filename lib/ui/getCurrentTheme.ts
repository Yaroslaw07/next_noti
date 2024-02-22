import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";

export const getCurrentTheme = (theme: string | undefined) => {
  if (theme === "light") {
    return lightTheme;
  }
  return darkTheme;
};
