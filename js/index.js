import getWeatherForecast from './modules/Weather/getWeatherForecast.js'
import insertWeatherForecast from './modules/Weather/insertWeatherForecast.js'
import displayHintsOnInput from './modules/CitiesSelection/displayHintsOnInput.js'
import createHintsListObserver from './modules/CitiesSelection/citiesListObserver.js'
import toggleCitySelectorVisibility from './modules/CitiesSelection/CitySelector.js'
import insertDate from './modules/insertDate.js'

const HTMLForecastNodes = {
  cityName: document.querySelector(".curr-city-name span"),
  temp: document.querySelector(".js-temperature"),
  icon: document.querySelector(".description img"),
  descript: document.querySelector(".description__text"),
  wind: document.querySelector(".js-wind"),
  feels_like: document.querySelector(".js-feels-like"),
  humidity: document.querySelector(".js-humidity")
}
const nodesForDate = {
  day: document.querySelector(".js-day"),
  month: document.querySelector(".js-month"),
  year: document.querySelector(".js-year"),
}

insertDate(nodesForDate)
toggleCitySelectorVisibility()

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

fetch('./jsons/cities_names.json')
  .then( response => response.json())
  .then( citiesNames => {
    displayHintsOnInput(citiesNames)
  })

createHintsListObserver((cityName) => {
  getWeatherForecast({ cityName: cityName})
    .then( forecastOptions => {
      insertWeatherForecast(forecastOptions, HTMLForecastNodes)
    })
})