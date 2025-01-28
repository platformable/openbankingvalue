import { useState } from "react";

const RegionFilter = ({ regions, filters, setFilters }) => {
  const [openRegionList, setRegionList] = useState(false);

    return (
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
    )
};

export default RegionFilter;