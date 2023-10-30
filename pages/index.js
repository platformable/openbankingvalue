import React, { useState, useEffect, useContext, useMemo } from "react";
import Layout from "../components/Layout";
import ToolsResults from "../components/ToolsResults";
import { useRouter } from "next/router";
import { ValueContext } from "../context/valueContext";
import Head from "next/head";
import Filters from "../components/Filters";
import Hero from "../components/Hero";
import Meta from "../components/Meta";

const Home = ({ data, pagination, valueCategories, beneficiaries }) => {
  console.log("data", data);
  const [user, setUser] = useContext(ValueContext);
  const [filteredData, setFilteredData] = useState(data.records);
  const { selectedRegion, typeOfValues, visitedPages } = user;
  const [valueCat, setValueCat] = useState([]);

  const [ismobile, setIsmobile] = useState(null);

  const addOffsetforPagination = (id) => {
    !visitedPages.includes(id) && setUser(prev => ({...prev, visitedPages: [...prev.visitedPages, id]}))
  }

  const clearTypeOfValuesState = () =>
    setUser((prev) => ({
      ...prev,
      typeOfValues: Object.assign(
        {},
        prev.typeOfValues,
        ...valueCategories?.records?.map((value) => ({
          [value.fields["Value Generation Category"]]: {
            id: value.id,
            isSelected: false,
          },
        }))
      ),
    }));
  const clearBenefieciarieSelectedState = () =>
    setUser((prev) => ({
      ...prev,
      selectedBeneficiaryId: Object.assign(
        {},
        prev.selectedBeneficiaryId,
        ...beneficiaries?.records?.map((beneficiary) => ({
          [beneficiary.fields["Name"]]: {
            id: beneficiary.id,
            isSelected: false,
          },
        }))
      ),
    }));
  const clearRegionsState = () => {
    const unrepeatedRegionValues = new Set(null);
    data?.records?.forEach((row) => {
      const rowRegions = row.fields["Region (from Country)"];

      rowRegions?.forEach((region) => unrepeatedRegionValues.add(region));
    });
    // console.log(Array.from(unrepeatedRegionValues))
    setUser((prev) => ({
      ...prev,
      selectedRegion: Object.assign(
        {},
        prev.selectedRegion,
        ...Array.from(unrepeatedRegionValues)?.map((value) => ({[value]:  false}) )
        ) 
       
    }));
  };
  const setInitialStates = () => {
    clearTypeOfValuesState();
    clearBenefieciarieSelectedState();
    clearRegionsState();
  };
  useEffect(() => {
    setInitialStates();
    setValueCat(valueCategories.records);
    
  }, []);

  useEffect(() => {
    if (pagination) addOffsetforPagination(pagination)
    setIsmobile(navigator?.userAgentData?.mobile);
  }, []);
  // console.log(user)
  return (
    <Layout>
      <Meta />
      <Hero />
      <section className="sm:grid sm:grid-rows-1 lg:grid lg:grid-cols-[1fr_3fr] container mx-auto">
        <Filters
          data={data}
          setFilteredData={setFilteredData}
          valueCat={valueCat}
        />
        {data && (
          <div className="flex flex-col">
            <ToolsResults
              typeOfValues={typeOfValues}
              content={filteredData}
              selectedRegion={selectedRegion}
              setInitialStates={setInitialStates}
            />
          </div>
        )}
      </section>
      <div className="footer-top-bar h-12"></div>
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
  /*   const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/engage?populate=*`
      );
      const data = await res.json(); */

  try {
    const [data, valueCategories, beneficiaries] = await Promise.all([
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
        },
      }).then((res) => res.json()),
      fetch(
        "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/LOOKUP%20Value%20taxonomy",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
          },
        }
      ).then((res) => res.json()),

      fetch(
        "https://api.airtable.com/v0/appHMNZpRfMeHIZGc/LOOKUP%20Value%20stakeholders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PLATFORMABLE_AIRTABLE_KEY}`,
          },
        }
      ).then((res) => res.json()),
    ]);
    // console.log("PAGINATION => ", data?.offset);

    const pagination = (await data?.offset) || null;
    return {
      props: {
        pagination,
        data,
        valueCategories,
        beneficiaries,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { data: "No Data" } };
  }
}
