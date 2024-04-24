// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Api } from 'nocodb-sdk'


export async function getRegions() {
  // const {typeOfValues,selectedRegion,selectedBeneficiaryId} = queryParams

  const api = new Api({
    baseURL: process.env.NEXT_PUBLIC_NOCODB_API_URL,
    headers: {
      'xc-auth': process.env.NEXT_PUBLIC_NOCODB_AUTH_TOKEN
    }
  })
  try {
    const data = await api.dbViewRow.list(
      "noco",
      "Core Dataset Prod",
      "Region",
      "Region", {
        fields: ['Region'],
        "offset": 0,
        "limit": 20,
        "where":  '(Region,neq,Eastern Europe & Russia)'
    })
    // const data = res.json()
    // console.log(data.list.length)
    return data   
  } catch (error){
    console.log(error)
  }
}
export default async function handler(req, res) {
  const data = await getRegions()
  
  return res.status(200).send(data.list);
}
