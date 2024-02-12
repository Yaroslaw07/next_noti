import { create } from "zustand";
import lightTheme from "../ui/lightTheme";
import darkTheme from "../ui/darkTheme";
import { Theme } from "@mui/material";

type currentThemeType = "light" | "dark";

interface ThemeStore {
  currentTheme: currentThemeType;

  getCurrentTheme: () => Theme;
  toggleCurrentTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  currentTheme: "light",

  getCurrentTheme: () => {
    return get().currentTheme == "light" ? lightTheme : darkTheme;
  },

  toggleCurrentTheme: () => {
    const newTheme = get().currentTheme === "light" ? "dark" : "light";
    set({ currentTheme: newTheme });
  },
}));

export default useThemeStore;
