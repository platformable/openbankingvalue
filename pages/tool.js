import React, {useState,useContext,useEffect} from 'react';
import Layout from '../components/Layout'
import Card from '../components/Card'

import {ValueContext}from '../context/valueContext'



const Tool = ({data}) => {

  console.log(data.records)

  const [user,setUser]= useContext(ValueContext)
  const {selectedTypeOfValue} = user;
  const filteredList = data.records.filter((record)=>record.fields.Category===selectedTypeOfValue)

  const [loading,setLoading]=useState(false)

  /* WHEN USERS SELECT A REGION OR BENEFICIARY */
  const [selectedRegion,setSelectedRegion]=useState("")
  const [selectedBeneficiary,setSelectedBeneficiary]=useState("")

  const [isFilteredListActive,setFilteredListActive]=useState(true)
  const [isRegionFilterActive,setIsRegionFilterActive]=useState(false)
  const [isBeneficiaryFilterActive,setIsBeneficiaryFilterActive]=useState(false)


  let [filter,setFilter]=useState(filteredList)
  

  /* FILTERS */
  const filteredByRegion = filteredList.filter(region=>region.fields.Region===selectedRegion)
  const filteredByBeneficiary = filteredList.filter(beneficiary=>beneficiary.fields['Who benefits?']===selectedBeneficiary)  
  const filterByRegionAndBeneficiary = filteredList.filter(item=>item.fields.Region===selectedRegion && item.fields['Who benefits?']===selectedBeneficiary)

/* GET REGIONS CLEAN LIST */
const allRegions = new Set([])
const getregions = data.records.map(record=>{
  allRegions.add(record.fields.Region)
})
const regionsArray=Array.from(allRegions)

/* WHO BENEFIST CLEAN LIST */
const allBenefits = new Set([])
const getBenefits = data.records.map(record=>{
  allBenefits.add(record.fields['Who benefits?'])
})
const benefistArray=Array.from(allBenefits)



const [openRegionList,setRegionsList] = useState(false)
const [beneficiaryList,setBeneficiaryList] = useState(false)

/* LISTS */
const handleRegionsList=()=>{
    setRegionsList(!openRegionList)
}

const handleBeneficiaryList=()=>{
  setBeneficiaryList(!beneficiaryList)
}

/* HANDLE FLUNCTIONS */

const handleRegions = (value) =>{
  console.log("value",value)
  if (value==="All"){
    setIsRegionFilterActive(false)
    setSelectedRegion(value)
    setRegionsList(!openRegionList) 
  } else {
    setLoading(true)
    setFilteredListActive(false)
    setIsRegionFilterActive(true)
    setSelectedRegion(value)
    setRegionsList(!openRegionList) 
    
  }
  

}

const handleBeneficiary = (value) =>{
  if(value==="All"){
    setIsBeneficiaryFilterActive(false)
    setSelectedBeneficiary(value)
    setBeneficiaryList(!beneficiaryList)
  } else {
  setLoading(true)
  setFilteredListActive(false)
  setIsBeneficiaryFilterActive(true)
  setSelectedBeneficiary(value)
  setBeneficiaryList(!beneficiaryList)
  }
}

useEffect(()=>{

  if(isRegionFilterActive){  
    setFilter(filteredByRegion)
  } 

  if(!isRegionFilterActive && !isBeneficiaryFilterActive){  
    setFilter(filteredList)
  } 

  if(!isRegionFilterActive && isBeneficiaryFilterActive){  
   
    setFilter(filteredByBeneficiary)
  } 
  

  if(isBeneficiaryFilterActive){
    setFilter(filteredByBeneficiary)
  }

  console.log("isBeneficiaryFilterActive",isBeneficiaryFilterActive)
  if(isRegionFilterActive && !isBeneficiaryFilterActive){  
    setFilter(filteredByRegion)
  } 


  
  if (isBeneficiaryFilterActive && isRegionFilterActive){
    setFilter(filterByRegionAndBeneficiary)
  }

},[
  isRegionFilterActive,
  isBeneficiaryFilterActive,
  selectedRegion,
  selectedBeneficiary,
  isFilteredListActive,  
])



    return (

        <Layout>

<div className="container mx-auto grid md:grid-cols-2 gap-4 grid-cols-1">

<div className="md:my-5 mt-5 bank-form-list md:px-0 px-5">

  <label id="listbox-label" className="block text-sm font-medium text-gray-700">
   List of regions
  </label>
  <div className="mt-1 relative">
    <button type="button" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
    onClick={handleRegionsList}
    >
      <span className="flex items-center">
        <img 
        className="icon-list-img"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
        <span className="ml-3 block truncate">
          {selectedRegion ? selectedRegion : "Select Region"}
        </span>
      </span>
      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
     
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </button>

{openRegionList && 
    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
   
      <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50" id="listbox-option-0" role="option"
      onClick={()=>handleRegions("All")}
      >
        <div className="flex items-center">
          <img 
          className="icon-list-img"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
       
          <span className="font-normal ml-3 block truncate">
            All
          </span>
        </div>

       {/*  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
        
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span> */}
      </li>
      {
        regionsArray.map((region)=>{
          return (
            <li 
            onClick={()=>handleRegions(region)}
            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50" id="listbox-option-0" role="option">
              <div className="flex items-center">
                <img 
                className="icon-list-img"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
             
                <span className="font-normal ml-3 block truncate">
                  {region}
                </span>
              </div>
            </li>
          )
        })
      }
    </ul>
   }
  </div>

</div> 
{/* end of bank list */}



<div className="md:my-5 values-form-list md:px-0 px-5">

  <label id="listbox-label" className="block text-sm font-medium text-gray-700">
   Who Benefits?
  </label>
  <div className="mt-1 relative">
    <button type="button" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
    onClick={handleBeneficiaryList}
    >
      <span className="flex items-center">
        <img 
        className="icon-list-img"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
        <span className="ml-3 block truncate">
          {selectedBeneficiary ? selectedBeneficiary : "Select Beneficiary"}
        </span>
      </span>
      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
     
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </button>

{beneficiaryList && 
    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
   
      <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50" id="listbox-option-0" role="option"
      onClick={()=>handleBeneficiary("All")}
      >
        <div className="flex items-center">
          <img 
          className="icon-list-img"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
       
          <span className="font-normal ml-3 block truncate">
            All
          </span>
        </div>
{/* 
        <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
        
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ariaHidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span> */}
      </li>
      {
        benefistArray.map((benefits)=>{
          return (
            <li 
            onClick={()=>handleBeneficiary(benefits)}
            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:bg-purple-50" id="listbox-option-0" role="option">
              <div className="flex items-center">
                <img 
                className="icon-list-img"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ3LjAwMXB4IiBoZWlnaHQ9IjQ3LjAwMXB4IiB2aWV3Qm94PSIwIDAgNDcuMDAxIDQ3LjAwMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuMDAxIDQ3LjAwMTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGcgaWQ9IkxheWVyXzFfNzhfIj4NCgkJPGc+DQoJCQk8cGF0aCBkPSJNNDQuODQ1LDQyLjcxOEgyLjEzNkMwLjk1Niw0Mi43MTgsMCw0My42NzQsMCw0NC44NTVjMCwxLjE3OSwwLjk1NiwyLjEzNSwyLjEzNiwyLjEzNWg0Mi43MDgNCgkJCQljMS4xOCwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM1QzQ2Ljk3OSw0My42NzQsNDYuMDIzLDQyLjcxOCw0NC44NDUsNDIuNzE4eiIvPg0KCQkJPHBhdGggZD0iTTQuODA1LDM3LjE2NWMtMS4xOCwwLTIuMTM2LDAuOTU2LTIuMTM2LDIuMTM2czAuOTU2LDIuMTM3LDIuMTM2LDIuMTM3aDM3LjM3YzEuMTgsMCwyLjEzNi0wLjk1NywyLjEzNi0yLjEzNw0KCQkJCXMtMC45NTYtMi4xMzYtMi4xMzYtMi4xMzZoLTAuNTMzVjE3Ljk0NWgwLjUzM2MwLjU5MSwwLDEuMDY3LTAuNDc4LDEuMDY3LTEuMDY3cy0wLjQ3OC0xLjA2Ny0xLjA2Ny0xLjA2N0g0LjgwNQ0KCQkJCWMtMC41OSwwLTEuMDY3LDAuNDc4LTEuMDY3LDEuMDY3czAuNDc4LDEuMDY3LDEuMDY3LDEuMDY3aDAuNTM0djE5LjIxOUg0LjgwNXogTTM3LjM3LDE3Ljk0NXYxOS4yMTloLTYuNDA2VjE3Ljk0NUgzNy4zN3oNCgkJCQkgTTI2LjY5MiwxNy45NDV2MTkuMjE5aC02LjQwNlYxNy45NDVIMjYuNjkyeiBNOS42MDksMTcuOTQ1aDYuNDA2djE5LjIxOUg5LjYwOVYxNy45NDV6Ii8+DQoJCQk8cGF0aCBkPSJNMi4xMzYsMTMuODkxaDQyLjcwOGMwLjAwNywwLDAuMDE1LDAsMC4wMjEsMGMxLjE4MSwwLDIuMTM2LTAuOTU2LDIuMTM2LTIuMTM2YzAtMC45MzgtMC42MDQtMS43MzMtMS40NDMtMi4wMjENCgkJCQlsLTIxLjE5LTkuNTM1Yy0wLjU1Ny0wLjI1LTEuMTk0LTAuMjUtMS43NTIsMEwxLjI2LDkuODA4Yy0wLjkxOSwwLjQxNC0xLjQyNCwxLjQxMi0xLjIxMiwyLjM5Ng0KCQkJCUMwLjI1OSwxMy4xODgsMS4xMjksMTMuODkxLDIuMTM2LDEzLjg5MXoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
             
                <span className="font-normal ml-3 block truncate">
                  {benefits}
                </span>
              </div>
            </li>
          )
        })
      }

   
    </ul>
   }
  </div>

</div> 
{/* end of type of value */}
</div>    
{/* end of form */}

{filter ? <Card content={filter} user={user}/> : <section className="container mx-auto"><h3 className="text-center font-black text-4xl my-5">No values registered</h3></section>}


    
        </Layout>
    );
}

export default Tool;


export async function getStaticProps(context) {
    const res = await fetch(`https://api.airtable.com/v0/appgdwpFUOZEaSHzK/Value%20Generated`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AIRTABLE_KEY}`,
        }
    })
    const data = await res.json()
    
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {data}
    }
  }