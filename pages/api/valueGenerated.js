// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Airtable = require("airtable");

export default async function handler(req, res) {
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
    fields: [
        "Data point",
        "Data point narrative",
        "Banks involved",
        "Logo (from Banks involved)",
      ],
  });
  try {
    await table.eachPage((records, fetchNextPage) => {
      records.forEach(function ({ fields, id }) {
        // console.log("Retrieved", record.get("RowID"));
        data.push({
            dataPoint: fields["Data point"],
            dataPointNarrative: fields['Data point Narrative'],
            banksInvolved: fields['Banks involved'],
            logo: fields['Logo (from Banks involved)'],
        });
      });
      // console.log("records,", records)

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    });
  } catch (error) {}
  return res.status(200).json({ data });
}
