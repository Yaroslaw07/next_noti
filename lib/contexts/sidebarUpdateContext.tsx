import React, { ReactNode, createContext, useState } from "react";
import { useSidebarUpdate } from "../hooks/useSidebarUpdate";

interface SidebarUpdateContextType {
  toUpdate: boolean;
  setToUpdate: (value: boolean) => void;
}

export const SidebarUpdateContext = createContext<
  SidebarUpdateContextType | undefined
>(undefined);

interface ChildrenProps {
  children: ReactNode
}

export const SidebarUpdateProvider: React.FC<ChildrenProps> = ({children}) => {

  const [toUpdate, setToUpdate] = useState(true);

  const contextValue:SidebarUpdateContextType  = {
    toUpdate,
    setToUpdate
  }

  return (
    <SidebarUpdateContext.Provider value={contextValue}>
      {children}
    </SidebarUpdateContext.Provider>
  );
};
