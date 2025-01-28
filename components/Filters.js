import { useState, useEffect } from "react";


function Filters({ children ,setFilteredData, filters, setFilters, setLoading, setPaginationInfo,  }) {



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
      
     {children}

    </div>
  );
}

export default Filters;