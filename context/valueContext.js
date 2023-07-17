import { createContext, useState } from "react";

export const ValueContext = createContext();

export const ValueContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    selectedTypeOfValue: "",
    name: "",
    typeOfValues: {
        "Efficiency/cost reduction":false,
        "Network optimisation":false,
        "Revenue growth":false,
        "Financial health of customers":false,
        "Increased innovation":false,
        "Reduced inequality":false,
        "all": false
    },
    favorites: [],
  });
  return (
    <ValueContext.Provider value={[user, setUser]}>
      {children}
    </ValueContext.Provider>
  );
};
