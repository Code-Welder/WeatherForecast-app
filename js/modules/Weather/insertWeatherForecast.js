import { setNodeText } from '../helpers.js'

/**
 *
 * @param {object} forecastOptions - object with forecast options.
 * @param {string} forecastOptions.cityName - name of the city.
 * @param {string} forecastOptions.descript - weather description: clear\sunny etc
 * @param {string|number} forecastOptions.feels_like - temperature feels like (celsius).
 * @param {string|number} forecastOptions.humidity - humidity (percent).
 * @param {string} forecastOptions.icon - condition code for icon.
 * @param {string|number} forecastOptions.temp - temperature (celsius).
 * @param {string|number} forecastOptions.wind - wind (m/s)
 *
 * @param {object} nodes - object with element links for changing nodes content.
 * @param {Element} nodes.cityName
 * @param {Element} nodes.descript
 * @param {Element} nodes.feels_like
 * @param {Element} nodes.humidity
 * @param {Element} nodes.icon
 * @param {Element} nodes.temp
 * @param {Element} nodes.wind
 *
 */

export default function insertWeatherForecast(forecastOptions, nodes) {
  const { cityName, descript, feels_like, humidity, icon, temp, wind } = forecastOptions;

  setNodeText(nodes.cityName, cityName)
  setNodeText(nodes.descript, descript)
  setNodeText(nodes.feels_like, feels_like)
  setNodeText(nodes.humidity, humidity)
  setNodeText(nodes.temp, temp)
  setNodeText(nodes.wind, wind)

  nodes.icon.src = "./img/weather/" + icon.slice(0, 2) + "d.svg";
}