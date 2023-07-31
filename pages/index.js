import React, { useState, useEffect, useContext, useMemo } from "react";
import Layout from "../components/Layout";
import ToolsResults from "../components/ToolsResults";
import { useRouter } from "next/router";
import { ValueContext } from "../context/valueContext";
import Head from "next/head";
import Filters from "../components/Filters";
import Hero from "../components/Hero";

const Home = ({ data, pagination }) => {
  console.log("data", data)
  const [user, setUser] = useContext(ValueContext);

  const [filteredData, setFilteredData] = useState(data.records);
  const [whoBenefits, setWhoBenefits] = useState([]);
  const [clientOffset, setClientOffset] = useState(data.offset);
  const { selectedTypeOfValue, selectedRegion, typeOfValues, favorites } = user;
  // const router = useRouter();
  // const routerLocation = router.asPath;
  // const [loading, setLoading] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState("All");
  const [beneficiaryId, setBeneficiaryId] = useState("All");


  // const handleValuesList = () => {
  //   setValuesList(!openValuesList);
  //   typeof window !== undefined &&
  //     window.localStorage.setItem("value", selectedTypeOfValue);
  // };


  /* Get FUNCTIONS */
  const handleBeneficiary = (beneficiary) => {
    if (beneficiary === "All") {
      setBeneficiaryId("All");
      setSelectedBeneficiary("All");
    } else {
      setBeneficiaryId(beneficiary.id);
      setSelectedBeneficiary(beneficiary.fields.Name);
    }
  };
  useEffect(() => {
    function getBeneficiary() {
      fetch(
        "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/LOOKUP%20Value%20stakeholders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => setWhoBenefits(res));
    }

    getBeneficiary();
  }, []);


  return (
    <Layout>
      <Head>
        {/* <title>Platformable Value Generated Tool</title> */}
        <meta name="description" content="Platformable Value Generated Tool" />
      </Head>
      <Hero />
      <section className="flex">
      <Filters
        data={data}
        setFilteredData={setFilteredData}
        selectedBeneficiary={selectedBeneficiary}
        whoBenefits={whoBenefits}
        handleBeneficiary={handleBeneficiary}
      />

      {data && (
        <div className="w-full">
          <ToolsResults
            typeOfValues={typeOfValues}
            content={filteredData}
            selectedRegion={selectedRegion}
            clientOffset={clientOffset}
            pagination={pagination}
          />
        </div>
      )}
      </section>
      
    </Layout>
  );
};

export default Home;



export async function getServerSideProps(context) {
  const offset = "" || (await context.query.clientOffset);


  const url =
    offset === undefined
      ? "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated"
      : `https://api.airtable.com/v0/appHMNZpRfMeHIZGc/Value%20Generated?offset=${offset}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
    },
  });
  const data = await res.json();
  const pagination = (await data.offset) || null;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, pagination },
  };
}
