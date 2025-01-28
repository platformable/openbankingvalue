import { useState } from "react";

const BeneficiariesFilter = ({ stakeholders, filters, setFilters }) => {
    const [openBeneficiaryList, setBeneficiaryList] = useState(false);

    return (
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

    )
};

export default BeneficiariesFilter;