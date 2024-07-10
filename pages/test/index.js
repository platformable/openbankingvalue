import React, { useState, useEffect, useContext, useMemo,  } from "react";
import Layout from  '../../components/Layout'



import { getValuesGenerated } from "../api/nocodb";
import { getValuesTaxonomy } from "../api/nocodb-value-taxonomy";
import { getStakeholders } from "../api/nocodb-stakeholders";
import ToolsResults from "../../components/ToolsResults";
import AppliedFiltersLabels from "../../components/AppliedFiltersLabels";

const initialState = {
  values: [],
  regions: [],
  stakeholders: [],
}
const Test = ({ data, valueCategories, stakeholders, regions,  }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [valueRecords, setValueRecords] = useState(valueCategories);
  const [filters, setFilters] = useState(initialState);

  // console.log(valueCategories)

const setInitialStates = () => {
  setFilters(initialState)
};
useEffect(() => {
  setInitialStates();
  // setValueRecords(valueCategories)
  
}, []);
console.log("filtered data res",filteredData)
  return (
    <Layout>
      
      <section className="sm:grid sm:grid-rows-1 lg:grid lg:grid-cols-[1fr_3fr] container mx-auto mt-5">
      <Filters
          data={data}
          setFilteredData={setFilteredData}
          valueRecords={valueRecords}
          stakeholders={stakeholders}
          regions={regions}
          filters={filters}
          setFilters={setFilters}
        />
        
        {filteredData && (
          <div className="flex flex-col">
            <section className="pagination flex flex-col ">
            <div className=" flex md:justify-between px-10 items-center justify-between ">
              <p className=" text-2xl">
                Showing <strong>{filteredData?.length}</strong> success stories{" "}
                {/* <strong>of 170</strong> */}
              </p>
              {/* <div className={`flex flex-1 justify-end p-3 pr-0 gap-x-2`}>
                {visitedPages.map((offsetID, index) => (
                  <button
                    className={`${
                      visitedPages.indexOf(router?.query?.clientOffset || "") ===
                      index
                        ? "bg-[#9978F0]"
                        : "bg-[var(--purple-medium)]"
                    }  btn w-10 py-2 rounded text-white`}
                    onClick={() => handleNextPage(offsetID)}
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}
              </div> */}
            </div>
            <AppliedFiltersLabels setInitialStates={setInitialStates} filters={filters} 
              />
        </section>
            <ToolsResults
              // typeOfValues={typeOfValues}
              content={filteredData}
              // selectedRegion={selectedRegion}
              // setInitialStates={setInitialStates}
            />
          </div>
        )}
      </section>
      <div className="footer-top-bar h-12"></div>
    </Layout>
  );
};

export default Test;

export async function getServerSideProps(context) {

  try {
    const dataResponse = await getValuesGenerated()
    const valuesTaxonomy = await getValuesTaxonomy()
    const stakeholders = await getStakeholders()
    const regions = await getRegions()



    return {
      props: {
        data: dataResponse.list,
        valueCategories: valuesTaxonomy.list,
        stakeholders : stakeholders.list,
        regions: regions.list
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { data: "No Data" } };
  }
}


import { useRouter } from "next/navigation";
import { getRegions } from "../api/nocodb-regions";
 
function Filters({ setFilteredData, data, valueRecords, filters, setFilters, stakeholders, regions }) {


  const router = useRouter()

  const [openRegionList, setRegionList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [openBeneficiaryList, setBeneficiaryList] = useState(false);
  const [clusterCategories, setClusterCategories] = useState([]);
  
  console.log('fitlters', filters)
  // console.log('filters', filters)

  const applyFilters = () => {
    // params.set('showDialog', 'yes');
    const params = new URLSearchParams()
    const createParamsString = () => {
      Object.entries(filters).map(([key, value]) => {
        if (value.length === 0) return;
        const filterStringQuery = value.join(",");
        params.set(key, filterStringQuery);
      });


      return params.toString();
    };
    const string = createParamsString()
    // console.log("String params", string) 
    // console.log("path", pathname) 
    
    // window.history.replaceState(null, '', `?${createParamsString()}`)
    // router.replace(`?${string}`, undefined,{ scroll: false });
    // let timeOutID = setTimeout(() => {
    //   params.delete('showDialog')
    //   router.push(`?${createParamsString()}`)
    // }, 1500)
    return string;
  };

  useEffect(() => {
   if (valueRecords.length > 0) {
    const uniqueClusterCategories = new Set();

    valueRecords?.forEach((value) => {

      uniqueClusterCategories.add(value["ClusterList"][0]) ;
    });

    //new Set filters out the duplicate filtered categories .. so coool, I finally got to use it!
    setClusterCategories(
      Object.assign(
        {},
        ...Array.from(uniqueClusterCategories).map((cluster) => ({ [cluster]: false }))
      )
    );
   }
  }, [valueRecords]);

  //here i created an empty object and filled it with the cluster category as a key which has an array that containts
  //all the value generation categories
  const groupedCategories = {};

  valueRecords.forEach((item) => {
    const clusterCategory = item["ClusterList"][0];
    const valueGenerationCategory = item["ValueGenerationCategory"];

    if (!groupedCategories[clusterCategory]) {
      groupedCategories[clusterCategory] = [];
    }

    groupedCategories[clusterCategory].push(valueGenerationCategory);
  });
  useEffect(() => {
      // Repopulate from Server records to avoid empty data
    const queryParams = applyFilters()
    // console.log("filter query params result",queryParams)

    // if (queryParams) are now present is ok, we are doing the verification on api routes

     fetch('/api/nocodb?' + queryParams).then(res => res.json()).then(data => setFilteredData(data))

    
    }, [
      // selectedTypeOfValue,
      data,
      filters
    ]);
  // const arrayOfFIlters = [
  
  //   (item) => {
  //     if (Object.values(typeOfValues).every(value => value.isSelected === false)) return true;
  //     return Object.values(typeOfValues)
  //       ?.filter((value) => value.isSelected === true)
  //       .some((value) => item?.["Value Category"]?.includes(value.id));
  //   },

    
  //   (item) => {
  //     if (Object.values(selectedRegion).every(value => value === false)) return true;
  //     return Object.entries(selectedRegion)
  //       ?.filter(([key, value]) => value === true)
  //       .some(([key, value]) =>
  //         item?.["Region (from Country)"]?.includes(key)
  //       );
  //   },
   
  //   (item) => {
  //     if (Object.values(selectedBeneficiaryId).every(value => value.isSelected === false)) return true;
  //     return Object.values(selectedBeneficiaryId)
  //       ?.filter((value) => value.isSelected === true)
  //       .some((value) => item?.["Who benefits?"]?.includes(value.id));
  //   },
  // ];

  //Recursive function
  // const filterResults = (arr, populatedData) => {
  //   if (arr?.length < 1) return;

  //   const [firstFilter, ...rest] = arr;

  //   const newData = populatedData?.filter((row) => firstFilter(row));

  //   setFilteredData(newData);

  //   return filterResults([...rest], newData);
  // };

  // useEffect(() => {
  //   // Repopulate from Server records to avoid empty data
  //   filterResults(arrayOfFIlters, data);
  // }, [
  //   // selectedTypeOfValue,
  //   data,
  //   typeOfValues,
  //   selectedRegion,
  //   selectedBeneficiaryId,
  // ]);
// console.log(groupedCategories)
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
                <div className="flex justify-start items-center gap-2  px-3 py-3">
                  <input type="checkbox" name="cluster-option"  
                  checked={values.every(val => filters.values?.includes(val))}
                  onChange={(e) => {
                        // console.log(values)
                        // setTypeOfValueAll(clusterCategories)val
                        const set = new Set(filters.values)

                        filters?.values.includes(clusterCategory) ? set.delete(clusterCategory) : set.add(clusterCategory)
                        
                        values.forEach(val => {
                          !set.has(clusterCategory) ? set.delete(val) : set.add(val)
                        })


                        setFilters(prev => ({
                          ...prev,
                          values: [...Array.from(set)]
                        }))
                        // setFilters(prev => ({
                        //   ...prev,
                        //   values: [...prev.values, ...values]
                        // }))
                        // router.push({
                        //   pathname: "/",
                        //   query: { filter: clusterCategory } ,
                        // });
                      }} />
                  <h3 className=" font-semibold ">
                    {clusterCategory}
                  </h3>
                  <button
                    type="button"
                    className="relative rounded-md py-2 text-left cursor-default  sm:text-sm ml-auto"
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
      ${clusterCategories[clusterCategory] ? "grid" : "hidden"} py-5 bg-[#FFF7FF]  w-full  text-base  h-auto focus:outline-none sm:text-sm`}
                  tabIndex="-1"
                  role="listbox"
                  aria-labelledby="listbox-label"
                  aria-activedescendant="listbox-option-3"
                >
                  {groupedCategories[clusterCategory].map(
                    (valueGenCategory, i) => (
                      <li className="hover:bg-[#FEE6FF] flex cursor-pointer gap-3 py-3 px-3" 
                        onClick={() => {
                          // setTypeOfValue(valueGenCategory)
                          const set = new Set(filters.values)
                          
                          set.has(valueGenCategory) ? set.delete(valueGenCategory) : set.add(valueGenCategory)

                          setFilters(prev => ({
                            ...prev,
                            values: [...Array.from(set)]
                          }))
                          // applyFilters()

                        }}
                        key={i}
                      >
                        <input
                          type="checkbox"
                          className="pink-checkbox"
                          name={valueGenCategory}
                          // onChange={() => {
                          //   setTypeOfValue(valueGenCategory);
                          // }}
                          // checked={typeOfValues[valueGenCategory]?.isSelected}
                          checked={filters.values.includes(valueGenCategory)}

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
              className="w-full text-base h-auto sm:text-sm py-3"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={() => setBeneficiaryList((prev) => !prev)}
            >
              {stakeholders?.map(
                (stakeholderKey, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {

                        //Testing if we need to filter by the query params from nocodb api

                        // setUser((prev) => ({
                        //   ...prev,
                        //   selectedBeneficiaryId: {
                        //     ...prev.selectedBeneficiaryId,
                        //     [stakeholderKey.Segment]: {
                        //       ...beneficaryValue,
                        //       isSelected: !beneficaryValue.isSelected,
                        //     },
                        //   },
                        // }))

                        const newSetValues = new Set(filters.stakeholders)
                        if (newSetValues.has(stakeholderKey.Segment)) {

                          newSetValues.delete(stakeholderKey.Segment)
                          
                        } else {
                          newSetValues.add(stakeholderKey.Segment)
                        }
                       
                        setFilters(prev => ({
                          ...prev,
                          stakeholders: Array.from(newSetValues)
                        }))
                        // applyFilters()
                        // router.replace({
                        //   pathname: router.pathname,
                        //   query: { ...router.query, stakeholder: Array.from(newSetValues) },
                        // }, undefined,{ scroll: false });
                      }}
                      className="hover:bg-[var(--light-yellow)] flex items-center select-none  py-2 px-3 cursor-pointer "
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                        type="checkbox"
                        className="orange-checkbox"
                        // defaultChecked={beneficaryValue?.isSelected}
                        checked={filters.stakeholders.includes(stakeholderKey.Segment)}
                        // onChange={() =>
                        //   setUser((prev) => ({
                        //     ...prev,
                        //     selectedBeneficiaryId: {
                        //       ...prev.selectedBeneficiaryId,
                        //       [stakeholderKey.Segment]: {
                        //         ...beneficaryValue,
                        //         isSelected: !beneficaryValue.isSelected,
                        //       },
                        //     },
                        //   }))
                        // }
                      />
                      <div className="flex items-center">
                        <span className="font-normal ml-3 ">
                          {stakeholderKey.Segment}
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
              className="w-full text-base h-auto focus:outline-none sm:text-sm py-3"
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              // onMouseLeave={(prev) => setSelectedRegion(!prev)}
            >
              {regions?.map((regionKey, index) => {
                return (
                  <li
                    key={index}
                    onClick={() =>  {
                      // setUser((prev) => ({
                      //   ...prev,
                      //   selectedRegion: {
                      //     ...prev.selectedRegion,
                      //     [regionKey.Region]: !prev.selectedRegion[regionKey.Region],
                      //   },
                      // }))
                      const newSetValues = new Set(filters.regions)
                      if (newSetValues.has(regionKey.Region)) {

                        newSetValues.delete(regionKey.Region)
                        
                      } else {
                        newSetValues.add(regionKey.Region)
                      }
                     
                      setFilters(prev => ({
                        ...prev,
                        regions: Array.from(newSetValues)
                      }))
                    }
                    }
                    className=" hover:bg-[var(--light-purple)] flex items-center select-none py-2 px-3 cursor-pointer "
                    id="listbox-option-0"
                    // role="option"
                  >
                    <input
                      type="checkbox"
                      className="purple-checkbox"
                      checked={filters.regions.includes(regionKey.Region)}
                      
                    />
                    <div className="flex items-center">
                      <span className="font-normal ml-3 ">{regionKey.Region}</span>
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
