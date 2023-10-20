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
  const [user, setUser, checkOffset, ] = useContext(ValueContext);
  const { visitedPages } = user;
  const [cardId, setCardId] = useState("");

  const handleNextPage = (offsetID) => {
    router.push({
      pathname: "/",
      query: { clientOffset: offsetID },
    });
  };


  const handleSelected = (item) => {
    const isFavorite = user.favorites.filter(
      (favorites) => favorites.id === item.id
    );
    if (isFavorite?.length > 0) {
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

  const sortedContent = [...content].sort((a, b) => {
    let dateA = new Date(a.fields["Source Date"]);
    let dateB = new Date(b.fields["Source Date"]);

    let dateAString = dateA.toLocaleDateString("en-US");
    let dateBString = dateB.toLocaleDateString("en-US");

    
    return dateBString.localeCompare(dateAString);
  });
  return (
    <>
      <section className="pagination flex flex-col my-5 ">
        <div className=" flex md:justify-between px-10 items-center justify-between ">
          <p className=" text-2xl">
            Showing <strong>{content?.length}</strong> success stories
          </p>
          <div className="flex justify-between gap-x-2">
          {visitedPages.map((offsetID, index) => (
            <button
            className={`${style["ob-background-buttons"]} btn px-3 py-2 rounded text-white`}
            onClick={() => handleNextPage(offsetID)}
          >
            {index+1}
            
          </button>
          ))}
          </div>
          
        </div>
        <AppliedFiltersLabels setInitialStates={setInitialStates} />

      </section>
      {/* end of pagination */}

      {/* Those are the result cards */}

      <div className="px-10">
        <div className="md:px-14 lg:px-0 card-container grid gap-4 xl:grid-cols-3 grid-cols-1 my-5 mb-20 ">
          {sortedContent?.length > 0 ? (
            sortedContent.map((item, index, array) => (
              <div
                id={item.id}
                key={index}
                className="card shadow-md rounded-md flex flex-col w-96gap-5 rounded py-5 px-5 md:mx-0 " /* onClick={()=>handleSelected(item)} */
              >
                {/* <p>{item.fields["Source date"]}</p> */}
                <div className="md:w-7/12 card-top flex justify-center lg:w-full mx-auto   ">
                  {/* <div className="flex  md:justify-end justify-center mb-5 mr-5">
                    <p className="bg-red-orange-dark text-white text-xs pt-2 pb-2 px-5 rounded">
                      {selectedTypeOfValue === "All"
                        ? item?.fields["Cluster Category"]
                        : selectedTypeOfValue}
                    </p>
                  </div> */}
                  {item.fields["Logo (from Fintech involved)"] ? (
                    <img
                      src={
                        item.fields["Logo (from Fintech involved)"][0]
                          .thumbnails.large.url
                      }
                      alt="Fintech logo"
                      className="h-20 "
                      crossOrigin="*"
                    />
                  ) : (
                    <img
                      src="../societyIcon.png"
                      alt="Fintech logo"
                      crossOrigin="*"
                      className="h-20"
                    />
                  )}
                </div>
                <div className="flex flex-col  ">
                  <p className="leading-relaxed text-sm md:text-2xl font-black text-main-color title-font mt-8">
                    {item.fields["Data point"] == ""
                      ? "numbers"
                      : item.fields["Data point"]}
                  </p>
                  <div className="leading-relaxed text-sm data-point my-5">
                    <ReactMarkdown
                      children={item.fields["Data point narrative"]}
                    />
                  </div>
                </div>
                

                <div
                  // className="md:w-6/12 card-bottom flex lg:w-full h-full items-end gap-x-11"
                  className="card-bottom w-full grid md:flex items-between gap-x-2  h-full items-end gap-y-1 flex-col md:flex-row "
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
                  <div
                    className={`${style["ob-background-buttons"]} w-full pr-2 text-white h-10 w-4/6 rounded text-xs flex items-center `}
                  >
                    <img src="./open-use-case.svg" className="pt-2 pl-1" />
                    <Link href={`${item.fields["Source link"]}`}>
                      {/* {item?.fields["Source link"]?.slice(0, 30)}... */}
                      <span className="md:hidden">Copy Use Case Source</span>
                      <span className="hidden md:block">Source</span>
                    </Link>
                  </div>
                  <div
                    className={`${style["ob-background-buttons"]} w-full pr-2 flex items-center text-white h-10 rounded text-xs w-4/6`}
                  >
                    <img src="./copy-in-slides.svg" className="pt-2 pl-1" />
                    <Link href="#" className="">
                      <span className="md:hidden">
                        Open it directly in your slides
                      </span>
                      <span className="hidden md:block">Slides</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container mx auto w-[500px]">
              <h1 className=" ">No Values</h1>
            </div>
          )}

          {/* end of card */}
        </div>
      </div>
    </>
  );
};

export default ToolsResults;
