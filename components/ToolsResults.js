import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import html2canvas from "html2canvas";
import { HeroResume } from "./HeroResume";

import { ValueContext } from "../context/valueContext";

import socIcon from "../public/societyIcon.png";
import AppliedFiltersLabels from "./AppliedFiltersLabels";

const ToolsResults = ({
  content,
  clientOffset,
  pagination,
  handleBackPage,
  routerLocation,
}) => {
  const router = useRouter();
  const [user, setUser] = useContext(ValueContext);
  const [isHidden, setIsHidden] = useState(false);
  const { selectedTypeOfValue } = user;
  const [cardId, setCardId] = useState("");

  
// console.log("content", content)
  const handleNextPage = () => {
    router.push({
      pathname: "/tools",
      query: { clientOffset: clientOffset },
    });
  };

  const handleSelected = (item) => {
    const isFavorite = user.favorites.filter(
      (favorites) => favorites.id === item.id
    );
    if (isFavorite.length > 0) {
      const result = user.favorites.filter(
        (favorites) => favorites.id !== item.id
      );
      setUser({ ...user, favorites: result });
    } else {
      setUser({ ...user, favorites: [...user.favorites, item] });
    }
  };
  const printRef = React.useRef();

  const handleDownloadImage = async (element) => {
    const item = document.getElementById(element.id);
    const canvas = await html2canvas(item, { allowTaint: true, useCORS: true });

    const data = canvas.toDataURL("image/png", 1);
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "card.png";
      link.click();
    } else {
      window.open(data);
    }
  };

  return (
    <>
      

      {/* <HeroResume
        selectedTypeOfValue={selectedTypeOfValue}
        user={user}
      /> */}

      <section className="pagination my-5 mb-20">
        <AppliedFiltersLabels />
        <div className="container mx-auto flex md:justify-between px-10 items-center justify-center">
          <p className=" text-2xl">Showing  <strong>{content?.length}</strong> success stories</p>
          {pagination ? (
            <button
              className="btn bg-red-orange-dark px-5 py-2 rounded text-white"
              onClick={() => handleNextPage()}
            >
              {" "}
              Load more
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

      <div className="container mx-auto px-14 ">
        <div className="card-container grid gap-4 md:grid-cols-3 grid-cols-1 my-5">
          {content.length > 0 ? content.map((item, index, array) =>  (
              <div
                id={item.id}
                key={index}
                className="card bg-gray-100 rounded py-5 flex flex-col  px-5 md:mx-0 mx-5" /* onClick={()=>handleSelected(item)} */
              >
                <div className="card-top">
                  <div className="flex  md:justify-end justify-center mb-5 mr-5">
                    <p className="bg-red-orange-dark text-white text-xs pt-2 pb-2 px-5 rounded">
                      {selectedTypeOfValue === "All"
                        ? item?.fields["Cluster Category"]
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
                  <div className="leading-relaxed text-sm px-5 data-point my-3">
                    <ReactMarkdown
                      children={item.fields["Data point narrative"]}
                    />
                  </div>
                </div>
                <div className="cards-bottom flex justify-between mt-5">
                  <div className="cards-logo">
                    {item.fields["Logo (from Fintech involved)"] ? (
                      <img
                        src={
                          item.fields["Logo (from Fintech involved)"][0]
                            .thumbnails.large.url
                        }
                        alt=""
                        crossorigin="*"
                      />
                    ) : (
                      <img src="../societyIcon.png" alt="" crossorigin="*" />
                    )}
                  </div>
                  <div className="cards-map">
                    <img
                      src="../allRegMap.png"
                      alt=""
                      crossorigin="anonymous"
                    />
                  </div>
                </div>

                <div
                  className={`flex justify-between mt-2 ${
                    isHidden ? "invisible" : ""
                  }`}
                  data-html2canvas-ignore
                >
                  <Link
                    href={`${item.fields["Source link"]}`}
                    className="text-xs"
                  >
                    Source link
                  </Link>
                  <div>
                    <img
                      src="./downloadIcon.png"
                      alt=""
                      width="16"
                      className="cursor-pointer"
                      onClick={() => handleDownloadImage(item)}
                    />
                  </div>
                </div>
              </div>
            )
          ):
          <div className="container mx auto w-[500px]">
            <h1 className=" ">No Values</h1>
          </div>
          }
          
          {/* end of card */}
        </div>
      </div>
    </>
  );
};

export default ToolsResults;
