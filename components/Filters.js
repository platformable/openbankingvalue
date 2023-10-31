import { useRef } from "react";
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
  const [openRegionList, setRegionList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [openBeneficiaryList, setBeneficiaryList] = useState(false);
  const [clusterCategories, setClusterCategories] = useState([]);
  // const [ulrEncoded,setUrlEncoded] = useState()
  // useEffect(() => {
  //   var encode = "encodeURIComponent";
  //   encode = encodeURIComponent("{Region (from Country)}=UK".trim());
  //   console.log(encode)
  //   // const dispEl =  encode;
  // }, [])

  useEffect(() => {
    const newCategories = valueCat.map((value) => {
      return value.fields["Cluster Category"];
    });

    //new Set filters out the duplicate filtered categories .. so coool, I finally got to use it!
    const uniqueCategories = Array.from(new Set(newCategories));

    setClusterCategories(
      Object.assign(
        {},
        ...uniqueCategories.map((cluster) => ({ [cluster]: false }))
      )
    );
  }, [valueCat]);

  //here i created an empty object and filled it with the cluster category as a key which has an array that containts
  //all the value generation categories
  const groupedCategories = {};

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
      if (selectedRegion["All"] === true) return true;
      return Object.entries(selectedRegion)
        ?.filter(([key, value]) => value === true)
        .every(([key, value]) =>
          item.fields["Region (from Country)"]?.includes(key)
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
      className="lg:pr-0 flex flex-col  grid-cols-1 "
    >
      <div id="values-list" className="bg-[#FBC6FD]">
        <label
          id="listbox-label"
          className="block text-sm font-medium  flex justify-between md:px-3 py-3 items-center "
        >
          <strong className="text-lg">Value generated categories</strong>
          <button
            type="button"
            className=" hey relative rounded-md py-2 text-left cursor-pointer focus:outline-none sm:text-sm"
            onClick={() => setValuesList(!openValuesList)}
          >
            <img
              src={openValuesList ? "/arrow-up.svg" : "/arrow-down.svg"}
              alt="more icon"
              width={23}
            />
          </button>
        </label>

        <div className={` bg-[#FEE6FF] ${openValuesList ? "block" : "hidden"}`}>
          {/* i took the keys and used Object keys to turn them into an array so as to map through them */}
          {Object.entries(groupedCategories).map(
            ([clusterCategory, values], index) => (
              <div key={index} className="">
                <div className="flex justify-between items-center px-3 py-3">
                  <h3 className=" font-semibold ">
                    {clusterCategory}
                  </h3>
                  <button
                    type="button"
                    className="relative rounded-md py-2 text-left cursor-default  sm:text-sm"
                    onClick={() =>
                      setClusterCategories((prev) => ({
                        ...prev,
                        [clusterCategory]: !prev[clusterCategory],
                      }))
                    }
                  >
                    <img
                      src={
                        clusterCategories[clusterCategory]
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
      ${clusterCategories[clusterCategory] ? "grid" : "hidden"} py-5 md:pl-3 bg-[#FFF7FF]  w-full  text-base  h-auto focus:outline-none sm:text-sm`}
                  tabIndex="-1"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3"
                >
                  {groupedCategories[clusterCategory].map(
                    (valueGenCategory, i) => (
                      <li className="hover:bg-[#FEE6FF] flex cursor-pointer gap-3 py-3" 
                        onClick={() => setTypeOfValue(valueGenCategory)}
                        key={i}
                      >
                        <input
                          type="checkbox"
                          className="pink-checkbox"
                          name={valueGenCategory}
                          // onChange={() => {
                          //   setTypeOfValue(valueGenCategory);
                          // }}
                          checked={typeOfValues[valueGenCategory].isSelected}
                          role="option"
                        />
                        <div  className="">
                          {valueGenCategory}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )
          )}
        </div>
        
      </div>

      <div id="beneficiary-list" className="bg-[var(--light-yellow)]">
        <label
          id="listbox-label"
          className="block text-sm font-medium  flex justify-between md:px-3 py-3 items-center "
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
        <div className=" relative bg-[#FFFAE8]">
          {openBeneficiaryList && (
            <ul
              className="w-full text-base pl-3 h-auto sm:text-sm py-3"
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
                      className="hover:bg-[var(--light-yellow)] flex items-center select-none  py-2 pl-3 pr-9 cursor-pointer "
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                        type="checkbox"
                        className="orange-checkbox"
                        // defaultChecked={beneficaryValue?.isSelected}
                        checked={beneficaryValue?.isSelected}
                        // onChange={() =>
                        //   setUser((prev) => ({
                        //     ...prev,
                        //     selectedBeneficiaryId: {
                        //       ...prev.selectedBeneficiaryId,
                        //       [beneficiaryKey]: {
                        //         ...beneficaryValue,
                        //         isSelected: !beneficaryValue.isSelected,
                        //       },
                        //     },
                        //   }))
                        // }
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

      <div id="region-list" className="bg-[var(--light-purple)]">
        <label
          id="listbox-label"
          className="block text-sm font-medium  flex justify-between md:px-3 py-3 items-center "
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
        <div className="relative bg-[#F4F2FF]">
          {openRegionList && (
            <ul
              className="w-full text-base pl-3 h-auto focus:outline-none sm:text-sm py-3"
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
                    className=" hover:bg-[var(--light-purple)] flex items-center select-none py-2 pl-3 pr-9 cursor-pointer "
                    id="listbox-option-0"
                    // role="option"
                  >
                    <input
                      type="checkbox"
                      className="purple-checkbox"
                      checked={selectedRegion[regionKey] === true}
                      
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
