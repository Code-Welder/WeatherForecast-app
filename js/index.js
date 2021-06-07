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

getWeatherForecast({cityName: 'Санкт-Петербург'})
  .then(forecastOptions => insertWeatherForecast(forecastOptions, HTMLForecastNodes))

fetch('../jsons/cities_names.json')
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