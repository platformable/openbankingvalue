function getCountries({url}){
    fetch(url)
    .then(res=>res.json)
}

export default getCountries;