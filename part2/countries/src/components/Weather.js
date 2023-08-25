const Weather = ({ location, weather }) => {
    return (
        <div>
            <h2>Weather in {location}</h2>
            <p>temperature {Math.round((weather.main.temp - 273) * 100)/100} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;