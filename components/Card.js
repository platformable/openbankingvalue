import React, {useEffect,useState} from "react";
import Image from "next/image";

import efficiencyImg from "../public/efficiencyImg.png";
import networkImg from "../public/networkImg.png";
import revenueGrowthImg from "../public/revenueGrowthImg.png";
import financialHealthImg from "../public/financialHealthImg.png";
import increasedInnovationImg from "../public/increaseInnovationImg.png";
import reducedInequalityImg from "../public/reduceInequalityImg.png";
import allRegionsMap from '../public/allRegionsMap.png'

import africaMapImg from '../public/africaMapImg.png'
import europeMap from '../public/europeMap.png'
import apacMap from '../public/apacMap.png'
import northAmericaMap from '../public/northAmericaMap.png'
import southAmericaMap from '../public/southAmericaMap.png'
import allMaps from '../public/allMaps.png'

import socIcon from "../public/societyIcon.png";

const Card = ({
  content,
  user,
  offset,
  handleNextPage,
  handleBackPage,
  routerLocation,
  selectedRegion,
  selectedBeneficiary
}) => {
  const { selectedTypeOfValue } = user;

  console.log("selectedRegion",selectedRegion)
  const [valueImage,setValueImage]=useState(efficiencyImg)
  const [map,setMap]=useState(allMaps)

useEffect(() => {
  
  function getValueImage(){
    if(selectedTypeOfValue === "All"){
      setValueImage(efficiencyImg)
    }
  
    if(selectedTypeOfValue === "Efficiency/cost reduction"){
      setValueImage (efficiencyImg)
    }
  
    if(selectedTypeOfValue === "Network optimisation"){
      setValueImage (networkImg)
    }
  
    if(selectedTypeOfValue === "Revenue growth"){
      setValueImage (revenueGrowthImg)
    }
  
    if(selectedTypeOfValue === "Financial health of customers"){
      setValueImage (financialHealthImg)
    }
  
    if(selectedTypeOfValue === "Increased innovation"){
      setValueImage (increasedInnovationImg)
    }
  
    if(selectedTypeOfValue === "Reduced Inequality"){
      setValueImage (reducedInequalityImg)
    }
    }
  
    getValueImage()

    function getMapImage(){
      if(selectedRegion === "All"){
   
        setMap(allMaps)
      }
    
      if(selectedRegion === "Africa"){
        setMap(africaMapImg)
      }
    
      if(selectedRegion === "UK"){
        setMap(europeMap)
      }
    
      if(selectedRegion === "APAC"){
        setMap(apacMap)
      }
    
      if(selectedRegion === "North America"){
        setMap(northAmericaMap)
      }
    
      if(selectedRegion === "Latin America"){
        setMap(southAmericaMap)
      }
      }
    
      getMapImage()
}, [selectedTypeOfValue, map,selectedRegion]);

  

  return (
    <>
      {content.length === 0 ? (
        <section className="container mx-auto">
          <h3 className="text-center font-black text-4xl my-5">
            No values registered
          </h3>
        </section>
      ) : (
        <>
          <section className="bg-gray-50 md:py-20 py-10">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:px-0 px-5">

                <div class="grid-item">
                  <div class="gridImg grid justify-center img-thumbnail">
                  <Image src={valueImage} alt="platformable" />
                  </div>

                  <h3 className="text-center my-5 text-2xl">{selectedTypeOfValue === "All" ? "All Values" : selectedTypeOfValue}</h3>
                  <p className="text-xs px-10">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Est, ad! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae.
                  </p>
                </div>

                <div class="grid-item">
                  <div class="gridImg grid justify-center img-thumbnail">
                  <Image src={map} alt="platformable" />
                  </div>

                  <h3 className="text-center my-5 text-2xl">{selectedRegion === "" || selectedRegion === "All" ? "All Regions" : selectedRegion}</h3>
                  <p className="text-xs px-10">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Est, ad! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quia.
                  </p>
                </div>

                <div class="grid-item">
                  <div class="gridImg grid justify-center img-thumbnail">
                  <Image src={valueImage} alt="platformable" />
                  </div>

                  <h3 className="text-center my-5 text-2xl">{selectedBeneficiary === "" || selectedBeneficiary === "All" ? "All Beneficiaries" : selectedBeneficiary}</h3>
                  <p className="text-xs px-10">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Est, ad! Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quia.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PAGINATION */}
          <section className="text-gray-600 body-font cards">
            <div className="container py-10 mx-auto">
              {offset !== "" && routerLocation == "/tool" ? (
                ""
              ) : (
                <button
                  onClick={() => handleBackPage()}
                  className="inline-flex text-xs text-red-orange-dark  border-0 py-2 px-6 focus:outline-none  rounded mr-2"
                >
                  Prev Page
                </button>
              )}
              {offset !== "" && content.length >= 99 ? (
                <button
                  onClick={() => handleNextPage()}
                  className="inline-flex text-xs text-red-orange-dark   border-0 py-2 px-6 focus:outline-none  rounded "
                >
                  Next Page
                </button>
              ) : (
                ""
              )}
              <div className="flex flex-col text-center w-full mb-20">
               
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-russian-violet-500 font-black">
                  Value Cards
                </h1>
                
              </div>
              <div className="flex flex-wrap -m-4">
                {content.map((item, index) => {
                  return (
                    <div className="p-4 md:w-1/3" key={index}>
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col ">
                        <div className="flex  items-stretch bg-reg-50 justify-end mb-5"> 
                         <p className="bg-red-orange-dark hover:bg-blue-700 text-white text-xs py-1 px-5 rounded">{selectedTypeOfValue === "All" ? item.fields['Cluster Category'][0] : selectedTypeOfValue }</p>
                         </div>
                        <div className="flex-grow">
                          <p className="leading-relaxed text-3xl font-black text-main-color text-center break-words title-font">
                            {item.fields["Data point"] == ""
                              ? "numbers"
                              : item.fields["Data point"]}
                          </p>
                          <p className="leading-relaxed text-sm break-words">
                            {item.fields["Data point narrative"]}
                          </p>
                        </div>

                      <div className="cards-bottom flex justify-between mt-5">
                        <div className="cards-logo">
                          
                       {/*  {item.fields["Logo (from Fintech involved)"] ? item.fields["Logo (from Fintech involved)"][0].thumbnails.small.url : "nojoda"} */}
                        <Image src={item.fields["Logo (from Fintech involved)"] ? item.fields["Logo (from Fintech involved)"][0].thumbnails.small.url : socIcon}
                        
                        width={item.fields["Logo (from Fintech involved)"] ? parseInt(item.fields["Logo (from Fintech involved)"][0].thumbnails.small.width) : 36}
                        height={item.fields["Logo (from Fintech involved)"] ? parseInt(item.fields["Logo (from Fintech involved)"][0].thumbnails.small.height) : 36}
                       /*  width={36}
                        height={36} */
                        /> 
                        </div>
                        <div className="cards-map">
                       <Image src={allRegionsMap} alt="PLatformable"/>
                        </div>
                      </div>
        
                        <div>
                          <a
                            href={`${item.fields["Source link"]}`}
                            className="text-sm"
                          >
                            Source Link
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Card;
