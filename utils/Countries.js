function getCountries({url}){
    fetch(url)
    .then(res=>res.json)
    .then(response=>console.log(response))
}

export default getCountries;