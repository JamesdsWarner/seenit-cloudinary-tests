import React, { createContext, useState } from "react";
export const GlobalContext = createContext();
// export default GlobalContext;

export const GlobalProvider = ({ children }) => {
  const [kenBurnsFiles, setKenBurnsFiles] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        kenBurnsFiles,
        setKenBurnsFiles,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
