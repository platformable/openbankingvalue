import { createContext, useState } from "react";

export const ValueContext = createContext();

export const ValueContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    selectedTypeOfValue: "",
    name: "",
    typeOfValues: {
      "All": false,
        "Efficiency/cost reduction":false,
        "Network optimisation":false,
        "Revenue growth":false,
        "Financial health of customers":false,
        "Increased innovation":false,
        "Reduced inequality":false,
       
    },
    selectedRegion: {
      'All': false,
      'APAC': false,
      "Eastern Europe & Russia": false,
      'Africa': false,
      'Europe': false,
      "Latin America": false,
      "Middle East": false,
      "Eastern Europe & Russia": false,
      "North America": false,
    },
    selectedBeneficiaryId: {
      //This will fill with key: Objects to store id and selection
      // Eg. {id: '', isSelected: false}
      // 'All' key does not have id
      All: {isSelected: false},
    },
    favorites: [],
  });
  return (
    <ValueContext.Provider value={[user, setUser]}>
      {children}
    </ValueContext.Provider>
  );
};
