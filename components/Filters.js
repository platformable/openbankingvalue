import { ValueContext } from "../context/valueContext";
import { useContext, useEffect, useState } from "react";
export default function Filters({ setFilteredData, data }) {
  const [user, setUser, setTypeOfValue] = useContext(ValueContext);
  const {
    selectedTypeOfValue,
    typeOfValues,
    selectedRegion,
    selectedBeneficiaryId,
    
  } = user;
  const [nav, setNav] = useState(null)
  useEffect(() => setNav(navigator), [])
  // console.log(nav)
  const [openRegionList, setRegionList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [openBeneficiaryList, setBeneficiaryList] = useState(false);

  const arrayOfFIlters = [
    // Filter for each value of fields array (fields.[])
    // Return always true if typeOfValues.All === true, Return boolean existence of the typeOfValues == true in Cluster Category
    (item) => {
      if (typeOfValues["All"]["isSelected"] === true) return true;
      return Object.values(typeOfValues)
        ?.filter((value) => value.isSelected === true)
        .every((value) =>
          item.fields["Value Category"]?.includes(value.id)
        );
    },

    // Filter for each value of fields array (fields.[])
    // Return always true if selectedRegion.All === true, Return boolean existence of the selectedRegion == true in Region (From country)
    (item) => {
      if (selectedRegion["All"]["isSelected"] === true) return true;
      return Object.entries(selectedRegion)
        ?.filter(([key, value]) => value.isSelected === true)
        .every((value) =>
          // item.fields["Region (from Country)"]?.includes(key)
          console.log(value)
        );
    },

    // Filter for each value of fields array (fields.[])
    // Return always true if beneficaryId.All.isSelected === true, Return boolean existence of the selectedBeneficiaryId[beneficiary.id] == true in Who Benefitas?
    (item) => {
      if (selectedBeneficiaryId["All"]["isSelected"] === true) return true;
      return Object.values(selectedBeneficiaryId)
        ?.filter((value) => value.isSelected === true)
        .every((value) => item.fields["Who benefits?"]?.includes(value.id));
    },
  ];
  //Recursive function
  const filterResults = (arr, populatedData) => {
    if (arr?.length < 1) return;

    const [firstFilter, ...rest] = arr;

    const newData = populatedData?.filter((row) => firstFilter(row));

    setFilteredData(newData);

    return filterResults([...rest], newData);
  };

  useEffect(() => {
    // Repopulate from Server records to avoid empty data
    filterResults(arrayOfFIlters, data?.records);
  }, [
    // selectedTypeOfValue,
    data,
    typeOfValues,
    selectedRegion,
    selectedBeneficiaryId,
  ]);

  return (
    <div id="filter-container" className="lg:px-0 flex flex-col  lg:flex-col mx-3 lg:mx-5 gap-10 grid-cols-1 mt-5 py-10">
      <div
        id="values-list"
        className="md:px-0 px-5"
      >
        <label
          id="listbox-label"
          className="block text-sm font-medium text-gray-700 flex justify-between  items-center "
        >
          <strong className="text-lg">Value generated categories</strong>
          <button
            type="button"
            className="relative rounded-md py-2 text-left cursor-default focus:outline-none sm:text-sm"
            
            // onMouseLeave={() => setValuesList(!openValuesList)}
            onClick={() => setValuesList((prev) => !prev)}
          >
            <img
              src={openValuesList ? "/arrow-up.svg" : "/arrow-down.svg"}
              alt="more icon"
              width={23}
            />
          </button>
        </label>
        <div className="mt-2 ">
          {openValuesList && (
            <ul
              className=" mt-2 w-full rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={() => setValuesList(!openValuesList)}
            >
              
                {Object.entries(typeOfValues).map(([label, value], index) => {
                  const newValueToFilter = typeOfValues[label]
                  return (
                    <li
                      key={index}
                      onClick={() => setTypeOfValue(label)}
                      className="flex items-center py-2 pl-3 pr-9 cursor-pointer li-bg-russian-violet-dark"
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                        type="checkbox"
                        className="orange-checkbox"
                        name={label}
                        onChange={() => setTypeOfValue(label)}
                        // defaultChecked={value.isSelected}
                        // readOnly
                        checked={value.isSelected}
                      />
                      <div className="flex items-center">
                        <span className="font-normal ml-3  ">
                          {label}
                        </span>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </div>
      </div>

      <div
        id="beneficiary-list"
        className=" values-form-list md:px-0 px-5"
      >
        <label
          id="listbox-label"
          className="block text-sm font-medium text-gray-700 flex justify-between items-center"
        >
          <strong className="text-lg">Who Benefits?</strong>

          <button
            type="button"
            className="relative   rounded-md  py-2 text-left cursor-default focus:outline-none  sm:text-sm"
            
            // onMouseLeave={() => setValuesList(!openValuesList)}
            onClick={() => setBeneficiaryList((prev) => !prev)}
          >
            <img
              src={openBeneficiaryList ? "/arrow-up.svg" : "/arrow-down.svg"}
              alt="more icon"
              width={23}
            />
          </button>
        </label>
        <div className="mt-2 relative">
          

          {openBeneficiaryList && (
            <ul
              className="  mt-2 w-full   rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={() => setBeneficiaryList((prev) => !prev)}
            >
              {Object.entries(selectedBeneficiaryId)?.map(
                ([beneficiaryKey, beneficaryValue], index) => {
                  return (
                    <li
                      key={index}
                      onClick={() =>
                        setUser((prev) => ({
                          ...prev,
                          selectedBeneficiaryId: {
                            ...prev.selectedBeneficiaryId,
                            [beneficiaryKey]: {
                              ...beneficaryValue,
                              isSelected: !beneficaryValue.isSelected,
                            },
                          },
                        }))
                      }
                      className="text-gray-900 li-bg-russian-violet-dark flex items-center select-none  py-2 pl-3 pr-9 cursor-pointer "
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                        type="checkbox"
                        className="yellow-checkbox"
                        // defaultChecked={beneficaryValue?.isSelected}
                        checked={beneficaryValue?.isSelected}
                        onClick={() =>
                          setUser((prev) => ({
                            ...prev,
                            selectedBeneficiaryId: {
                              ...prev.selectedBeneficiaryId,
                              [beneficiaryKey]: {
                                ...beneficaryValue,
                                isSelected: !beneficaryValue.isSelected,
                              },
                            },
                          }))
                        }
                      />
                      <div className="flex items-center">
                        <span className="font-normal ml-3 ">
                          {beneficiaryKey}
                        </span>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </div>
      </div>

      <div
        id="region-list"
        className=" md:px-0 px-5"
      >
        <label
          id="listbox-label"
          className="block text-sm font-medium text-gray-700 flex justify-between items-center"
        >
          <strong className="text-lg">List of regions</strong>

          <button
            type="button"
            className="relative   rounded-md  py-2 text-left cursor-default focus:outline-none  sm:text-sm"
            
            // onMouseLeave={() => setValuesList(!openValuesList)}
            onClick={() => setRegionList((prev) => !prev)}
          >
            <img
              src={openRegionList ? "/arrow-up.svg" : "/arrow-down.svg"}
              alt="more icon"
              width={23}
            />
          </button>
        </label>
        <div className="mt-2 relative">
          

          {openRegionList && (
            <ul
              className="  mt-2 w-full   rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm"
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
                        },
                      }))
                    }
                    className="text-gray-900 li-bg-russian-violet-dark flex items-center select-none py-2 pl-3 pr-9 cursor-pointer "
                    id="listbox-option-0"
                    role="option"
                  >
                    <input
                      type="checkbox"
                      className="pink-checkbox"
                      // checked={selectedRegion}
                      // checked={selectedRegion[regionKey]}
                      onClick={() =>
                        setUser((prev) => ({
                          ...prev,
                          selectedRegion: {
                            ...prev.selectedRegion,
                            [regionKey]: !prev.selectedRegion[regionKey],
                          },
                        }))
                      }
                    />
                    <div className="flex items-center">
                      <span className="font-normal ml-3 ">
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

      
      {/* end of benefits */}
    </div>
  );
}
