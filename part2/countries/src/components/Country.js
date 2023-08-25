import { useEffect, useState } from "react"
import Weather from "./Weather";
import weatherService from "../services/weather";

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const latlng = country.capitalInfo.latlng
        weatherService
            .getWeatherOf(latlng[0], latlng[1])
            .then(response => {
                setWeather(response)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h4>languages</h4>
            <ul>
                {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            {weather === null ? '' : <Weather location={country.capital[0]} weather={weather}/>}
        </div>
    )

}

export default Country