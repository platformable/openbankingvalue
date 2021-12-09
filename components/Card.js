import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import efficiencyImg from "../public/efficiencyImg.png";
import networkImg from "../public/networkImg.png";
import revenueGrowthImg from "../public/revenueGrowthImg.png";
import financialHealthImg from "../public/financialHealthImg.png";
import increasedInnovationImg from "../public/increaseInnovationImg.png";
import reducedInequalityImg from "../public/reduceInequalityImg.png";
import allRegionsMap from "../public/allRegionsMap.png";
import africaMapImg from "../public/africaMapImg.png";
import europeMap from "../public/europeMap.png";
import apacMap from "../public/apacMap.png";
import northAmericaMap from "../public/northAmericaMap.png";
import southAmericaMap from "../public/southAmericaMap.png";
import allMaps from "../public/allRegMap.png";
import ReactMarkdown from "react-markdown";

import { ValueContext } from "../context/valueContext";

import socIcon from "../public/societyIcon.png";

const Card = ({
  content,
  clientOffset,
  pagination,
  handleBackPage,
  routerLocation,
  selectedRegion,
  selectedBeneficiary,
}) => {
  const router = useRouter();
  const [user, setUser] = useContext(ValueContext);
  const { selectedTypeOfValue } = user;

  const [valueImage, setValueImage] = useState(efficiencyImg);
  const [map, setMap] = useState(allMaps);

  const handleNextPage = () => {
    router.push({
      pathname: "/tools",
      query: { clientOffset: clientOffset },
    });
  };

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
    <>

      {content?.length === 0 ? (
        <section className="container mx-auto">
          <h3 className="text-center font-black text-russian-violet-dark  text-4xl my-5">
            No values registered
          </h3>
        </section>
      ) : (
        ""
      )}

      <section className="bg-gray-50 md:py-20 py-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 md:px-0 px-5">
            <div class="grid-item">
              <div class="gridImg grid justify-center img-thumbnail">
                <Image src={valueImage} alt="platformable" />
              </div>
              <h3 className="text-center my-5 text-2xl text-russian-violet-dark ">
                {selectedTypeOfValue === "All"
                  ? "All Values"
                  : selectedTypeOfValue}
              </h3>
              <p className="text-xs px-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est,
                ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae.
              </p>
            </div>
            <div class="grid-item">
              <div class="gridImg grid justify-center img-thumbnail">
                <Image src={map} alt="platformable" />
              </div>

              <h3 className="text-center my-5 text-2xl">
                {selectedRegion === "" || selectedRegion === "All"
                  ? "All Regions"
                  : selectedRegion}
              </h3>
              <p className="text-xs px-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est,
                ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, quia.
              </p>
            </div>

            <div class="grid-item">
              <div class="gridImg grid justify-center img-thumbnail">
                <Image src={valueImage} alt="platformable" />
              </div>

              <h3 className="text-center my-5 text-2xl">
                {selectedBeneficiary === "" || selectedBeneficiary === "All"
                  ? "All Beneficiaries"
                  : selectedBeneficiary}
              </h3>
              <p className="text-xs px-10">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est,
                ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, quia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pagination my-5">
        <div className="container mx-auto flex md:justify-end justify-center">
          {pagination ? (
            <button
              className="btn bg-red-orange-dark px-5 py-2 rounded text-white"
              onClick={() => handleNextPage()}
            >
              {" "}
              Next
            </button>
          ) : (
            ""
          )}
          {pagination == null ? (
            <button
              className="btn bg-red-orange-dark px-5 py-2 rounded text-white"
              onClick={() => router.back()}
            >
              {" "}
              Back
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
      {/* end of pagination */}

      <div className="container mx-auto">
        <div className="card-container grid gap-4 md:grid-cols-3 grid-cols-1 my-5">
          {content?.map((item, index) => {
            return (
              <div className="card bg-gray-100 rounded py-5 flex flex-col px-5 md:mx-0 mx-5">
                <div className="card-top">
                  <div className="flex  md:justify-end justify-center mb-5 mr-5">
                    <p className="bg-red-orange-dark text-white text-xs py-1 px-5 rounded">
                      {selectedTypeOfValue === "All"
                        ? item?.fields["Cluster Category"][0]
                        : selectedTypeOfValue}
                    </p>
                  </div>
                </div>
                <div className="flex flex-grow flex-col">
                  <p className="leading-relaxed text-sm md:text-3xl font-black text-main-color text-center  title-font">
                    {item.fields["Data point"] == ""
                      ? "numbers"
                      : item.fields["Data point"]}
                  </p>
                  <p className="leading-relaxed text-sm px-5 data-point my-3">
                  <ReactMarkdown children={item.fields["Data point narrative"]}  />  
          {/*         {item.fields["Data point narrative"]} */}
                  </p>
                </div>
                <div className="cards-bottom flex justify-between mt-5">
                  <div className="cards-logo">
                    <Image
                      src={
                        item.fields["Logo (from Fintech involved)"]
                          ? item.fields["Logo (from Fintech involved)"][0]
                              .thumbnails.small.url
                          : socIcon
                      }
                      width={
                        item.fields["Logo (from Fintech involved)"]
                          ? parseInt(
                              item.fields["Logo (from Fintech involved)"][0]
                                .thumbnails.small.width
                            )
                          : 36
                      }
                      height={
                        item.fields["Logo (from Fintech involved)"]
                          ? parseInt(
                              item.fields["Logo (from Fintech involved)"][0]
                                .thumbnails.small.height
                            )
                          : 36
                      }
                    />
                  </div>
                  <div className="cards-map">
                    <Image src={allRegionsMap} alt="PLatformable" />
                  </div>
                </div>
                <div>
                  <a href={`${item.fields["Source link"]}`} className="text-xs">
                    Source Link
                  </a>
                </div>
              </div>
            );
          })}
          {/* end of card */}
        </div>
      </div>
    </>
  );
};

export default Card;
