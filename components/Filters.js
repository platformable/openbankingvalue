import { useState, useEffect } from "react"

function Filters({
  children,
  setFilteredData,
  filters,
  setFilters,
  setLoading,
  setPaginationInfo,
}) {
  const applyFilters = () => {
    const params = new URLSearchParams()
    const createParamsString = () => {
      Object.entries(filters).map(([key, value]) => {
        if (typeof value === "object") {
          const filterStringQuery = value.join(",")
          params.set(key, filterStringQuery)
        } else {
          params.set(key, value)
        }
      })

      return params.toString()
    }
    const string = createParamsString()

    return string
  }

  useEffect(() => {
    const queryParams = applyFilters()

    console.log("queryParams in useEffect of Filters.js", queryParams)

    // if (queryParams) are now present is ok, we are doing the verification on api routes
    setLoading(true)
    /* fetch("/api/nocodb?" + queryParams) */
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/value-generated?${queryParams}`,
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log("data in filters.js", data)
        setFilteredData(data.data)
        setPaginationInfo(data?.pageInfo)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [
    // data,
    filters,
  ])

  return (
    <div id="filter-container" className="lg:pr-0 flex flex-col  grid-cols-1 ">
      {children}
    </div>
  )
}

export default Filters
