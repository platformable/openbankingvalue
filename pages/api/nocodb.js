// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Api } from "nocodb-sdk";

export async function getValuesGenerated(queryParams) {
  // console.log("query in server", queryParams);
  // const {typeOfValues,selectedRegion,selectedBeneficiaryId} = queryParams
  const hasParams = queryParams ? true : false;

  const valuesQuery = hasParams ? queryParams.get("values") : "";
  const regionsQuery = hasParams ? queryParams.get("regions") : "";
  const stakeholdersQuery = hasParams ? queryParams.get("stakeholders") : "";

  const paramsString = Object.entries({
    ValueCategory: valuesQuery,
    RegionDetail: regionsQuery,
    StakeholdersList: stakeholdersQuery,
  })
    .reduce(
      (acc, [key, value]) => (value ? [...acc, `(${key},anyof,${value})`] : acc),
      []
    )
    .join("~and");
    console.log("server params", paramsString)
  const api = new Api({
    baseURL: process.env.NEXT_PUBLIC_NOCODB_API_URL,
    headers: {
      "xc-auth": process.env.NEXT_PUBLIC_NOCODB_AUTH_TOKEN,
    },
  });
  try {
    const data = await api.dbViewRow.list(
      "noco",
      "Core Dataset Prod",
      "ValuesGenerated",
      "ValuesGenerated",
      {
        offset: 0,
        limit: 200,
        where: paramsString,
      }
    );
    // const data = res.json()
    // console.log(data.list.length)
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);

  const data = await getValuesGenerated(params);

  return res.status(200).send(data.list);
}
