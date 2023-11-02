import { ValueContext } from "../context/valueContext";
import { useContext } from "react";
import style from "../styles/Tools.module.css";

const AppliedFiltersLabels = ({ setInitialStates }) => {
  const [user, setUser] = useContext(ValueContext);
  const {
    selectedTypeOfValue,
    selectedRegion,
    typeOfValues,
    favorites,
    selectedBeneficiaryId,
  } = user;

  const anySelection = //Check if any exist any selection from the user diffferent thant 'All'
    Object.entries(typeOfValues).some(([key, value]) =>
      key === "All" ? false : value.isSelected
    ) ||
    Object.entries(selectedRegion).some(([key, value]) =>
      key === "All" ? false : value
    ) ||
    Object.entries(selectedBeneficiaryId).some(([key, value]) =>
      key === "All" ? false : value.isSelected
    );

  const deleteFilter = (stateName, valueKey) => {
    setUser((prev) => ({
      ...prev,
      [stateName]: {
        ...prev[stateName],
        [valueKey]: !prev[stateName][valueKey],
      },
    }));
  };

 
  return (
    <>
      {anySelection && (
        <div className="hidden md:flex flex-wrap text-sm px-10 my-10 gap-x-3 md:gap-3">
          {/* Render "Clear All" label */}
          <div
            className={`bg-[var(--purple-medium)] py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-sm text-white`}
          >
            Clear All Filters
            <span
              className="uppercase cursor-pointer"
              onClick={setInitialStates}
            >
              X
            </span>
          </div>

          {Object.entries(typeOfValues)
            ?.filter(([key, value]) =>
              key === "All" ? false : value?.isSelected === true
            )
            .map(([key, value], index) => {
              // console.log("array ", array)
              return (
                <div
                  key={index}
                  className={`bg-[var(--light-pink)] text-black py-1 px-3 flex justify-between items-center gap-3 lg:gap-5 rounded-sm`}
                  onClick={() =>
                    setUser((prev) => ({
                      ...prev,
                      typeOfValues: {
                        ...prev["typeOfValues"],
                        [key]: {
                          ...value,
                          isSelected: !value.isSelected,
                        },
                      },
                    }))
                  }
                >
                  {key}
                  <span className="uppercase cursor-pointer">X</span>
                </div>
              );
            })}
          
          {Object.entries(selectedBeneficiaryId)
            ?.filter(([key, value]) =>
              key === "All" ? false : value?.isSelected === true
            )
            .map(([key, value], index) => (
              <div
                key={index}
                className={`bg-[var(--light-yellow)] text-black py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-sm`}
                onClick={() =>
                  //Different deletion process than other because state is different structure
                  setUser((prev) => ({
                    ...prev,
                    selectedBeneficiaryId: {
                      ...prev["selectedBeneficiaryId"],
                      [key]: !prev["selectedBeneficiaryId"][key],
                    },
                  }))
                }
              >
                {key}
                <span className="uppercase cursor-pointer">X</span>
              </div>
            ))}
            {Object.entries(selectedRegion)
            ?.filter(([key, value]) => (key === "All" ? false : value === true))
            .map((array, index) => (
              <div
                key={index}
                className={`bg-[var(--light-purple)] text-black py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-sm`}
                onClick={() => deleteFilter("selectedRegion", array[0])}
              >
                {array[0]}
                <span className="uppercase cursor-pointer">X</span>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default AppliedFiltersLabels;
