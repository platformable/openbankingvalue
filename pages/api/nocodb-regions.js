// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Api } from "nocodb-sdk"

export async function getRegionsV1() {
  // const {typeOfValues,selectedRegion,selectedBeneficiaryId} = queryParams

  const api = new Api({
    baseURL: process.env.NEXT_PUBLIC_NOCODB_API_URL,
    headers: {
      "xc-auth": process.env.NEXT_PUBLIC_NOCODB_AUTH_TOKEN,
    },
  })
  try {
    const data = await api.dbViewRow.list(
      "noco",
      "[DATASET] - Core ",
      "Region",
      "Region",
      {
        fields: ["RegionDetail"],
        offset: 0,
        limit: 20,
        where: "(RegionDetail,neq,Russia & Belarus)",
      },
    )
    // const data = res.json()
    console.log("data in getRegions", data)
    // console.log(data.list.length)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getRegions() {
  try {
    const getData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/regions`)
    const results = await getData.json()
    /*  console.log("results in getRegions", results) */
    return results
  } catch (error) {
    console.log(error)
  }
}
export default async function handler(req, res) {
  const data = await getRegions()

  return res.status(200).send(data.list)
}
