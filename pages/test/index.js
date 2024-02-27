import React, { useState, useEffect, useContext, useMemo } from "react";
import Layout from  '../../components/Layout'



import { getRecords } from "../api/hello";

const Test = ({ data, valueCategories, beneficiaries }) => {
  console.log(data)
 
  return (
    <Layout>
      
      <section className="sm:grid sm:grid-rows-1 lg:grid lg:grid-cols-[1fr_3fr] container mx-auto mt-5">
     
        {data && (
          <div className="flex flex-col">
          {data.length} values
          </div>
        )} 
      </section>
      <div className="footer-top-bar h-12"></div>
    </Layout>
  );
};

export default Test;

export async function getServerSideProps(context) {
 

  try {
    const dataResponse = await getRecords()

    const [ valueCategories, beneficiaries] = await Promise.all([
      
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
   

    return {
      props: {
        data: dataResponse,
        valueCategories,
        beneficiaries,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { data: "No Data" } };
  }
}
