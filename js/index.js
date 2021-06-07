import getWeatherForecast from './modules/Weather/getWeatherForecast.js'
import insertWeatherForecast from './modules/Weather/insertWeatherForecast.js'
import displayHintsOnInput from './modules/CitiesSelection/displayHintsOnInput.js'
import createHintsListObserver from './modules/CitiesSelection/citiesListObserver.js'
import showCitySelector from './modules/showCitySelector.js'

const HTMLForecastNodes = {
  cityName: document.querySelector(".curr-city-name span"),
  temp: document.querySelector(".curr-temperature"),
  icon: document.querySelector(".descript img"),
  descript: document.querySelector(".descript-text"),
  wind: document.querySelector(".wind .info-unit span"),
  feels_like: document.querySelector(".feels-like .info-unit span"),
  humidity: document.querySelector(".humidity .info-unit span")
}

showCitySelector()

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(succes, err)

  function succes(position) {
    const location = {
      coords: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      }
    }

    getWeatherForecast(location)
    .then( forecastOptions => {
      insertWeatherForecast(forecastOptions, HTMLForecastNodes)
    })
  }

  function err(error) {
    console.log(`ERROR(${error.code}): ${error.message}`);

    getWeatherForecast({cityName: 'Санкт-Петербург'})
    .then( forecastOptions => {
      insertWeatherForecast(forecastOptions, HTMLForecastNodes)
    })
  }

} else {
  console.log("location detection is not possible");
}

fetch('../jsons/cities_names.json', {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
  },
}).then( response => response.json())
  .then( citiesNames => {
    displayHintsOnInput(citiesNames)
  })

createHintsListObserver((cityName) => {
  getWeatherForecast({ cityName: cityName})
    .then( forecastOptions => {
      insertWeatherForecast(forecastOptions, HTMLForecastNodes)
    })
})