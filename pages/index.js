import React, { useState, useEffect, useContext, useMemo,  } from "react";
import Layout from  '../components/Layout'
import Hero from "../components/Hero";
import Meta from "../components/Meta";
import { getRegions } from "./api/nocodb-regions";
import { getValuesGenerated } from "./api/nocodb";
import { getValuesTaxonomy } from "./api/nocodb-value-taxonomy";
import { getStakeholders } from "./api/nocodb-stakeholders";
import ToolsResults from ".././components/ToolsResults";
import AppliedFiltersLabels from "../components/AppliedFiltersLabels";
import Loader from "../components/Loader";
import PaginationButtons from "../components/PaginationButtons";

const initialState = {
  values: [],
  regions: [],
  stakeholders: [],
  paginationCounter: 0
}
const HomePage = ({ data, valueCategories, stakeholders, regions }) => {
  const [filteredData, setFilteredData] = useState();
  const [paginationInfo, setPaginationInfo] = useState();
  const [filters, setFilters] = useState(initialState);
  const [loading,setLoading]=useState(false)
const setInitialStates = () => {
  setFilters(initialState)
};
useEffect(() => {
  setInitialStates();
  
}, []);

  return (
    <Layout>
      <Meta />
      <Hero />
      
      

      <section className="relative sm:grid sm:grid-rows-1 lg:grid lg:grid-cols-[1fr_3fr] container mx-auto mt-5 gap-10">
      <Filters
          setFilteredData={setFilteredData}
          valueCategories={valueCategories}
          stakeholders={stakeholders}
          regions={regions}
          filters={filters}
          setFilters={setFilters}
          loading={loading}
          setLoading={setLoading}
          setPaginationInfo={setPaginationInfo}
        />

        {filteredData && (
          <div className="flex flex-col">
            <section className="pagination flex flex-col mt-5 md:mt-0">
            <div className=" flex flex-col md:flex-row gap-y-5 md:justify-between items-center ">
              <p className=" text-2xl">
                Showing <strong>{filteredData?.length}</strong> success stories{" "}
              </p>
              <PaginationButtons setFilters={setFilters} paginationInfo={paginationInfo}/>
            </div>
            <AppliedFiltersLabels setInitialStates={setInitialStates} filters={filters} setFilters={setFilters}
              />
        </section>
       {loading ? <Loader/>:<ToolsResults
              content={filteredData}
            /> }
              <PaginationButtons setFilters={setFilters} paginationInfo={paginationInfo}/>
            
          </div>
        )}
      </section>
      <div className="footer-top-bar h-12"></div>
    </Layout>
  );
};

export default HomePage;

export async function getServerSideProps(context) {

  try {
    // const dataResponse = await getValuesGenerated()
    const valuesTaxonomy = await getValuesTaxonomy()
    const stakeholders = await getStakeholders()
    const regions = await getRegions()

    return {
      props: {
        // data: dataResponse.list,
        valueCategories: valuesTaxonomy.list,
        stakeholders : stakeholders.list,
        regions: regions.list,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { data: "No Data" } };
  }
}


 
function Filters({ setFilteredData, valueCategories, filters, setFilters, stakeholders, regions, setLoading, loading, setPaginationInfo,  }) {

  const [openRegionList, setRegionList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [openBeneficiaryList, setBeneficiaryList] = useState(false);
  const [clusterCategories, setClusterCategories] = useState([]);

  

  const applyFilters = () => {
    const params = new URLSearchParams()
    const createParamsString = () => {
      Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'object') {
          const filterStringQuery = value.join(",");
          params.set(key, filterStringQuery);  
        } else {
          params.set(key, value); 
        }
      });


      return params.toString();
    };
    const string = createParamsString()
    
    // window.history.replaceState(null, '', `?${createParamsString()}`)
    // router.replace(`?${string}`, undefined,{ scroll: false });
    // let timeOutID = setTimeout(() => {
    //   params.delete('showDialog')
    //   router.push(`?${createParamsString()}`)
    // }, 1500)
    return string;
  };

  useEffect(() => {
   if (valueCategories.length > 0) {
    const uniqueClusterCategories = new Set();

    valueCategories?.forEach((value) => {

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
  }, [valueCategories]);

  //here i created an empty object and filled it with the cluster category as a key which has an array that containts
  //all the value generation categories
  const groupedCategories = {};

  valueCategories?.forEach((item) => {
    const clusterCategory = item["ClusterList"][0];
    const valueGenerationCategory = item["ValueGenerationCategory"];

    if (!groupedCategories[clusterCategory]) {
      groupedCategories[clusterCategory] = [];
    }

    groupedCategories[clusterCategory].push(valueGenerationCategory);
  });
  useEffect(() => {
    const queryParams = applyFilters()

    // if (queryParams) are now present is ok, we are doing the verification on api routes
      setLoading(true)
      fetch('/api/nocodb?' + queryParams)
      .then(res => res.json())
      .then(data => {
        setFilteredData(data?.list)
        setPaginationInfo(data?.pageInfo)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
      
    }, [
      // data,
      filters
  ]);

 
  return (
    <div
      id="filter-container"
      className="lg:pr-0 flex flex-col  grid-cols-1 "
    >
      <div id="values-list" className="bg-[#FBC6FD]">
        <label
          id="listbox-label"
          className="block text-sm font-medium cursor-pointer flex justify-between px-3 py-3 items-center "
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
                        const set = new Set(filters.values)

                        filters?.values.includes(clusterCategory) ? set.delete(clusterCategory) : set.add(clusterCategory)
                        
                        values.forEach(val => {
                          !set.has(clusterCategory) ? set.delete(val) : set.add(val)
                        })


                        setFilters(prev => ({
                          ...prev,
                          values: [...Array.from(set)],
                          paginationCounter: 0
                        }))
                        
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
                          const set = new Set(filters.values)
                          
                          set.has(valueGenCategory) ? set.delete(valueGenCategory) : set.add(valueGenCategory)

                          setFilters(prev => ({
                            ...prev,
                            values: [...Array.from(set)],
                            paginationCounter: 0
                          }))

                        }}
                        key={i}
                      >
                        <input
                          type="checkbox"
                          className="pink-checkbox"
                          name={valueGenCategory}
                          
                          checked={filters.values.includes(valueGenCategory)}
                          onChange={() => {
                            const set = new Set(filters.values)
                            
                            set.has(valueGenCategory) ? set.delete(valueGenCategory) : set.add(valueGenCategory)
  
                            setFilters(prev => ({
                              ...prev,
                              values: [...Array.from(set)],
                              paginationCounter: 0

                            }))
  
                          }}
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
          className="block text-sm font-medium cursor-pointer flex justify-between px-3 py-3 items-center "
        >
          <strong className="text-lg">Who Benefits?</strong>

          <button
            type="button"
            className="relative   rounded-md  py-2 text-left cursor-pointer focus:outline-none  sm:text-sm"
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
            >
              {stakeholders?.map(
                (stakeholderKey, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {

                        const newSetValues = new Set(filters.stakeholders)
                        if (newSetValues.has(stakeholderKey.Segment)) {

                          newSetValues.delete(stakeholderKey.Segment)
                          
                        } else {
                          newSetValues.add(stakeholderKey.Segment)
                        }
                       
                        setFilters(prev => ({
                          ...prev,
                          stakeholders: Array.from(newSetValues),
                          paginationCounter: 0

                        }))
                     
                      }}
                      className="hover:bg-[var(--light-yellow)] flex items-center select-none  py-2 px-3 cursor-pointer "
                      id="listbox-option-0"
                      role="option"
                    >
                      <input
                        type="checkbox"
                        className="orange-checkbox"
                        checked={filters.stakeholders.includes(stakeholderKey.Segment)}
                        onChange={() => {
                          const newSetValues = new Set(filters.stakeholders)
                          if (newSetValues.has(stakeholderKey.Segment)) {
  
                            newSetValues.delete(stakeholderKey.Segment)
                            
                          } else {
                            newSetValues.add(stakeholderKey.Segment)
                          }
                         
                          setFilters(prev => ({
                            ...prev,
                            stakeholders: Array.from(newSetValues),
                            paginationCounter: 0

                          }))
                        }
                        }
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
          className="block text-sm font-medium cursor-pointer flex justify-between px-3 py-3 items-center "
        >
          <strong className="text-lg">List of regions</strong>

          <button
            type="button"
            className="relative   rounded-md  py-2 text-left cursor-pointer focus:outline-none  sm:text-sm"
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
            >
              {regions?.map((regionKey, index) => {
                return (
                  <li
                    key={index}
                    onClick={() =>  {
                      const newSetValues = new Set(filters.regions)
                      if (newSetValues.has(regionKey.RegionDetail)) {

                        newSetValues.delete(regionKey.RegionDetail)
                        
                      } else {
                        newSetValues.add(regionKey.RegionDetail)
                      }
                     
                      setFilters(prev => ({
                        ...prev,
                        regions: Array.from(newSetValues),
                        paginationCounter: 0

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
                      checked={filters.regions.includes(regionKey.RegionDetail)}
                      onChange={(e) => {
                        const newSetValues = new Set(filters.regions)
                      if (newSetValues.has(regionKey.RegionDetail)) {

                        newSetValues.delete(regionKey.RegionDetail)
                        
                      } else {
                        newSetValues.add(regionKey.RegionDetail)
                      }
                     
                      setFilters(prev => ({
                        ...prev,
                        regions: Array.from(newSetValues),
                        paginationCounter: 0

                      }))
                      }}
                    />
                    <div className="flex items-center">
                      <span className="font-normal ml-3 ">{regionKey.RegionDetail}</span>
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
