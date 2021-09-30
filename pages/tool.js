import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useRouter } from "next/router";
import { ValueContext } from "../context/valueContext";
import Head from "next/head";

const Tool = ({ data }) => {

  const router = useRouter();
  const [user, setUser] = useContext(ValueContext)
  const routerLocation = router.asPath;



  const [whoBenefits, setWhoBenefits] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const [offset, setOffset] = useState(data.offset);
  

  const { selectedTypeOfValue } = user ;


  /* GET category custers CLEAN LIST */
  const allCategories = new Set([]);
  const getCategories = data.records.map((record) => {
    allCategories.add(record.fields["Cluster Category"]);
  });

  const categoryArray = Array.from(allCategories);
  const joinCategories = categoryArray.join();
  const separatedCategories = joinCategories.split(",");


  /* const typeOfValues = [...new Set(separatedCategories)]; */


  /* console.log("typeOfValues",typeOfValues) */
  const typeOfValues = [
    'Efficiency/cost reduction',
    'Network optimisation',
    'Revenue growth',
    'Financial health of customers',
    'Increased innovation',
    'Reduced inequality'
  ]

  const categoryList = data.records.filter(
    (record, index) =>
      record.fields["Cluster Category"] !== "" &&
      record.fields["Cluster Category"] !== undefined
  );
  const filteredCategoryList =
    selectedTypeOfValue === "All"
      ? categoryList
      : categoryList.filter((record) =>
          record.fields["Cluster Category"].includes(selectedTypeOfValue)
        );

  const [loading, setLoading] = useState(false);

  /* WHEN USERS SELECT A REGION OR BENEFICIARY */
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("");

  const [beneficiaryy, setBeneficiaryy] = useState("");

  const [isfilteredCategoryListActive, setfilteredCategoryListActive] =
    useState(true);
  const [isRegionFilterActive, setIsRegionFilterActive] = useState(false);
  const [isBeneficiaryFilterActive, setIsBeneficiaryFilterActive] =
    useState(false);


  let [filter, setFilter] = useState(filteredCategoryList);

  /* FILTERS */
  const filteredByRegion = filteredCategoryList.filter((region) =>
    region.fields["Region (from Country)"].includes(selectedRegion)
  );
  const filteredByBeneficiary = filteredCategoryList.filter((beneficiary) =>
    beneficiary.fields["Who benefits?"].includes(beneficiaryy)
  );
  const filterByRegionAndBeneficiary = filteredCategoryList.filter(
    (item) =>
      item.fields["Region (from Country)"][0] === selectedRegion &&
      item.fields["Who benefits?"].includes(beneficiaryy)
  );

  /* GET regions CLEAN LIST */
  const allRegions = new Set([]);
  const getRegions = data.records.map((record) => {
    allRegions.add(record.fields["Region (from Country)"]);
  });

  const regionsArray = Array.from(allRegions);
  const joinRegions = regionsArray.join();
  const separatedRegions = joinRegions.split(",");

  let regions = [...new Set(separatedRegions)];

  /* WHO BENEFIST CLEAN LIST */
  const allBenefits = new Set([]);
  const getBenefits = data.records.map((record) => {
    allBenefits.add(record.fields["Who benefits?"]);
  });
  const benefistArray = Array.from(allBenefits);

  let beneficiary = [...new Set(benefistArray)];

  const [openRegionList, setRegionsList] = useState(false);
  const [openValuesList, setValuesList] = useState(false);
  const [beneficiaryList, setBeneficiaryList] = useState(false);

  /* LISTS */
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


  const handleNextPage = () =>{
      setOffset(data.offset)
      router.push({
        pathname:'/tool',
        query: {offset}
      });
  }

  const handleBackPage = () =>{
 router.back()
}
  /* HANDLE FLUNCTIONS */

  const handleValues = (value) => {
    if (value === "All") {
      setUser({ ...user, selectedTypeOfValue: value });
      setValuesList(!openValuesList);
      typeof window !== undefined && window.localStorage.setItem("value",value)
    } else {
      setLoading(true);
      setUser({ ...user, selectedTypeOfValue: value });
      setValuesList(!openValuesList);
      typeof window !== undefined && window.localStorage.setItem("value",value)
    }
  };

  const handleRegions = (value) => {
    if (value === "All") {
      setIsRegionFilterActive(false);
      setSelectedRegion(value);
      setRegionsList(!openRegionList);
      typeof window !== undefined && window.localStorage.setItem("region",value)
    } else {
      setLoading(true);
      setfilteredCategoryListActive(false);
      setIsRegionFilterActive(true);
      setSelectedRegion(value);
      setRegionsList(!openRegionList);
      typeof window !== undefined && window.localStorage.setItem("region",value)
    }
  };

  const handleBeneficiary = (value) => {
    if (value === "All") {
      setIsBeneficiaryFilterActive(false);
      setSelectedBeneficiary("");
      setBeneficiaryy(value);
      setBeneficiaryList(!beneficiaryList);
      typeof window !== undefined && window.localStorage.setItem("beneficiary",value.id)
    } else {
      setLoading(true);
      setSelectedBeneficiary(value.fields.Name);
      setBeneficiaryy(value.id);
      setIsBeneficiaryFilterActive(true);
      setBeneficiaryList(!beneficiaryList);
      typeof window !== undefined && window.localStorage.setItem("beneficiary",value.id)
    }
  };

  useEffect(() => {

 if(typeof window !== undefined && selectedTypeOfValue===""){
   setUser({...user,selectedTypeOfValue:window.localStorage.getItem("value")})
 }

 if(typeof window !== undefined && selectedRegion !=="" || selectedRegion===selectedRegion){
  setSelectedRegion(window.localStorage.getItem("region"))
}

if(typeof window !== undefined && selectedBeneficiary !=="" || selectedBeneficiary===selectedBeneficiary){
  setSelectedBeneficiary(window.localStorage.getItem("beneficiary"))
}

    if(offset === offset){
      setOffset(data.offset)
    } else {
      setOffset("")
    }
    function getBeneficiay() {
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
    getBeneficiay();

    function getCountries() {
      fetch(
        "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/LOOKUP%20Countries%20and%20regions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => setCountryList(res));
    }
    getCountries();

    if (selectedTypeOfValue === "All") {
      setFilter(data.records);
    }

    if (isRegionFilterActive) {
      setFilter(filteredByRegion);
    }

    if (!isRegionFilterActive && !isBeneficiaryFilterActive) {
      setFilter(filteredCategoryList);
    }

    if (!isRegionFilterActive && isBeneficiaryFilterActive) {
      setFilter(filteredByBeneficiary);
    }

    if (isBeneficiaryFilterActive) {
      setFilter(filteredByBeneficiary);
    }

    if (isRegionFilterActive && !isBeneficiaryFilterActive) {
      setFilter(filteredByRegion);
    }

    if (isBeneficiaryFilterActive && isRegionFilterActive) {
      setFilter(filterByRegionAndBeneficiary);
    }
  }, [
    isRegionFilterActive,
    isBeneficiaryFilterActive,
    selectedRegion,
    selectedBeneficiary,
    isfilteredCategoryListActive,
    beneficiaryy,
    selectedTypeOfValue,
    offset,
    data,
    router,
    user
  ]);

/*   useEffect(() => {
    if(typeof window !== undefined){
      window.localStorage.setItem("value",selectedTypeOfValue)
      window.localStorage.setItem("region",selectedRegion)
      window.localStorage.setItem("beneficiary",selectedBeneficiary)
    }
  
    }, [selectedTypeOfValue,selectedRegion,selectedBeneficiary]); */


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
              >
                <li
                  className="text-white  select-none relative py-2 pl-3 pr-9 cursor-pointer hover:text-russian-violet-dark"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => handleValues("All")}
                >
                  <div className="flex items-center">
                    <span className="font-normal ml-3 block truncate hover:text-russian-violet-dark">All</span>
                  </div>
                </li>
                {typeOfValues.map((value, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleValues(value)}
                      className="text-white cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer"
                      id="listbox-option-0"
                      role="option"
                    >
                      <div className="flex items-center">
                        <span className="font-normal ml-3 block truncate hover:text-russian-violet-dark">
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
        {/* end of values list */}

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
                <img
                  className="icon-list-img"
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                />
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
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => handleRegions("All")}
                >
                  <div className="flex items-center">
                    <img
                      className="icon-list-img"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                    />

                    <span className="font-normal ml-3 block truncate">All</span>
                  </div>
                </li>
                {regions.map((region, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => handleRegions(region)}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                      id="listbox-option-0"
                      role="option"
                    >
                      <div className="flex items-center">
                        <img
                          className="icon-list-img"
                          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                        />

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
        {/* end of region list */}

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
                <img
                  className="icon-list-img"
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                />
                <span className="ml-3 block truncate">
                  {selectedBeneficiary
                    ? selectedBeneficiary
                    .replace(undefined,"All")
                    .replace("rec0sHRLympDzhHnH","Api Providers: Banks")
                    .replace("rec5WiyYl7YkjHSnf","API Providers: Fintech")
                  .replace("rec808UArs5s8nqQP", "API Consumers: Banks")
                  .replace("rec9PyeqBvGC7ssLq", "Indirec Beneficiary: enviroment")
                  .replace("recAIDs80H80vO6zI", "API Industry")
                  .replace("recGjYPts2AXBvgUW", "Indirec Beneficiary: society")
                  .replace("recQqQHW7I9e4H6Ju", "API consumers: marketplaces")
                  .replace("recTrXIJjD4cdGdtF", "End Users: SMEs")
                  .replace("recZ4yww4nzLpCZKU", "Underserved")
                  .replace("recdVZ1R1TZMEjO8", "API consumers: Aggregators")
                  .replace("recn3CQWbTyoFPspd", "End users: Enterprises")
                  .replace("recskLXhgf2j6jZxy", "End Users: Solo traders")
                  .replace("recvXrHSkmQruF4Mx", "API consumers: Fintech")
                  .replace("recwO2o2RPPSU3g5i", "Indirec beneficiares: Economy")
                  .replace("recyrgiHgoF346Tra","End Users: individuals / households")
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
              >
                <li
                  className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => handleBeneficiary("All")}
                >
                  <div className="flex items-center">
                    <img
                      className="icon-list-img"
                      src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                    />

                    <span className="font-normal ml-3 block truncate">All</span>
                  </div>
                  {/* 
        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
        
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span> */}
                </li>
                {whoBenefits &&
                  whoBenefits.records.map((benefits, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => handleBeneficiary(benefits)}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50"
                        id="listbox-option-0"
                        role="option"
                      >
                        <div className="flex items-center">
                          <img
                            className="icon-list-img"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                          />

                          <span className="font-normal ml-3 block truncate">
                            {benefits.fields.Name}
                          </span>
                          <span className="font-normal ml-3 block truncate">
                            {benefits.fields["Who benefits?"]}
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
      {/* end of form */}

      {filter ? (
        <Card content={filter} 
        user={user}  
        offset={offset} 
        handleNextPage={handleNextPage} 
        handleBackPage={handleBackPage}
        routerLocation={routerLocation}
        selectedRegion={selectedRegion}
        selectedBeneficiary={selectedBeneficiary}
        />
      ) : (
        <section className="container mx-auto">
          <h3 className="text-center font-black text-4xl my-5">
            No values registered
          </h3>
        </section>
      )}
    </Layout>
  );
};

export default Tool;




export async function getServerSideProps(context) {
 
const getquery = await context;

const offset= "" || await getquery.query.offset;

const noOffsetUrl="https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated?pageSize=100"
const OffsetUrl=`https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated?pageSize=100&offset=${offset}`


  
  const res = await fetch(
    offset===undefined ? noOffsetUrl : OffsetUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
      },
    }
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
