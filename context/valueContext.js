import { createContext, useState } from "react";

export const ValueContext = createContext();

export const ValueContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    selectedTypeOfValue: "",
    typeOfValues: {
      All: { isSelected: false },
    },
    selectedRegion: {
      All: false,
      // 'APAC': false,
      // "Eastern Europe & Russia": false,
      // 'Africa': false,
      // 'Europe': false,
      // "Latin America": false,
      // "Middle East": false,
      // "Eastern Europe & Russia": false,
      // "North America": false,
    },
    selectedBeneficiaryId: {
      //This will fill with key: Objects to store id and selection
      // Eg. {id: '', isSelected: false}
      // 'All' key does not have id
      All: { isSelected: false },
    },
    favorites: [],
    visited: [
      "itr1W8N30Te735Odc/recSu7iY8CRN3FPk7",
      "itr1W8N30Te735Odc/reczMBhNnVV7CXF0c",
      null,
    ],
  });

  const setTypeOfValue = (key) => {
    setUser((prev) => ({
      ...prev,
      typeOfValues: {
        ...prev.typeOfValues,
        [key]: {
          ...user.typeOfValues[key],
          isSelected: !user.typeOfValues[key].isSelected,
        },
      },
    }));
  };
  return (
    <ValueContext.Provider
      value={[user, setUser, setTypeOfValue, user.visited]}
    >
      {children}
    </ValueContext.Provider>
  );
};
