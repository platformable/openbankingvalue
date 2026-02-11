import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Meta from "../components/Meta"
import { getRegions } from "./api/nocodb-regions"
import { getValuesTaxonomy } from "./api/nocodb-value-taxonomy"
import { getStakeholders } from "./api/nocodb-stakeholders"
import ToolsResults from ".././components/ToolsResults"
import AppliedFiltersLabels from "../components/AppliedFiltersLabels"
import Loader from "../components/Loader"
import PaginationButtons from "../components/PaginationButtons"
import Filters from "../components/Filters"
import ValueGeneratedFilter from "../components/filters/ValueGeneratedFilter"
import BeneficiariesFilter from "../components/filters/BeneficiariesFilter"
import RegionFilter from "../components/filters/RegionFilter"

const initialState = {
  values: [],
  regions: [],
  stakeholders: [],
  paginationCounter: 0,
}
const HomePage = ({ valueCategories, stakeholders, regions }) => {
  const [filteredData, setFilteredData] = useState()
  const [paginationInfo, setPaginationInfo] = useState()
  const [filters, setFilters] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const setInitialStates = () => {
    setFilters(initialState)
  }

  useEffect(() => {
    setInitialStates()
  }, [])

  console.log("filteredData", filteredData)

  return (
    <Layout>
      <Meta />
      <Hero />

      <section className="relative sm:grid sm:grid-rows-1 lg:grid lg:grid-cols-[1fr_3fr] container mx-auto mt-5 gap-10">
        <Filters
          setFilteredData={setFilteredData}
          filters={filters}
          setFilters={setFilters}
          setLoading={setLoading}
          setPaginationInfo={setPaginationInfo}
        >
          <ValueGeneratedFilter
            valueCategories={valueCategories}
            filters={filters}
            setFilters={setFilters}
          />
          <BeneficiariesFilter
            stakeholders={stakeholders}
            filters={filters}
            setFilters={setFilters}
          />
          <RegionFilter
            regions={regions}
            filters={filters}
            setFilters={setFilters}
          />
        </Filters>

        {filteredData && (
          <div className="flex flex-col">
            <section className="pagination flex flex-col mt-5 md:mt-0">
              <div className=" flex flex-col md:flex-row gap-y-5 md:justify-between items-center ">
                <p className=" text-2xl">
                  Showing{" "}
                  {paginationInfo?.pageSize * filters?.paginationCounter +
                    1 +
                    " - " +
                    paginationInfo?.pageSize * paginationInfo?.page}{" "}
                  of <strong>{paginationInfo?.totalRows}</strong> success
                  stories{" "}
                </p>
                <PaginationButtons
                  setFilters={setFilters}
                  paginationInfo={paginationInfo}
                />
              </div>
              <AppliedFiltersLabels
                setInitialStates={setInitialStates}
                filters={filters}
                setFilters={setFilters}
              />
            </section>
            {loading ? <Loader /> : <ToolsResults content={filteredData} />}
            <PaginationButtons
              setFilters={setFilters}
              paginationInfo={paginationInfo}
            />
          </div>
        )}
      </section>
      <div className="footer-top-bar h-12"></div>
    </Layout>
  )
}

export default HomePage

export async function getServerSideProps(context) {
  try {
    // const dataResponse = await getValuesGenerated()
    const valuesTaxonomy = await getValuesTaxonomy()
    const stakeholders = await getStakeholders()
    const regions = await getRegions()

    /*  console.log("valuesTaxonomy in getServerSideProps", valuesTaxonomy) */
    return {
      props: {
        // data: dataResponse.list,
        valueCategories: valuesTaxonomy || null,
        stakeholders: stakeholders || null,
        regions: regions || null,
      },
    }
  } catch (error) {
    console.log(error)
    return { props: { data: "No Data" } }
  }
}
