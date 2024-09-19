// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Api } from "nocodb-sdk";
const LIMIT_PAGINATION_NUMBER = 30
export async function getValuesGenerated(queryParams) {
  // console.log("query in server", queryParams);
  const valuesQuery = queryParams ? queryParams.get("values") : "";
  const regionsQuery = queryParams ? queryParams.get("regions") : "";
  const stakeholdersQuery = queryParams ? queryParams.get("stakeholders") : "";
  const paginationCounterQuery = queryParams ? queryParams.get("paginationCounter") : 0
  

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
  const api = new Api({
    baseURL: process.env.NEXT_PUBLIC_NOCODB_API_URL,
    headers: {
      "xc-auth": process.env.NEXT_PUBLIC_NOCODB_AUTH_TOKEN,
    },
  });
  try {
    const data = await api.dbViewRow.list(
      "noco",
      "[DATASET] - Core ",
      "ValueGeneratedTool",
      "ValueGeneratedTool",
      {
        offset: Number(paginationCounterQuery)*LIMIT_PAGINATION_NUMBER,
        limit: LIMIT_PAGINATION_NUMBER,
        where: paramsString,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);

  const data = await getValuesGenerated(params);

  return res.status(200).send(data);
}
