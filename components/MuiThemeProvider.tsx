import { useTheme } from "next-themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import darkTheme from "../lib/ui/themes/darkTheme";
import lightTheme from "../lib/ui/themes/lightTheme";

const MUIThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    resolvedTheme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
