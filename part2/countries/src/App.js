import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({countries}) => {

  if(countries.length > 10)
  {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }

  if(countries.length > 1) {
    return (
      <>
        {countries.map(country => <p key={country.name}>{country.name}</p>)}
      </>
    )
  }

  if(countries.length === 1) {
    let onlyMatchedCountry = countries[0];
    return (
      <>
        <h1>{onlyMatchedCountry.name}</h1>
        <br/>
        capital {onlyMatchedCountry.capital}
        <br/>
        population {onlyMatchedCountry.population}

        <h2>languages</h2>
        <ul>
          {onlyMatchedCountry.languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>

        <img src={onlyMatchedCountry.flag} alt="flag" width="80" height="80" /> 
      </>
    )
  }

   return (
     <>
        No matches.
     </>
   )
}

function App() {

  const [countryQuery, setCountryQuery] = useState('');
  const [countryData, setCountryData] = useState([]);
  

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${countryQuery}`)
         .then(response => {
           console.log(response.data)
           setCountryData(response.data)
         })
         .catch(err => {
           console.log(err)
         })
  }, [countryQuery]);

  const HandleQueryValueChange = event => 
  {
    let newQuery = event.target.value;
    console.log(newQuery);
    setCountryQuery(newQuery)
  }

  return (
    <div>
      find countries <input value={countryQuery} onChange={HandleQueryValueChange} />

      <div>
      <CountryDetails countries={countryData} />
    </div>
    </div>
  );
}

export default App;
