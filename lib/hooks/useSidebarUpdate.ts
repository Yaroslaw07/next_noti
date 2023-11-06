import { useContext, useState } from "react";
import { SidebarUpdateContext } from "../contexts/sidebarUpdateContext";

export const useSidebarUpdate = () => {
  const context = useContext(SidebarUpdateContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
