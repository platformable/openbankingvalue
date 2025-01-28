import { useState, useEffect } from "react";
import ValueGeneratedFilter from "./filters/ValueGeneratedFilter";
import BeneficiariesFilter from "./filters/BeneficiariesFilter";
import RegionFilter from "./filters/RegionFilter";

function Filters({ setFilteredData, valueCategories, filters, setFilters, stakeholders, regions, setLoading, loading, setPaginationInfo,  }) {



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
    
    return string;
  };

  
  

  useEffect(() => {
    const queryParams = applyFilters()

    // if (queryParams) are now present is ok, we are doing the verification on api routes
      setLoading(true)
      fetch('/api/nocodb?' + queryParams)
      .then(res => {
        return res.ok ? res.json() : Promise.reject(res)
      })
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
      
      <ValueGeneratedFilter valueCategories={valueCategories} filters={filters} setFilters={setFilters} />
      <BeneficiariesFilter stakeholders={stakeholders} filters={filters} setFilters={setFilters} />
      <RegionFilter regions={regions} filters={filters} setFilters={setFilters} />

    </div>
  );
}

export default Filters;