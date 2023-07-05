import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useRouter } from "next/router";
import { ValueContext } from "../context/valueContext";
import Head from "next/head";

const Tools = ({data,pagination}) => {

   const [user, setUser] = useContext(ValueContext)

   const [filteredData,setFilteredData]=useState([] || data.records)

const [clientOffset,setClientOffset]=useState(data.offset)
    const { selectedTypeOfValue } = user;
   const router = useRouter();
   const routerLocation = router.asPath;


   const [loading, setLoading] = useState(false);
 const [selectedRegion,setSelectedRegion]=useState("All")
 const [selectedBeneficiary,setSelectedBeneficiary]=useState("All")

  const [whoBenefits,setWhoBenefits]=useState([]);
  
  const [liveData,setLiveData]=useState([])

  const [openRegionList, setRegionsList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [beneficiaryList, setBeneficiaryList] = useState(false);
  const [beneficiaryId,setBeneficiaryId]=useState("")

  const typeOfValues = [
    'Efficiency/cost reduction',
    'Network optimisation',
    'Revenue growth',
    'Financial health of customers',
    'Increased innovation',
    'Reduced inequality',
/*     'Environment improvements',
    'Local economic development' */
  ]

  const regions = [
    'APAC',
    'Eastern Europe & Russia',
    'Africa',
    'Europe',
    'Latin America',
    'Middle East',
    'Eastern Europe & Russia',
    'North America'
  ]
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
    typeof window !== undefined && window.localStorage.setItem("value",selectedTypeOfValue)
  };

  const handleBeneficiaryList = () => {
    setBeneficiaryList(!beneficiaryList);
  };


  /* Get FUNCTIONS */


  function getBeneficiary() {
    fetch(
      "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/LOOKUP%20Value%20stakeholders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => setWhoBenefits(res));
  }


const handleBeneficiary=(beneficiary)=>{
  setBeneficiaryId(beneficiary.id)
  setSelectedBeneficiary(beneficiary.fields.Name)
}



useEffect(()=>{
  if(selectedTypeOfValue==="All" && selectedRegion ==="All" && selectedRegion==="All"){

    setFilteredData(data.records)

  }

  if(selectedTypeOfValue !=="All" && selectedRegion ==="All" && selectedBeneficiary==="All"){
    const result = data?.records.filter(item=>item?.fields['Cluster Category']?.includes(selectedTypeOfValue))
    setFilteredData(result)
  }

  if(selectedTypeOfValue !=="All" && selectedRegion !=="All" && selectedBeneficiary==="All"){
    const result = data?.records.filter(item=>item.fields['Cluster Category']?.includes(selectedTypeOfValue) && item.fields['Region (from Country)'].includes(selectedRegion))
    setFilteredData(result)
  }

  if(selectedTypeOfValue !=="All" && selectedRegion !=="All" && selectedBeneficiary!=="All"){
    const result = data?.records.filter(item=>item.fields['Cluster Category']?.includes(selectedTypeOfValue) && item.fields['Region (from Country)'].includes(selectedRegion) && item.fields['Who benefits?'].includes(beneficiaryId) ) 
    setFilteredData(result)
  }

  /* filter based on region */
  if(selectedTypeOfValue ==="All" && selectedRegion !=="All" && selectedBeneficiary==="All"){
    const result = data?.records.filter(item=> item.fields['Region (from Country)']?.includes(selectedRegion)) 
    setFilteredData(result)
  }

  if(selectedTypeOfValue ==="All" && selectedRegion !=="All" && selectedBeneficiary!=="All"){
    const result = data?.records.filter(item=> item.fields['Region (from Country)']?.includes(selectedRegion) && item.fields['Who benefits?'].includes(beneficiaryId)) 
    setFilteredData(result)
  }

  /* filter based on beneficiary */
  if(selectedTypeOfValue ==="All" && selectedRegion ==="All" && selectedBeneficiary !=="All"){
    const result = data?.records.filter(item=> item.fields['Who benefits?']?.includes(beneficiaryId)) 
    setFilteredData(result)
  }

  if(selectedTypeOfValue !=="All" && selectedRegion ==="All" && selectedBeneficiary !=="All"){
    const result = data?.records.filter(item=>item.fields['Cluster Category']?.includes(selectedTypeOfValue)  && item.fields['Who benefits?'].includes(beneficiaryId) ) 
    setFilteredData(result)
  }
  

getBeneficiary();

},[selectedTypeOfValue,selectedRegion,selectedBeneficiary,data,pagination])




  return (

 
    <Layout>
        <Head>
        <title>Platformable Value Generated Tool</title>
        <meta name="description" content="Platformable Value Generated Tool" />
      </Head>
      
      <div className="container mx-auto grid md:grid-cols-3 gap-4 grid-cols-1 py-10" >
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
                  ariaHidden="true"
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
                onMouseLeave={()=>setValuesList(!openValuesList)}
              >
                <li
                  className="text-white  li-bg-russian-violet-dark select-none relative py-2 pl-3 pr-9 cursor-pointer"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => setUser({ ...user, selectedTypeOfValue: "All" })}
                >
                  <div className="flex items-center">
                    <span className="font-normal ml-3 block truncate hover:text-white">All</span>
                  </div>
                </li>
                {typeOfValues.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setUser({ ...user, selectedTypeOfValue: value })}
                      className="text-white cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer li-bg-russian-violet-dark"
                      id="listbox-option-0"
                      role="option"
                    >
                      <div className="flex items-center">
                        <span className="font-normal ml-3 block truncate hover:text-white">
                          {value}
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
                  {selectedRegion ? selectedRegion : "Select Region"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  ariaHidden="true"
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
                onMouseLeave={()=>setRegionsList(!openRegionList)}
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => setSelectedRegion("All")}
                >
                  <div className="flex items-center">
                    <span className="font-normal ml-3 block truncate">All</span>
                  </div>
                </li>
                {regions.map((region, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setSelectedRegion(region)}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                      id="listbox-option-0"
                      role="option"
                    >
                      <div className="flex items-center">
                        

                        <span className="font-normal ml-3 block truncate">
                          {region}
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
                  ariaHidden="true"
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
                onMouseLeave={()=>setBeneficiaryList(!beneficiaryList)}
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => setSelectedBeneficiary("All")}
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

       {data && <div className="">
        <Card 
         content={filteredData} 
         selectedRegion={selectedRegion} 
         selectedBeneficiary={selectedBeneficiary}
         clientOffset={clientOffset}
         pagination={pagination}/>
       </div>}

 
    </Layout>
  );
};

export default Tools;

export async function getServerSideProps(context) {



const offset =  "" || await context.query.clientOffset

console.log("context query", context.query)

  
  const url=offset===undefined ?"https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated":
  `https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated?offset=${offset}`
 
    const res = await fetch(
      url ,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
        },
      }
    );
    const data = await res.json();
    const pagination= await data.offset || null;


   
   

    if (!data) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: { data,pagination },
    };
  }