import Image from "next/image";
import { useState, useEffect } from "react";

import efficiencyImg from "../public/efficiencyImg.png";
import networkImg from "../public/networkImg.png";
import revenueGrowthImg from "../public/revenueGrowthImg.png";
import financialHealthImg from "../public/financialHealthImg.png";
import increasedInnovationImg from "../public/increaseInnovationImg.png";
import reducedInequalityImg from "../public/reduceInequalityImg.png";
import allRegionsMap from "../public/allRegMap.png";
import africaMapImg from "../public/africaMapImg.png";
import europeMap from "../public/europeMap.png";
import apacMap from "../public/apacMap.png";
import northAmericaMap from "../public/northAmericaMap.png";
import southAmericaMap from "../public/southAmericaMap.png";
import allMaps from "../public/allRegMap.png";


export const  HeroResume = ({
    selectedTypeOfValue,
    selectedRegion,
    selectedBeneficiary,
    user,
  }) => {
  
    const [valueImage, setValueImage] = useState(efficiencyImg);
    const [map, setMap] = useState(allMaps);
    
  
    useEffect(() => {
      function getValueImage() {
        if (selectedTypeOfValue === "All") {
          setValueImage(efficiencyImg);
        }
  
        if (selectedTypeOfValue === "Efficiency/cost reduction") {
          setValueImage(efficiencyImg);
        }
  
        if (selectedTypeOfValue === "Network optimisation") {
          setValueImage(networkImg);
        }
  
        if (selectedTypeOfValue === "Revenue growth") {
          setValueImage(revenueGrowthImg);
        }
  
        if (selectedTypeOfValue === "Financial health of customers") {
          setValueImage(financialHealthImg);
        }
  
        if (selectedTypeOfValue === "Increased innovation") {
          setValueImage(increasedInnovationImg);
        }
  
        if (selectedTypeOfValue === "Reduced Inequality") {
          setValueImage(reducedInequalityImg);
        }
      }
  
      getValueImage();
  
      function getMapImage() {
        if (selectedRegion === "All") {
          setMap(allMaps);
        }
  
        if (selectedRegion === "Africa") {
          setMap(africaMapImg);
        }
  
        if (selectedRegion === "UK") {
          setMap(europeMap);
        }
  
        if (selectedRegion === "APAC") {
          setMap(apacMap);
        }
  
        if (selectedRegion === "North America") {
          setMap(northAmericaMap);
        }
  
        if (selectedRegion === "Latin America") {
          setMap(southAmericaMap);
        }
      }
  
      getMapImage();
    }, [selectedTypeOfValue, map, selectedRegion, user.favorites]);
    return (
      <section className="bg-gray-50 md:py-20 py-10 w-full">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:px-0 px-5">
            <div className="grid-item">
              <div className="gridImg grid justify-center img-thumbnail">
                <Image  src={valueImage} alt="platformable" />
              </div>
              <h3 className="text-center my-5 text-2xl text-russian-violet-dark ">
                {user?.typeOfValues['all'] 
                  ? "All Values"
                  : selectedTypeOfValue}
              </h3>
              {/* <p className="text-xs px-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est,
            ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae.
          </p> */}
            </div>
            <div className="grid-item">
              <div className="gridImg grid justify-center img-thumbnail">
                <Image  src={map} alt="platformable" />
              </div>
  
              <h3 className="text-center my-5 text-2xl">
                {selectedRegion?.all ? "All Regions" : "Select Region"}
              </h3>
              {/* <p className="text-xs px-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est,
            ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae, quia.
          </p> */}
            </div>
  
            <div className="grid-item">
              <div className="gridImg grid justify-center img-thumbnail">
                <Image  src={valueImage} alt="platformable" />
              </div>
  
              <h3 className="text-center my-5 text-2xl">
                {selectedBeneficiary === "" || selectedBeneficiary === "All"
                  ? "All Beneficiaries"
                  : selectedBeneficiary}
              </h3>
              {/* <p className="text-xs px-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est,
            ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae, quia.
          </p> */}
            </div>
          </div>
        </div>
      </section>
    );
  };