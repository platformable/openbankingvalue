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
  const { selectedTypeOfValue } = user;
  const [cardId, setCardId] = useState("");

  // console.log("content", content)
  const handleNextPage = () => {
    router.push({
      pathname: "/",
      query: { clientOffset: clientOffset },
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

  return (
    <>
      {/* <HeroResume
        selectedTypeOfValue={selectedTypeOfValue}
        user={user}
      /> */}

      <section className="pagination flex flex-col my-5 mb-20">
        <AppliedFiltersLabels />
        <div className=" flex md:justify-between px-10 items-center justify-center">
          <p className=" text-2xl">
            Showing <strong>{content?.length}</strong> success stories
          </p>
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

      <div className=" px-14 ">
        <div className="card-container grid gap-4 xl:grid-cols-3 grid-cols-1 my-5 mb-20">
          {content?.length > 0 ? (
            content.map((item, index, array) => (
              <div
                id={item.id}
                key={index}
                className="card shadow-md rounded-md flex flex-col  gap-5 rounded py-5 px-5 md:mx-0 mx-5" /* onClick={()=>handleSelected(item)} */
              >
                <div className="card-top flex justify-center w-full">
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
                      className="h-20"
                      crossOrigin="*"
                    />
                  ) : (
                    <img src="../societyIcon.png" alt="Fintech logo" crossOrigin="*" className="h-20"/>
                  )}
                </div>
                <div className="flex flex-col ">
                  <p className="leading-relaxed text-sm md:text-2xl font-black text-main-color title-font">
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
                {/* <div className="cards-bottom flex justify-between mt-5">
                  <div className="cards-logo">
                    {item.fields["Logo (from Fintech involved)"] ? (
                      <img
                        src={
                          item.fields["Logo (from Fintech involved)"][0]
                            .thumbnails.large.url
                        }
                        alt=""
                        crossOrigin="*"
                      />
                    ) : (
                      <img src="../societyIcon.png" alt="" crossOrigin="*" />
                    )}
                  </div>
                  <div className="cards-map">
                    <img
                      src="../allRegMap.png"
                      alt=""
                      crossOrigin="anonymous"
                    />
                  </div>
                </div> */}

                <div
                  className='card-bottom flex w-full h-full items-end'
                  data-html2canvas-ignore
                >
                  <div className="bg-purple-100 flex items-center p-2 rounded-l-md">
                    <img
                      src="./downloadIcon.png"
                      alt=""
                      width="29"
                      height={29}
                      className="cursor-pointer"
                      onClick={() => handleDownloadImage(item)}
                    />
                  </div>
                  <div className="text-white bg-dark-blue h-10 w-full overflow-hidden text-xs flex items-center py-1 px-2 rounded-r-md">
                  <Link
                    href={`${item.fields["Source link"]}`}
                    className=""
                  >
                    {item?.fields["Source link"]?.slice(0,30)}...
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
