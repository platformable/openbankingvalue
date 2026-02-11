import Link from "next/link"
import ReactMarkdown from "react-markdown"

const ToolsResults = ({ content }) => {
  // const router = useRouter();

  return (
    <>
      {/* Those are the result cards */}

      <div className="">
        <div className="md:px-14 lg:px-0 card-container grid gap-4 xl:grid-cols-3 grid-cols-1 md:grid-cols-2 my-5 mb-20 ">
          {content?.length > 0 ? (
            content?.map((item, index, array) => {
              const entityLogo = item?.EntityLogo
                ? JSON.parse(item.EntityLogo)
                : null
              return (
                <div
                  id={`${item.Autonumber}`}
                  key={index}
                  className="card-wrapper card shadow-xl md:shadow-md rounded-md flex flex-col  gap-5 rounded py-5 px-5 md:mx-0 " /* onClick={()=>handleSelected(item)} */
                >
                  {/* <p>{item?.["Source date"]}</p> */}
                  <div className="card-top flex justify-center  mx-auto">
                    {/* <div className="flex  md:justify-end justify-center mb-5 mr-5">
                    <p className="bg-red-orange-dark text-white text-xs pt-2 pb-2 px-5 rounded">
                      {selectedTypeOfValue === "All"
                        ? item?.fields["Cluster Category"]
                        : selectedTypeOfValue}
                    </p>
                  </div> */}
                    {entityLogo?.[0] ? (
                      <div className="h-14 flex items-center justify-center">
                        <img
                          src={entityLogo?.[0]?.url}
                          alt="Entity logo"
                          className="object-scale-down max-w-16 max-h-14"
                          crossOrigin="*"
                        />
                      </div>
                    ) : (
                      <div className="h-14 flex items-center justify-center">
                        <img
                          src="/no_logo.svg"
                          alt="Entity logo"
                          crossOrigin="*"
                          className="object-scale-down max-w-16 max-h-14"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col  mt-4">
                    <p className="leading-relaxed text-sm md:text-2xl font-black text-main-color title-font ">
                      {item?.["DataPoint"] == "" ? "" : item?.["DataPoint"]}
                    </p>
                    <div className="leading-relaxed text-sm data-point my-5">
                      <ReactMarkdown children={item?.["DataPointNarrative"]} />
                    </div>
                  </div>

                  <div
                    // className="md:w-6/12 card-bottom flex lg:w-full h-full items-end gap-x-11"
                    className="card-bottom w-full grid items-between gap-x-2  h-full items-end gap-y-1 flex-col grid-cols-2 "
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
                      href={`${item?.["SourceLink"] || "#"}`}
                      target="_blank"
                    >
                      <div
                        className={`bg-[var(--purple-medium)] w-full pr-2 text-white h-10 w-4/6 rounded text-xs flex items-center `}
                      >
                        <img
                          src="./open-use-case.svg"
                          alt="source link icon"
                          className="pt-2 pl-1"
                        />
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
                        <img
                          src="./copy-in-slides.svg"
                          alt="open slide icon"
                          className="pt-2 pl-1"
                        />

                        <span className="hidden md:inline-block">
                          Open as a slide
                        </span>
                        <span className="md:hidden">Slides</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="container mx auto w-[500px]">
              <span className="">No Values</span>
            </div>
          )}

          {/* end of card */}
        </div>
      </div>
    </>
  )
}

export default ToolsResults
