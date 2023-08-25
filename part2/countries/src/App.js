import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Countries from "./components/Countries"
import Country from "./components/Country"
import countriesService from "./services/countries"


function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState(null)  

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => {
        setCountries(response)
      })
  }, [])

  const handleChangeCountryFilter = (event) => {
    setCountryFilter(event.target.value.toLowerCase())
  }

  const handleShowCountry = (countryName) => {
    return () => setCountryFilter(countryName.toLowerCase())
  }

  let countriesToShow = []
  if (countries !== null) {
    countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(countryFilter))
  }
  
  const componentFilter = 
    <div>
      <Filter handleChange={handleChangeCountryFilter}/>
    </div>

  if (countriesToShow.length === 0) { 
    if (countryFilter === '') {
      return(
        <div>
          Loading info ...
        </div>
      )
    }
    return componentFilter
  } else if (countriesToShow.length > 10) {
    return (
      <>
        {componentFilter}
        <div>
          Too many matches, specify another filter
        </div>
      </>)
  } else if (countriesToShow.length !== 1) {
    return (
      <>
        {componentFilter}
        <Countries listOfCountries={countriesToShow} handleClick={handleShowCountry}/>
      </>)
  } else {
    return (
      <>
        {componentFilter}
        <Country country={countriesToShow[0]} />
      </>
    )
  }
  
}

export default App;
