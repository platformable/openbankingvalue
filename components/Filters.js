import { ValueContext } from "../context/valueContext";
import { useContext, useEffect, useState } from "react";

export default function Filters  ({
    setFilteredData,
    data,
    handleBeneficiary,
    whoBenefits,
  }) {
    const [user, setUser] = useContext(ValueContext);
    const { selectedTypeOfValue, typeOfValues, selectedRegion, selectedBeneficiaryId } = user;

    const [openRegionList, setRegionList] = useState(true);
    const [openValuesList, setValuesList] = useState(true);
    const [openBeneficiaryList, setBeneficiaryList] = useState(true);


    const arrayOfFIlters = [
      // Filter for each value of fields array (fields.[])
      // Return always true if typeOfValues === true, Return existence of the typeOfValues == true in Cluster Category
      (item) => {
        if (typeOfValues["All"] === true) return true;
        return Object.entries(typeOfValues)
          ?.filter(([key, value]) => value)
          .every(([key, value]) =>
            item.fields["Cluster Category"]?.includes(key)
          );
      },
  
      // Filter for each value of fields array (fields.[])
      // Return always true if selectedRegion === true, Return existence of the selectedRegion == true in Region (From country)
      (item) => {
        if (selectedRegion["All"] === true) return true;
        return Object.entries(selectedRegion)
          ?.filter(([key, value]) => value)
          .every(([key, value]) =>
            item.fields["Region (from Country)"]?.includes(key)
          );
      },

      // Filter for each value of fields array (fields.[])
      // Return always true if beneficaryId === true, Return existence of the typeOfValues == true in Region (From country)
      (item) => {
        if (selectedBeneficiaryId["All"] === true) return true;
        return Object.entries(selectedBeneficiaryId)
          ?.filter(([key, value]) => value)
          .every(([key, value]) =>
            item.fields["Who benefits?"]?.includes(key)
          );
      },
  
      // (item) => beneficiaryId.map(type=> item. fields["Who benefits?"]?.includes(type)),
  
      // (item) => beneficiaryId !== 'All' ? item.fields["Who benefits?"]?.includes(beneficiaryId) : true ,
    ];
    const filterResults = (arr, populatedData) => {
      if (arr.length < 1) return;
  
      const [firstFilter, ...rest] = arr;
  
      const newData = populatedData?.filter((r) => firstFilter(r));
  
      setFilteredData(newData);
  
      return filterResults([...rest], newData);
    };
  
  
    useEffect(() => {
      // Repopulate from Server records to avoid empty data
      filterResults(arrayOfFIlters, data?.records);
    }, [selectedTypeOfValue, data, typeOfValues, selectedRegion, whoBenefits]);


    return (
      <div className="sticky flex flex-col mx-3 lg:mx-5 pl-7 gap-4 grid-cols-1 py-10">
        <div id="values-list" className="md:my-5 mt-5 bank-form-list  md:px-0 px-5">
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700 flex justify-between pr-5 items-center"
          >
            List of values
            <button
                type="button"
                className="relative   rounded-md  py-2 text-left cursor-default focus:outline-none sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                // onMouseLeave={() => setValuesList(!openValuesList)}
                onClick={() => setValuesList(prev => !prev)}
              >
                
                  <img src={openValuesList ? "/arrow-up.svg" : "/arrow-down.svg"} alt="more icon" width={23}/>
              </button>
          </label>
          <div className="mt-1 relative">
              
            {openValuesList && (
            <ul
              className=" z-10 mt-1 w-full  bg-green-100  rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={() => setValuesList(!openValuesList)}
            >
             
              {typeOfValues &&
                Object.entries(typeOfValues).map(([label, value], index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        // setUser({ ...user, selectedTypeOfValue: label });
                        setUser({
                          ...user,
                          typeOfValues: { ...typeOfValues, [label]: !value },
                        });
                      }}
                      className=" flex cursor-default hover:text-white select-none relative py-2 pl-3 pr-9 cursor-pointer li-bg-russian-violet-dark"
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                        type="checkbox"
                        name={label}
                        onChange={(e) => {
                          setUser({
                            ...user,
                            typeOfValues: { ...typeOfValues, [label]: !value },
                          });
                        }}
                        // defaultChecked={typeOfValues[label]}
                        checked={typeOfValues[label]}
                      />
                      <div className="flex items-center">
                        <span className="font-normal ml-3 block truncate ">
                          {label}
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
            )} 
          </div>
        </div>
  
        <div id="region-list" className="md:my-5 mt-5 bank-form-list md:px-0 px-5">
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700 flex justify-between pr-5 items-center"
          >
            List of regions
            <button
                type="button"
                className="relative   rounded-md  py-2 text-left cursor-default focus:outline-none  sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                // onMouseLeave={() => setValuesList(!openValuesList)}
                onClick={() => setRegionList(prev => !prev)}
              >
                
                  <img src={openRegionList ? "/arrow-up.svg" : "/arrow-down.svg"} alt="more icon" width={23}/>
              </button>
          </label>
          <div className="mt-1 relative">
            {/* <button
                type="button"
                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                onClick={handleRegionsList}
              >
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedRegion['all'] ? 'All Regions' : "Select Region"}
                  </span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button> */}
  
            {openRegionList && (
            <ul
              className=" z-10 mt-1 w-full   rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={(prev) => setSelectedRegion(!prev)}
            >
              
              {Object.keys(selectedRegion).map((regionKey, index) => {
                return (
                  <li
                    key={index}
                    onClick={() =>
                      setUser((prev) => ({
                        ...prev,
                        selectedRegion: {
                          ...prev.selectedRegion,
                          [regionKey]: !prev.selectedRegion[regionKey],
                        }
                      }))
                    }
                    className="text-gray-900 li-bg-russian-violet-dark flex cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                    id="listbox-option-0"
                    role="option"
                  >
                    <input
                      type="checkbox"
                      // defaultChecked={selectedRegion[regionKey]}
                      checked={selectedRegion[regionKey]}
                      onClick={() =>
                        setUser((prev) => ({
                          ...prev,
                          selectedRegion: {
                            ...prev.selectedRegion,
                            [regionKey]: !prev.selectedRegion[regionKey],
                          }
                        }))
                      }
                    />
                    <div className="flex items-center">
                      <span className="font-normal ml-3 block truncate">
                        {regionKey}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            )} 
          </div>
        </div>
  
        <div id="beneficiary-list" className="md:my-5 values-form-list md:px-0 px-5">
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700 flex justify-between pr-5 items-center"
          >
            Who Benefits?
            <button
                type="button"
                className="relative   rounded-md  py-2 text-left cursor-default focus:outline-none  sm:text-sm"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                // onMouseLeave={() => setValuesList(!openValuesList)}
                onClick={() => setBeneficiaryList(prev => !prev)}
              >
                
                  <img src={openBeneficiaryList ? "/arrow-up.svg" : "/arrow-down.svg"} alt="more icon" width={23}/>
              </button>
          </label>
          <div className="mt-1 relative">
            {/* <button
              type="button"
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              onClick={() => setBeneficiaryList((prev) => !prev)}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selectedBeneficiary
                    ? selectedBeneficiary
                    : "Select Beneficiary"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button> */}
  
            {openBeneficiaryList && (
            <ul
              className=" z-10 mt-1 w-full   rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={() => setBeneficiaryList((prev) => !prev)}
            >
              <li
                className="text-gray-900 li-bg-russian-violet-dark cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                id="listbox-option-0"
                role="option"
                onClick={() => handleBeneficiary("All")}
              >
                <div className="flex items-center">
                  <span className="font-normal ml-3 block truncate">All</span>
                </div>
              </li>
              {whoBenefits?.records?.length > 0 &&
                whoBenefits?.records?.map((beneficiary, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleBeneficiary(beneficiary)}
                      className="text-gray-900 li-bg-russian-violet-dark cursor-default flex select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                            type="checkbox"
                            // defaultChecked={selectedRegion[]}
                            checked={selectedRegion["All"]}
                          />
  
                      <div className="flex items-center">
                        <span className="font-normal ml-3 block truncate">
                          {beneficiary.fields.Name}
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
            )}  
          </div>
        </div>
        {/* end of benefits */}
      </div>
    );
  };