import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <GlobalContext.Provider value={{ selectedIds, setSelectedIds }}>
      {children}
    </GlobalContext.Provider>
  );
}
