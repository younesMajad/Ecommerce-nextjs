"use client";

import React, { createContext, useState, useCallback } from "react";

interface User {
  id?: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

interface AppContextParams {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextParams | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const value = { user, setUser };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextParams => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
