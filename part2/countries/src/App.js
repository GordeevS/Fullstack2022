import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  //fetching data from end point
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  } 

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter = {filter}
              handleFilterChange = {handleFilterChange}
      />
      <Countries countries={countries}
               filter={filter}
      />
    </div>
  )
}

export default App