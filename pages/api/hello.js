// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { redirect } from "next/dist/server/api-utils";

const Airtable = require("airtable");

export async function getRecords() {
  const data = [];
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.PLATFORMABLE_AIRTABLE_KEY,
  });
  var base = Airtable.base("appHMNZpRfMeHIZGc");
  const table = base("Value generated").select({
    // Selecting the first 3 records in Grid view:
    // maxRecords: 3,
    view: "Grid view",
    // fields: [
    //     "Data point",
    //     "Data point narrative",
    //     "Banks involved",
    //     "Logo (from Banks involved)",
    //   ],
  });
  try {
    await table.eachPage((records, fetchNextPage) => {
      records.forEach(function ({ fields, id }) {
        // console.log("Retrieved", fields);
        // data.push({
        //     dataPoint: fields["Data point"],
        //     dataPointNarrative: fields['Data point Narrative'],
        //     banksInvolved: fields['Banks involved'],
        //     logo: fields['Logo (from Banks involved)'],
        // });
        data.push(fields)
      });
      // console.log("records,", records)

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    });
  } catch (error) {}
  return data
}
export default async function handler(req, res) {
  const records = [];
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.PLATFORMABLE_AIRTABLE_KEY,
  });
  var base = Airtable.base("appHMNZpRfMeHIZGc");
  const table = base("Value generated").select({
    // Selecting the first 3 records in Grid view:
    // maxRecords: ,
    view: "Grid view",
    fields: [
      "Data point",
      "Data point narrative",
      "Banks involved",
      "Logo (from Banks involved)",
    ],
  });
  try {
    await table.eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function ({ fields, id }) {
          const x = {
            id,
            dataPoint: fields["Data point"],
            // dataPointNarrative: fields['Data Point Narrative'],
            // banksInvolved: fields['Banks involved'],
            // logo: fields['Logo (from Banks involved)'],
          };
          records.push(x);
        });
        // `delay` returns a promise
       
        fetchNextPage();

        // try {

        // } catch {
        // console.log("fail while fetchin next airtable page");
        // return records;
        // }

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
      },
      function done(error) {
        if (error) {
          console.log("errror");
          console.log(error);
          return;
        }
      }
    );
  } catch (error) {
    console.log("hello 4");
  }
  return res.status(200).json({ data: records });
}
