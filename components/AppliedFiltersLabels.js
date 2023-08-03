import { ValueContext } from "../context/valueContext";
import { useContext } from "react";

const AppliedFiltersLabels = () => {
  const [user, setUser] = useContext(ValueContext);
  const { selectedTypeOfValue, selectedRegion, typeOfValues, favorites, selectedBeneficiaryId } = user;

  const anySelection = //Check if any exist any selection from the user diffferent thant 'All'   
    Object.entries(typeOfValues).some(([key, value]) => key === 'All' ? false : value === true) ||
    Object.entries(selectedRegion).some(([key, value]) => key === 'All' ? false : value === true) ||
    Object.entries(selectedBeneficiaryId).some(([key, value]) => key === 'All' ? false : value.isSelected === true);

    const deleteFilter = (stateName, valueKey) => {
      setUser(prev => ({...prev, [stateName]: {...prev[stateName], [valueKey]: !prev[stateName][valueKey] }}))
    }
    return (
    <>
    {anySelection && (
        <div className="grid grid-rows-auto lg:grid-cols-5 px-10 mb-10 gap-x-3 md:gap-5">
      {Object.entries(typeOfValues).filter(([key, value]) => key === 'All' ? false : value === true).map(array => (
        <div className="bg-orange py-1 px-3 flex justify-between items-center gap-3 lg:gap-5 rounded-r-2xl rounded-l text-white" onClick={() => deleteFilter('typeOfValues',array[0])}>
            {array[0]}
            <span className="uppercase">X</span>
        </div>
      ))}
      {Object.entries(selectedRegion).filter(([key, value]) => key === 'All' ? false : value === true).map(array => (
        <div className="bg-pink-400 py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-r-2xl rounded-l" onClick={() => deleteFilter('selectedRegion',array[0])}>
            {array[0]}
            <span className="uppercase">X</span>
        </div>
      ))}
      {Object.entries(selectedBeneficiaryId).filter(([key, value]) => key === 'All' ? false : value.isSelected === true).map(array => (
        <div className="bg-yellow py-1 px-3 flex justify-between gap-3 lg:gap-5 rounded-r-2xl rounded-l" onClick={() => 
          //Different deletion process than other because state is different structure  
          setUser(prev => ({...prev, selectedBeneficiaryId: {...prev['selectedBeneficiaryId'], [array[0]]: !prev['selectedBeneficiaryId'][array[0]] }}))
        }>
            {array[0]}
            <span className="uppercase">X</span>
        </div>
      ))}
    </div>
    )}
    </>
    
  );
};

export default AppliedFiltersLabels;
