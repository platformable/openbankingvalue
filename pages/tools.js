import React, { useState, useEffect, useContext, useMemo } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useRouter } from "next/router";
import { ValueContext } from "../context/valueContext";
import Head from "next/head";

const Tools = ({ data, pagination }) => {
  console.log(data)
  const [user, setUser] = useContext(ValueContext);

  const [filteredData, setFilteredData] = useState(data.records);

  const [clientOffset, setClientOffset] = useState(data.offset);
  const { selectedTypeOfValue, typeOfValues,favorites } = user;
  const router = useRouter();
  // const routerLocation = router.asPath;
  // const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({
    "APAC": false,
    "Eastern Europe & Russia": false,
    "Africa": false,
    "Europe": false,
    "Latin America": false,
    "Middle East": false,
    "Eastern Europe & Russia": false,
    "North America": false,
    "all": true,
  });
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("All");
  const [beneficiaryId, setBeneficiaryId] = useState("All");

  const arrayOfFIlters =  [
    // Filter for each value of fields array (fields.[])
    // Return always true if typeOfValues === true, Return existence of the typeOfValues == true in Cluster Category  
    (item) => {
      if(typeOfValues['all'] === true ) return true;
      return Object.entries(typeOfValues)?.filter(([key, value]) => value).every(([key, value]) => item.fields["Cluster Category"]?.includes(key)) 
    },

    // Filter for each value of fields array (fields.[])
    // Return always true if selectedRegions === true, Return existence of the typeOfValues == true in Region (From country) 
    (item) => {
      if(selectedRegion['all'] === true ) return true;
      return Object.entries(selectedRegion)?.filter(([key, value]) => value).every(([key, value]) => item.fields["Region (from Country)"]?.includes(key)) 
    },

    // Filter for each value of fields array (fields.[])
    // Return always true if selectedRegions === true, Return existence of the typeOfValues == true in Region (From country) 
    (item) => {
      if(selectedRegion['all'] === true ) return true;
      return Object.entries(selectedRegion)?.filter(([key, value]) => value).every(([key, value]) => item.fields["Region (from Country)"]?.includes(key)) 
    },

    // (item) => beneficiaryId.map(type=> item. fields["Who benefits?"]?.includes(type)),

    // (item) => beneficiaryId !== 'All' ? item.fields["Who benefits?"]?.includes(beneficiaryId) : true ,
  ]
  const filterResults = (arr, populatedData ) => {
    if (arr.length < 1) return;

    const [firstFilter, ...rest] = arr;

    const newData = populatedData.filter((r) => firstFilter(r) );

    setFilteredData(newData)
    
    return filterResults([...rest], newData);
  };
    console.log(filteredData)
    console.log(selectedRegion)



  const [whoBenefits, setWhoBenefits] = useState([]);

  useEffect(() => {
    // Repopulate from Server records to avoid empty data
      filterResults(arrayOfFIlters, data?.records)
  },
    [selectedTypeOfValue,typeOfValues, selectedRegion, beneficiaryId]
  );

  const [openRegionList, setRegionsList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [beneficiaryList, setBeneficiaryList] = useState(false);

  const typeOfValues_oldvar = {
    "all": true,
    "Efficiency/cost reduction":false,
    "Network optimisation":false,
    "Revenue growth":false,
    "Financial health of customers":false,
    "Increased innovation":false,
    "Reduced inequality":false
    /*     'Environment improvements',
    'Local economic development' */
};

  const regions_oldVar = [
    "APAC",
    "Eastern Europe & Russia",
    "Africa",
    "Europe",
    "Latin America",
    "Middle East",
    "Eastern Europe & Russia",
    "North America",
  ];
  /*  const getData = ()=> {

    fetch('https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`,
      },
    })
    .then(response=>response.json())
    .then(res=>setData(res.records)) 

} */

  /* function handleOptions (){
  if(selectedTypeOfValue==="All" && selectedRegion==="All" && selectedBeneficiary==="All"){setTest(data)}

  if(selectedTypeOfValue!=="All" && selectedRegion==="All" && selectedBeneficiary==="All"){setTest(data.filter(bank=>bank.fields['Cluster Category'].includes(selectedTypeOfValue)))
  }
} */

  /* select box LISTS */
  const handleRegionsList = () => {
    setRegionsList(!openRegionList);
  };

  const handleValuesList = () => {
    setValuesList(!openValuesList);
    typeof window !== undefined &&
      window.localStorage.setItem("value", selectedTypeOfValue);
  };

  const handleBeneficiaryList = () => {
    setBeneficiaryList(!beneficiaryList);
  };

  /* Get FUNCTIONS */
  const handleBeneficiary = (beneficiary) => {
    if (beneficiary === 'All') {
      setBeneficiaryId('All');
      setSelectedBeneficiary('All')
    }
    else {
      setBeneficiaryId(beneficiary.id)
      setSelectedBeneficiary(beneficiary.fields.Name);
    }
  };

  useEffect(() => {
    console.log('getting beneficiary')
    function getBeneficiary() {
      fetch(
        "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/LOOKUP%20Value%20stakeholders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => setWhoBenefits(res));
    }

    
    getBeneficiary()
  }, [])
 
  

  return (
    <Layout>
      <Head>
        <title>Platformable Value Generated Tool</title>
        <meta name="description" content="Platformable Value Generated Tool" />
      </Head>

      <div className="container mx-auto grid md:grid-cols-3 gap-4 grid-cols-1 py-10">
        <div className="md:my-5 mt-5 bank-form-list md:px-0 px-5">
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700"
          >
            List of values
          </label>
          <div className="mt-1 relative">
            <button
              type="button"
              className="relative w-full   bg-red-orange-dark rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              onClick={handleValuesList}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate text-white hover:text-russian-violet-dark">
                  {selectedTypeOfValue
                    ? selectedTypeOfValue
                    : "Select type of value"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {openValuesList && (
              <ul
                className="absolute z-10 mt-1 w-full bg-red-orange-dark shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
                onMouseLeave={() => setValuesList(!openValuesList)}
              >
                <li
                  className="text-white  li-bg-russian-violet-dark select-none relative py-2 pl-3 pr-9 cursor-pointer"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => {
                      setUser({ ...user, selectedTypeOfValue: "All" })
                      
                      setUser({...user, typeOfValues: {...typeOfValues, 'all': !user.typeOfValues.all} })
                    }
                  }
                >
                  <div className="flex items-center">
                  <input type="checkbox"  onChange={(e) => {
                            setUser({...user, typeOfValues: {...typeOfValues, 'all': !typeOfValues['all'] } })
                        }} defaultChecked={typeOfValues['all']} checked={typeOfValues['all']}/>
                    <span className="font-normal ml-3 block truncate hover:text-white">
                      All
                    </span>
                  </div>
                </li>
                {typeOfValues && Object.entries(typeOfValues).map(([label, value], index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setUser({ ...user, selectedTypeOfValue: value.label })
                        setUser({...user, typeOfValues: {...typeOfValues, [label]: !value} })
                        }
                      }
                      className="text-white flex cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer li-bg-russian-violet-dark"
                      id="listbox-option-0"
                      role="option"
                    >
                        <input type="checkbox" name={label} onChange={(e) => {
                            setUser({...user, typeOfValues: {...typeOfValues, [label]: !value} })
                        }} defaultChecked={typeOfValues[label]} checked={typeOfValues[label]}/>
                      <div className="flex items-center">
                        <span className="font-normal ml-3 block truncate hover:text-white">
                          {label}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="md:my-5 mt-5 bank-form-list md:px-0 px-5">
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700"
          >
            List of regions
          </label>
          <div className="mt-1 relative">
            <button
              type="button"
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              onClick={handleRegionsList}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selectedRegion['all'] ? 'All' : "Select Region"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {openRegionList && (
              <ul
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
                onMouseLeave={() => setRegionsList(!openRegionList)}
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => setSelectedRegion(prev => ({...selectedRegion, all: !prev.all}))}
                >
                  <div className="flex items-center">
                    <span className="font-normal ml-3 block truncate">All</span>
                  </div>
                </li>
                {Object.keys(selectedRegion).map((regionKey, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setSelectedRegion(prev => ({...selectedRegion, [regionKey]: !prev[regionKey]}))}
                      className="text-gray-900 flex cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                      id="listbox-option-0"
                      role="option"
                    >
                      <input type="checkbox"   defaultChecked={selectedRegion[regionKey]} checked={selectedRegion[regionKey]}/>
                      <div className="flex items-center">
                        <span className="font-normal ml-3 block truncate">
                          {regionKey}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="md:my-5 values-form-list md:px-0 px-5">
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700"
          >
            Who Benefits?
          </label>
          <div className="mt-1 relative">
            <button
              type="button"
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              onClick={handleBeneficiaryList}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {selectedBeneficiary
                    ? selectedBeneficiary
                    : "Select Beneficiary"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {beneficiaryList && (
              <ul
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
                onMouseLeave={() => setBeneficiaryList(!beneficiaryList)}
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => handleBeneficiary("All")}
                >
                  <div className="flex items-center">
                    <span className="font-normal ml-3 block truncate">All</span>
                  </div>
                </li>
                {whoBenefits &&
                  whoBenefits.records.map((beneficiary, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => handleBeneficiary(beneficiary)}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                        id="listbox-option-0"
                        role="option"
                      >
                        <div className="flex items-center">
                          <span className="font-normal ml-3 block truncate">
                            {beneficiary.fields.Name}
                          </span>
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

      {data && (
        <div className="">
          <Card
            content={filteredData}
            selectedRegion={selectedRegion}
            selectedBeneficiary={selectedBeneficiary}
            clientOffset={clientOffset}
            pagination={pagination}
          />
        </div>
      )}
    </Layout>
  );
};

export default Tools;

export async function getServerSideProps(context) {
  const offset = "" || (await context.query.clientOffset);

  console.log("context query", context.query);

  const url =
    offset === undefined
      ? "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated"
      : `https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated?offset=${offset}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
    },
  });
  const data = await res.json();
  const pagination = (await data.offset) || null;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, pagination },
  };
}
