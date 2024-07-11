import React, { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ReactMarkdown from "react-markdown";
import html2canvas from "html2canvas";
import { HeroResume } from "./HeroResume";

import { ValueContext } from "../context/valueContext";

import socIcon from "../public/societyIcon.png";
import AppliedFiltersLabels from "./AppliedFiltersLabels";

import style from "../styles/Tools.module.css";

//I didnt install the formatter yet, i thought i would ask u first
// const { format } = require("date-fns");

const ToolsResults = ({
  content,
  handleBackPage,
  routerLocation,
  setInitialStates,
}) => {
  const router = useRouter();
  const [user, setUser] = useContext(ValueContext);
  const { visitedPages } = user;

  const handleNextPage = (offsetID) => {
    router.push({
      pathname: "/",
      query: offsetID ? { clientOffset: offsetID } : null,
    });
  };
  

  const printRef = React.useRef();

  // const handleDownloadImage = async (element) => {

  //   const item = document.getElementById(element.id);
  //   const canvas = await html2canvas(item, { allowTaint: true, useCORS: true });

  //   const data = canvas.toDataURL("image/png", 1);
  //   const link = document.createElement("a");

  //   if (typeof link.download === "string") {
  //     link.href = data;
  //     link.download = "card.png";
  //     link.click();
  //   } else {
  //     window.open(data);
  //   }
  // };

  return (
    <>
      
      {/* Those are the result cards */}

      <div className="">
        <div className="md:px-14 lg:px-0 card-container grid gap-4 xl:grid-cols-3 grid-cols-1 my-5 mb-20 ">
          {content?.length > 0 ? (
            content.map((item, index, array) => 
              {
                return(
                  <div
                id={item.id}
                key={index}
                className="card shadow-md rounded-md flex flex-col  gap-5 rounded py-5 px-5 md:mx-0 " /* onClick={()=>handleSelected(item)} */
              >
                {/* <p>{item?.["Source date"]}</p> */}
                <div className="card-top flex justify-center  mx-auto   ">
                  {/* <div className="flex  md:justify-end justify-center mb-5 mr-5">
                    <p className="bg-red-orange-dark text-white text-xs pt-2 pb-2 px-5 rounded">
                      {selectedTypeOfValue === "All"
                        ? item?.fields["Cluster Category"]
                        : selectedTypeOfValue}
                    </p>
                  </div> */}
                  {item?.["Logo (from Fintech involved)"] ||
                  item?.["Logo (from Banks involved)"] ? (
                    <img
                      src={
                        item?.["Logo (from Banks involved)"]?.[0]
                          .thumbnails.large.url ||
                        item?.["Logo (from Fintech involved)"]?.[0]
                          .thumbnails.large.url
                      }
                      alt="Fintech logo"
                      className="h-20"
                      crossOrigin="*"
                    />
                  ) : (
                    <img
                      src="/no_logo.svg"
                      alt="Fintech logo"
                      crossOrigin="*"
                      className="h-20"
                    />
                  )}
                </div>
                <div className="flex flex-col  ">
                  <p className="leading-relaxed text-sm md:text-2xl font-black text-main-color title-font mt-8">
                    {item?.["DataPoint"] == ""
                      ? "numbers"
                      : item?.["DataPoint"]}
                  </p>
                  <div className="leading-relaxed text-sm data-point my-5">
                    <ReactMarkdown
                      children={item?.["DataPointNarrative"]}
                    />
                  </div>
                </div>

                <div
                  // className="md:w-6/12 card-bottom flex lg:w-full h-full items-end gap-x-11"
                  className="card-bottom w-full grid items-between gap-x-2  h-full items-end gap-y-1 flex-col md:grid-cols-2 "
                  data-html2canvas-ignore
                >
                  {/* <div
                    className={`${style["ob-background-buttons"]}  pr-2 flex w-full  h-10 text-xs w-4/6 items-center  rounded text-white cursor-pointer`}
                  >
                    <img src="./open-in-slide.svg" className="pt-2 pl-1" />
                    <a
                      className="md:hidden"
                      onClick={() => handleDownloadImage(item)}
                    >
                      Copy Use Case card as png{" "}
                    </a>
                    <p className="hidden md:block">PNG</p>
                  </div> */}

                  {/* <img
                      src="./downloadIcon.png"
                      alt=""
                      width="29"
                      height={29}
                      className="cursor-pointer"
                      onClick={() => handleDownloadImage(item)}
                    /> */}

                  <Link
                    href={`${item?.["SourceLink"] || '#'}`}
                    target="_blank"
                  >
                    <div
                      className={`bg-[var(--purple-medium)] w-full pr-2 text-white h-10 w-4/6 rounded text-xs flex items-center `}
                    >
                      <img src="./open-use-case.svg" className="pt-2 pl-1" />
                      {/* {item?.fields["SourceLink"]?.slice(0, 30)}... */}
                      <span className="hidden md:inline-block">
                        Source link
                      </span>
                      <span className="md:hidden">Source</span>
                    </div>
                  </Link>

                  <Link
                    href={item?.["DownloadLink"] || "#"}
                    target="_blank"
                    className=""
                  >
                    <div
                      className={`bg-[var(--purple-medium)] w-full pr-2 flex items-center text-white h-10 rounded text-xs w-4/6`}
                    >
                      <img src="./copy-in-slides.svg" className="pt-2 pl-1" />

                      <span className="hidden md:inline-block">
                        Open as a slide
                      </span>
                      <span className="md:hidden">Slides</span>
                    </div>
                  </Link>
                </div>
              </div>
                )
              }
            )
          ) : (
            <div className="container mx auto w-[500px]">
              <h1 className=" ">No Values</h1>
            </div>
          )}

          {/* end of card */}
        </div>
        {/* <div className={`flex flex-1  p-3 pr-0 justify-center gap-x-2`}>
          {visitedPages.map((offsetID, index) => (
            <button
              className={`${
                visitedPages.indexOf(router?.query?.clientOffset || "") ===
                index
                  ? "bg-[#9978F0]"
                  : "bg-[var(--purple-medium)]"
              }  btn w-10 py-2 rounded text-white`}
              onClick={() => handleNextPage(offsetID)}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default ToolsResults;
