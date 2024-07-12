import { ValueContext } from "../context/valueContext";
import { useContext } from "react";
import style from "../styles/Tools.module.css";

const AppliedFiltersLabels = ({ setInitialStates, filters, setFilters }) => {
  const [user, setUser] = useContext(ValueContext);
  const {
    selectedTypeOfValue,
    selectedRegion,
    typeOfValues,
    favorites,
    selectedBeneficiaryId,
  } = user;
  const {values, stakeholders, regions} = filters
  // const anySelection = //Check if any exist any selection from the user diffferent thant 'All'
  //   Object.entries(typeOfValues).some(([key, value]) =>
  //     key === "All" ? false : value.isSelected
  //   ) ||
  //   Object.entries(selectedRegion).some(([key, value]) =>
  //     key === "All" ? false : value
  //   ) ||
  //   Object.entries(selectedBeneficiaryId).some(([key, value]) =>
  //     key === "All" ? false : value.isSelected
  //   );
  const anySelection = //Check if any exist any selection from the user diffferent thant 'All'
    values.length > 0 || stakeholders.length > 0 || regions.length > 0
    ;

  const deleteFilter = (filterName, filterValue) => {
    const set = new Set(filters?.[filterName])
                          
    set.has(filterValue) ? set.delete(filterValue) : set.add(filterValue)

    setFilters(prev => ({
      ...prev,
      [filterName]: [...Array.from(set)]
    }))

  };

 
  return (
    <>
      {anySelection && (
        <div className="hidden md:flex flex-wrap text-sm my-10 gap-x-3 md:gap-3">
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

          {
          // Object.entries(typeOfValues)
          //   ?.filter(([key, value]) =>
          //     key === "All" ? false : value?.isSelected === true
          //   )

            values.map((value, index) => {
              // console.log("array ", array)
              return (
                <div
                  key={index}
                  className={`bg-[var(--light-pink)] text-black py-1 px-3 flex justify-between items-center gap-3 lg:gap-5 rounded-sm`}
                  onClick={() => deleteFilter('values', value)}
                >
                  {value}
                  <span className="uppercase cursor-pointer">X</span>
                </div>
              );
            })}
          
          {
          // Object.entries(selectedBeneficiaryId)
          //   ?.filter(([key, value]) =>
          //     key === "All" ? false : value?.isSelected === true
          //   )
            stakeholders.map((stakeholder, index) => (
              <div
                key={index}
                className={`bg-[var(--light-yellow)] text-black py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-sm`}
                onClick={() => deleteFilter('stakeholders', stakeholder)}
              >
                {stakeholder}
                <span className="uppercase cursor-pointer">X</span>
              </div>
            ))}
            {
            // Object.entries(selectedRegion)
            // ?.filter(([key, value]) => (key === "All" ? false : value === true))
            regions.map((region, index) => (
              <div
                key={index}
                className={`bg-[var(--light-purple)] text-black py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-sm`}
                onClick={() => deleteFilter('regions', region)}

              >
                {region}
                <span className="uppercase cursor-pointer">X</span>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default AppliedFiltersLabels;
