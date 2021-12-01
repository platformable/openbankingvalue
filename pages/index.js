import React, { useContext,useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { ValueContext } from "../context/valueContext";

import heroImg from "../public/heroImg.png";
import efficiencyImg from "../public/efficiencyImg.png";
import networkImg from "../public/networkImg.png";
import revenueGrowthImg from "../public/revenueGrowthImg.png";
import financialHealthImg from "../public/financialHealthImg.png";
import increasedInnovationImg from "../public/increaseInnovationImg.png";
import reducedInequalityImg from "../public/reduceInequalityImg.png";

export default function Home({ data }) {
  const allData = data.records;


  const router = useRouter();
  const [user, setUser] = useContext(ValueContext);

  let {selectedTypeOfValue} =user;

  function handleValue(value, url) {
   
    setUser({ ...user, selectedTypeOfValue: value });
    typeof window !== undefined && window.localStorage.setItem("value",value)
    typeof window !== undefined && window.localStorage.setItem("region","All")
    typeof window !== undefined && window.localStorage.setItem("beneficiary","All")
    router.push(url);
  }




  /* GET category custers CLEAN LIST */
  const allCategories = new Set([]);
  const getCategories = data.records.map((record) => {
    allCategories.add(record.fields["Cluster Category"]);
  });

  const categoryArray = Array.from(allCategories);
  const joinCategories = categoryArray.join();
  const separatedCategories = joinCategories.split(",");

  let typeOfValues = [...new Set(separatedCategories)];



  /* GET regions CLEAN LIST */
  const allRegions = new Set([]);
  const getRegions = data.records.map((record) => {
    allRegions.add(record.fields["Region (from Country)"]);
  });

  const regionArray = Array.from(allRegions);
  const joinRegions = regionArray.join();
  const separatedRegions = joinRegions.split(",");

  let regions = [...new Set(separatedRegions)];

  return (
    <Layout>
      <Head>
        <title>Platformable Value Generated Tool</title>
        <meta name="description" content="Platformable Value Generated Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-black ">
              Open Banking Value Tool
            </h1>
            <p className="mb-8 leading-relaxed text-2xl">
              What evidence do we have that open banking is creating benefits
              for the banks that open APIs?
            </p>
            {/*   <div className="flex justify-center">
              <button className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                <Link href="/tool">Learn More</Link>
              </button>
            </div> */}
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image src={heroImg} alt="OBV__OBV_tool_isometric" />
          </div>
        </div>
      </section>

      <section className="home-typeOfValue bg-gray-50 py-10">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-base text-russian-violet-500 font-semibold tracking-wide ">
              Select
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-russian-violet-dark sm:text-4xl">
              Type of value
            </p>
          </div>
          <button
            onClick={() => handleValue("All", "/tools")}
            className="btn bg-purple-500 rounded-xl text-white px-10 py-5"
          >
            All
          </button>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 justify-center md:px-0 px-5">

            <div
              className="grid justify-center bg-white p-10 shadow-md rounded-lg cursor-pointer"
              onClick={() => handleValue("Efficiency/cost reduction", "/tools")}
            >
              <div className="img-thumbnail grid justify-center">
                <Image src={efficiencyImg} alt="platformable" />
              </div>

              <h3 className="text-center font-black text-2xl ">
                  Efficiency / Cost reduction
                </h3>
            </div>

            <div
              className="grid justify-center bg-white p-10 shadow-md rounded-lg cursor-pointer"
              onClick={() => handleValue("Network optimisation", "/tools")}
            >
              <div className="img-thumbnail grid justify-center ">
                <Image
                  src={networkImg}
                  alt="platformable"
                  className="img-thumbnail"
                />
              </div>
              <h3 className="text-center font-black text-2xl">
                  Network optimisation
                </h3>
            </div>

            <div
              className="grid justify-center bg-white p-10 shadow-md rounded-lg cursor-pointer"
              onClick={() => handleValue("Revenue growth", "/tools")}
            >
              <div className="img-thumbnail grid justify-center ">
                <Image
                  src={revenueGrowthImg}
                  alt="platformable"
                  className="img-thumbnail"
                />
               
              </div>
              <h3 className="text-center font-black text-2xl">
                  Revenue growth
                </h3>
            </div>
            <div
              className="grid justify-center bg-white p-10 shadow-md rounded-lg cursor-pointer"
              onClick={() =>
                handleValue("Financial health of customers", "/tools")
              }
            >
              <div className="img-thumbnail grid justify-center ">
                <Image
                  src={financialHealthImg}
                  alt="platformable"
                  className="img-thumbnail"
                />
                
              </div>
              <h3 className="text-center font-black text-2xl">
                  Financial health of customers
                </h3>
            </div>
            <div
              className="grid justify-center bg-white p-10 shadow-md rounded-lg cursor-pointer"
              onClick={() =>
                handleValue("increased innovation", "/tools")
              }
            >
              <div className="img-thumbnail grid justify-center ">
                <Image
                  src={increasedInnovationImg}
                  alt="platformable"
                  className="img-thumbnail"
                />
                
              </div>
              <h3 className="text-center font-black text-2xl">
                  Increased innovation
                </h3>
            </div>
            <div
              className="grid justify-center bg-white p-10 shadow-md rounded-lg cursor-pointer"
              onClick={() => handleValue("Reduced inequality", "/tools")}
            >
              <div className="img-thumbnail grid justify-center ">
                <Image
                  src={reducedInequalityImg}
                  alt="platformable"
                  className="img-thumbnail"
                />
               
              </div>
              <h3 className="text-center font-black text-2xl">
                  Reduced inequality
                </h3>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated`,
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
