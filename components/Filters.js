import { ValueContext } from "../context/valueContext";
import { useContext, useEffect, useState } from "react";
export default function Filters({ setFilteredData, data, valueCat }) {
  const [user, setUser, setTypeOfValue] = useContext(ValueContext);
  const {
    selectedTypeOfValue,
    typeOfValues,
    selectedRegion,
    selectedBeneficiaryId,
    checkOffset,
  } = user;

  const [nav, setNav] = useState(null);
  useEffect(() => setNav(navigator), []);
  // console.log(nav)
  const [openRegionList, setRegionList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [openBeneficiaryList, setBeneficiaryList] = useState(false);
  const [valueCategories, setValueCategories] = useState([]);

  //Cluster Categories
  const [revenue, setRevenue] = useState(false);
  const [optimisation, setOptimisation] = useState(false);
  const [innovation, setInnovation] = useState(false);
  const [health, setHealth] = useState(false);
  const [inequality, setInequality] = useState(false);
  const [improvement, setImprovement] = useState(false);
  const [economic, setEconomic] = useState(false);
  const [efficiency, setEfficiency] = useState(false);

  const [clustersVisible, setClustersVisible] = useState(true);

  const [isChecked, setIsChecked] = useState(false);

  console.log(`hello`, valueCat);
  console.log(valueCategories);

  useEffect(() => {
    const newCategories = valueCat.map((value) => {
      return value.fields["Cluster Category"];
    });

    //new Set filters out the duplicate filtered categories .. so coool, I finally got to use it!
    const uniqueCategories = Array.from(new Set(newCategories));

    setValueCategories(uniqueCategories);
  }, [valueCat]);

  //here i created an empty object and filled it with the cluster category as a key which has an array that containts
  //all the value generation categories
  const groupedCategories = {};
  console.log(`groupedCategories`, groupedCategories);

  valueCat.forEach((item) => {
    const clusterCategory = item.fields["Cluster Category"];
    const valueGenerationCategory = item.fields["Value Generation Category"];

    if (!groupedCategories[clusterCategory]) {
      groupedCategories[clusterCategory] = [];
    }

    groupedCategories[clusterCategory].push(valueGenerationCategory);
  });

  const arrayOfFIlters = [
    // Filter for each value of fields array (fields.[])
    // Return always true if typeOfValues.All === true, Return boolean existence of the typeOfValues == true in Cluster Category
    (item) => {
      if (typeOfValues["All"]["isSelected"] === true) return true;
      return Object.values(typeOfValues)
        ?.filter((value) => value.isSelected === true)
        .every((value) => item.fields["Value Category"]?.includes(value.id));
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
    <div
      id="filter-container"
      className="lg:px-0 flex flex-col  lg:flex-col mx-3 lg:mx-5 gap-10 grid-cols-1 mt-5 py-10"
    >
      <div id="values-list" className="md:px-0 px-5">
        <label
          id="listbox-label"
          className="block text-sm font-medium text-gray-700 flex justify-between  items-center "
        >
          <strong className="text-lg">Value generated categories</strong>
          <button
            type="button"
            className=" hey relative rounded-md py-2 text-left cursor-pointer focus:outline-none sm:text-sm"
            // onMouseLeave={() => setValuesList(!openValuesList)}
            onClick={() => {
              // Add a statement to toggle the visibility of the "hello" div
              setClustersVisible((clustersVisible) => !clustersVisible);
            }}
          >
            <img
              src={openValuesList ? "/arrow-up.svg" : "/arrow-down.svg"}
              alt="more icon"
              width={23}
            />
          </button>
        </label>

        <div className={`mt-2  ${clustersVisible ? "hidden" : "block"}`}>
          {/* i took the keys and used Object keys to turn them into an array so as to map through them */}
          {Object.keys(groupedCategories).map((clusterCategory, index) => (
            <div key={index} className="mt-7">
              <div className="flex justify-between items-center">
                <h3 className="text-fuchsia-500 font-semibold ">
                  {clusterCategory}
                </h3>
                <button
                  type="button"
                  className="relative rounded-md py-2 text-left cursor-default focus:outline-none sm:text-sm"
                  // onMouseLeave={() => setValuesList(!openValuesList)}
                  // onClick={() => setValuesList((prev) => !prev)}

                  onClick={() => {
                    if (clusterCategory === "Revenue growth") {
                      setRevenue(!revenue);
                    } else if (clusterCategory === "Network optimisation") {
                      setOptimisation(!optimisation);
                    } else if (
                      clusterCategory === "Financial health of customers"
                    ) {
                      setHealth(!health);
                    } else if (clusterCategory === "Reduced inequality") {
                      setInequality(!inequality);
                    } else if (clusterCategory === "Environment improvements") {
                      setImprovement(!improvement);
                    } else if (
                      clusterCategory === "Local economic development"
                    ) {
                      setEconomic(!economic);
                    } else if (
                      clusterCategory === "Efficiency/cost reduction"
                    ) {
                      setEfficiency(!efficiency);
                    } else if (clusterCategory === "Increased innovation") {
                      setInnovation(!innovation);
                    }
                  }}
                >
                  <img
                    src={
                      (clusterCategory === "Revenue growth" && revenue) ||
                      (clusterCategory === "Network optimisation" &&
                        optimisation) ||
                      (clusterCategory === "Increased innovation" &&
                        innovation) ||
                      (clusterCategory === "Financial health of customers" &&
                        health) ||
                      (clusterCategory === "Reduced inequality" &&
                        inequality) ||
                      (clusterCategory === "Environment improvements" &&
                        improvement) ||
                      (clusterCategory === "Local economic development" &&
                        economic) ||
                      (clusterCategory === "Efficiency/cost reduction" &&
                        efficiency)
                        ? "/arrow-up.svg"
                        : "/arrow-down.svg"
                    }
                    className="cursor-pointer"
                    alt="more icon"
                    width={23}
                  />
                </button>
              </div>
              <ul
                className={`
      ${
        (clusterCategory === "Revenue growth" && revenue) ||
        (clusterCategory === "Network optimisation" && optimisation) ||
        (clusterCategory === "Increased innovation" && innovation) ||
        (clusterCategory === "Financial health of customers" && health) ||
        (clusterCategory === "Reduced inequality" && inequality) ||
        (clusterCategory === "Environment improvements" && improvement) ||
        (clusterCategory === "Local economic development" && economic) ||
        (clusterCategory === "Efficiency/cost reduction" && efficiency)
          ? "block"
          : "hidden"
      } 
     
      mt-2 w-full rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 h-auto focus:outline-none sm:text-sm pl-2`}
                tabIndex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                {groupedCategories[clusterCategory].map(
                  (valueGenCategory, i) => (
                    <div className="flex cursor-pointer gap-3">
                      <input
                        type="checkbox"
                        className="orange-checkbox"
                        name={valueGenCategory}
                        onChange={() => {
                          setIsChecked(!isChecked); // Toggle the isChecked state
                          setTypeOfValue(valueGenCategory);
                        }}
                        role="option"
                      />
                      <li key={i} className="pt-2 pb-2">
                        {valueGenCategory}
                      </li>
                    </div>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        {/* <div className="mt-2 ">
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
                const newValueToFilter = typeOfValues[label];
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
                      <span className="font-normal ml-3  ">{label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div> */}
      </div>

      <div id="beneficiary-list" className=" values-form-list md:px-0 px-5">
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

      <div id="region-list" className=" md:px-0 px-5">
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
                      checked={selectedRegion[regionKey]}
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
                      <span className="font-normal ml-3 ">{regionKey}</span>
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
