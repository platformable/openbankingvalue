import { useState, useEffect } from 'react';

const ValueGeneratedFilter = ({ valueCategories, filters, setFilters }) => {
    const [openValuesList, setValuesList] = useState(false);
    const [clusterCategories, setClusterCategories] = useState({});
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
     
    return (
        <div id="values-list" className="bg-[#FBC6FD]">
            <label
                id="listbox-label"
                className="block text-sm font-medium cursor-pointer flex justify-between px-3 py-3 items-center"
            >
                <strong className="text-lg">Value generated categories</strong>
                <button
                    type="button"
                    className="hey relative rounded-md py-2 text-left cursor-pointer focus:outline-none sm:text-sm"
                    onClick={() => setValuesList(!openValuesList)}
                >
                    <img
                        src={openValuesList ? "/arrow-up.svg" : "/arrow-down.svg"}
                        alt="more icon"
                        width={23}
                    />
                </button>
            </label>

            <div className={`bg-[#FEE6FF] ${openValuesList ? "block" : "hidden"}`}>
                {Object.entries(groupedCategories).map(
                    ([clusterCategory, values], index) => (
                        <div key={index} className="">
                            <div className="flex justify-start items-center gap-2 px-3 py-3">
                                <input
                                    type="checkbox"
                                    name="cluster-option"
                                    checked={values.every(val => filters.values?.includes(val))}
                                    onChange={(e) => {
                                        const set = new Set(filters.values);
                                        filters?.values.includes(clusterCategory)
                                            ? set.delete(clusterCategory)
                                            : set.add(clusterCategory);

                                        values.forEach(val => {
                                            !set.has(clusterCategory) ? set.delete(val) : set.add(val);
                                        });

                                        setFilters(prev => ({
                                            ...prev,
                                            values: [...Array.from(set)],
                                            paginationCounter: 0
                                        }));
                                    }}
                                />
                                <h3 className="font-semibold">{clusterCategory}</h3>
                                <button
                                    type="button"
                                    className="relative rounded-md py-2 text-left cursor-default sm:text-sm ml-auto"
                                    onClick={() =>
                                        setClusterCategories(prev => ({
                                            ...prev,
                                            [clusterCategory]: !prev[clusterCategory]
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
                                className={`${
                                    clusterCategories[clusterCategory] ? "grid" : "hidden"
                                } py-5 bg-[#FFF7FF] w-full text-base h-auto focus:outline-none sm:text-sm`}
                                tabIndex="-1"
                                role="listbox"
                                aria-labelledby="listbox-label"
                                aria-activedescendant="listbox-option-3"
                            >
                                {groupedCategories[clusterCategory].map(
                                    (valueGenCategory, i) => (
                                        <li
                                            className="hover:bg-[#FEE6FF] flex cursor-pointer gap-3 py-3 px-3"
                                            onClick={() => {
                                                const set = new Set(filters.values);
                                                set.has(valueGenCategory)
                                                    ? set.delete(valueGenCategory)
                                                    : set.add(valueGenCategory);

                                                setFilters(prev => ({
                                                    ...prev,
                                                    values: [...Array.from(set)],
                                                    paginationCounter: 0
                                                }));
                                            }}
                                            key={i}
                                        >
                                            <input
                                                type="checkbox"
                                                className="pink-checkbox"
                                                name={valueGenCategory}
                                                checked={filters.values.includes(valueGenCategory)}
                                                onChange={() => {
                                                    const set = new Set(filters.values);
                                                    set.has(valueGenCategory)
                                                        ? set.delete(valueGenCategory)
                                                        : set.add(valueGenCategory);

                                                    setFilters(prev => ({
                                                        ...prev,
                                                        values: [...Array.from(set)],
                                                        paginationCounter: 0
                                                    }));
                                                }}
                                                role="option"
                                            />
                                            <div>{valueGenCategory}</div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ValueGeneratedFilter;