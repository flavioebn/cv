import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  // local fallback state so components still work if provider is missing
  const [localOpen, setLocalOpen] = useState(false);
  if (!context) {
    return {
      isOpen: localOpen,
      toggleSidebar: () => {
        console.warn(
          "useSidebar: no SidebarProvider found — using local fallback"
        );
        setLocalOpen((v) => !v);
      },
    };
  }
  return context;
};
