import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  console.log("COUNTRY IS: ", country)
  console.log("languages: ", country.languages)
  console.log("array: ", Array.isArray(country.languages))

  const [weather, setWeather] = useState([])

  //object mapping is required since the fetched data is an object instead of array
  const languageArray = Object.keys(country.languages).map(key => country.languages[key])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
      .then(response => {
        console.log('weather promise fulfilled')
        setWeather(response.data)
      })
  }, [])
  console.log("weather is:", {weather})

  return (
    <div>
      <h1>{country.name.common}</h1> 
      <p>capital {country.capital}</p>  
      <p>area {country.area}</p>
      <h3>languages:</h3>
      {languageArray.map((language, i) => <li key = {i}>{language}</li>)}
      <p><img alt="Country Flag" src={country.flags.png} height="120" width="150" /></p>
      <h3>Wather in {country.capital}:</h3>
      {/* must use kind null constructor for proper rendering */}
      {weather.main ? <p>temperature {(weather.main.temp-273.15).toFixed(2)} Celcius</p> : null}
      {weather.weather ? <p><img alt="Weather Icon" src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} height="100" width="100" /></p> : null}
      {weather.main ? <p>wind {weather.wind.speed} m/s</p> : null}
    </div>
  )
}

const Countries = ({ countries, filter }) => {
  const limit = 10
  const [click, setClick] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  //countries mapping is required
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())) //making everything to lowercase to avoid case sensivity
  console.log("filter is: ", filter)
  console.log("country is: ", countriesToShow.map(country => country.name.common))
  
  const handleClick = countryName => {
    //fetching the country name with button click and put it to the state array
    setSelectedCountry(countryName.common)
    if (click === false) {
      setClick(true)
      console.log("Button is true")
    }
    else {
      setClick(false)
      console.log("Button is false")
    }
    console.log("Button is clicked")
  }

  //if (countriesToShow.map(country => country.name.common.toLowerCase()).includes(filter.toLowerCase())) {
  if (click === true) {
    return (
      <div>
        {countries.filter(country => country.name.common.includes(selectedCountry))
        .map(country => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    )
  }
  else if (countriesToShow.length === 1) {   
    console.log("size of countries array: ", countriesToShow.length)
    console.log(countriesToShow)
    return (
      <div>
        {countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        .map(country => (
          <Country key={country.name.common} country={country} />
        ))}
      </div>
    )
  }
  else if (countriesToShow.length < limit) {
    return (
      countriesToShow.map(country =>
      <p key = {country.name.common}> {country.name.common} <button onClick={() => handleClick(country.name)}>Show</button> </p>)
    )
  } else {
    return (
      <div>To many matches, specify another filter</div>
    )
  }
}
  
export default Countries