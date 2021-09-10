import React, { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "../context/userContext";
import { ValueContext } from "../context/valueContext";

export default function Home({ data }) {
  const allData = data.records;

  const router = useRouter();
  const [user, setUser] = useContext(ValueContext);

  function handleValue(value, url) {

    setUser({ ...user, selectedTypeOfValue: value });
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
    allRegions.add(record.fields['Region (from Country)']);
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

      <section className="text-gray-600 body-font bg-gray-50">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-black ">
              Open Banking Value Tool
            </h1>
            <p className="mb-8 leading-relaxed">
              What evidence do we have that open banking is creating benefits
              for the banks that open APIs?
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                <Link href="/tool">Learn More</Link>
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://dummyimage.com/720x600"
            />
          </div>
        </div>
      </section>

      <section className="home-select-region">
        <div className="container mx-auto px-6 p-6 bg-white dark:bg-gray-800">
          <div className="mb-16 text-center">
            <h2 className="text-base text-russian-violet-500 font-semibold tracking-wide ">
              Select
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Type of value
            </p>
          </div>
          <div className="flex flex-wrap my-12 dark:text-white">
            <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
              <div className="flex items-center justify-center mb-6">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-6 w-6 text-russian-violet-500"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                </svg>
                <div className="ml-4 text-xl">All</div>
              </div>

              <div className="flex justify-center mt-2">
                <button
                  onClick={() => handleValue("All", "/tool")}
                  className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  <a>Learn More</a>
                </button>
              </div>
            </div>

            {typeOfValues.map((value, index) => {
              return (
                <>
                  <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8" key={index}>
                    <div className="flex items-center justify-center mb-6">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="h-6 w-6 text-russian-violet-500"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                      </svg>
                      <div className="ml-4 text-xl">{value}</div>
                    </div>

                    <div className="flex justify-center  mt-2">
                      <button
                        onClick={() =>
                          handleValue(value, "/tool")
                        }
                        className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      >
                        <a>Learn More</a>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
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
