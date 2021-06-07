/**
 * Forecast base on (https://openweathermap.org/)
 * @param {object} location - object with two fields.
 * @param {string} location.cityName - get weather by city name.
 * @param {object} location.coords - get weather by coords (latitude, longitude).
 * @param {string|number} location.coords.lat - latitude coordinates.
 * @param {string|number} location.coords.lon - longitude coordinates.
 * @returns {Promise} Promise object with forecast parameters | lang: ru - for city name and description.
 */

export default async function getWeatherForecast({ cityName, coords }) {
  if (coords) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        coords.lat +
        "&lon=" +
        coords.lon +
        "&units=metric&appid=9c727f2de77da6485708877073bc8d14&lang=ru"
    );
    const json = await response.json();
    const forecast = await getForecastOptions(json);
    return forecast;
  }

  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=9c727f2de77da6485708877073bc8d14&lang=ru"
  );
  const json = await response.json();
  const forecast = await getForecastOptions(json);
  return forecast;
}

/**
 * @param {object} json .
 * @returns {Promise} Promise object - rework JSON from (https://openweathermap.org/current#parameter) API.
 * Weather condition codes for icons (https://openweathermap.org/weather-conditions).
 */

/**
 * example of return object: {
 *  cityName: "Москва",
 *  descript: "ясно",
 *  feels_like: 23, // celsius
 *  humidity: 47,
 *  icon: "01d",
 *  temp: 15, // celsius
 *  wind: 3, // m/s
 * }
*/

async function getForecastOptions(json) {
  return {
    cityName: json.name,
    descript: json.weather[0].description,
    feels_like: Math.ceil(json.main.feels_like),
    humidity: json.main.humidity,
    icon: json.weather[0].icon,
    temp: Math.ceil(json.main.temp),
    wind: (json.wind.speed).toFixed(1),
  };
}