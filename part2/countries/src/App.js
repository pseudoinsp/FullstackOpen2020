import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({country}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <br/>
      capital {country.capital}
      <br/>
      population {country.population}

      <h2>languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>

      <img src={country.flag} alt="flag" width="140" height="70" /> 
    </>
  )
}

const CountryListElement = ({country, isDetailed, showClickHandler}) => {

  console.log(isDetailed);

  if(isDetailed) {
    return (
      <div>
      <p key={country.name}>
        {country.name} <button id={country.name} onClick={showClickHandler}>show</button>
        <CountryDetails country={country} />
      </p>
        
      </div>
    )
  }

  return (
    <p key={country.name}>
      {country.name} <button id={country.name} onClick={showClickHandler}>show</button>
    </p>
  )
}

const CountryList = ({countries, detailedCountries: detailedCountryNames, showClickHandler}) => {

  if(countries.length > 10)
  {
    return (
      <>
        <p>Too many matches, specify a more specific filter</p>
      </>
    )
  }

  if(countries.length > 1) {
    return (
      <>
        {countries.map(country => 
          <CountryListElement key={country.name} country={country} isDetailed={detailedCountryNames.includes(country.name)} showClickHandler={showClickHandler} />
        )}
      </>
    )
  }

  if(countries.length === 1) {
    return (
      <>
        <CountryDetails country={countries[0]} />
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
  const [detailedCountryNames, setDetailedCountryNames] = useState([]);

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

  const HandleShowClick = (event) => 
  {
      let selectedCountryName = event.target.id;

      if(!detailedCountryNames.includes(selectedCountryName))
      {
        setDetailedCountryNames(detailedCountryNames.concat(selectedCountryName));
      }
  }

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
      <CountryList countries={countryData} detailedCountries={detailedCountryNames} showClickHandler={HandleShowClick} />
    </div>
    </div>
  );
}

export default App;
