import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = process.env?.REACT_APP_WEATHER_APIKEY

const getWeatherOf = (lat, lon) => {
    const promise = axios.get(`${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return promise.then(response => response.data)
}

export default { getWeatherOf }