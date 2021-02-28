if ("geolocation" in navigator) {

  navigator.geolocation.getCurrentPosition(success, err);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+ lon + '&units=metric&appid=9c727f2de77da6485708877073bc8d14&lang=ru')
    .then( response => response.json())
    .then( json => {

      const forecast = {

        name: json.name,
        temp: Math.ceil(json.main.temp),
        feels_like: Math.ceil(json.main.feels_like),
        humidity: Math.round(json.main.humidity),
        descript: json.weather[0].description,
        icon: json.weather[0].icon,
        wind: Math.round(json.wind.speed)

      }

      return forecast

    })
    .then( forecast => {
      renderForecast(forecast)
    })
    .catch( err => console.log(err))
  }

  function err(error) {
    console.log(`ERROR(${error.code}): ${error.message}`);
  };

} else {
  console.log('location detection is not possible');
}

async function parseJson(url) {
  const response = await fetch(url);
  const json     = await response.json();
  return json;
}

parseJson("./cities_names.json")
    .then((cities) => {
      citySelection(cities)
    })
    .catch((err) => console.log(err));

async function getWeatherForecast(cityName) {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=9c727f2de77da6485708877073bc8d14&lang=ru')
  const json     = await response.json()

  const forecast = {

          name: json.name,
          temp: Math.ceil(json.main.temp),
          feels_like: Math.ceil(json.main.feels_like),
          humidity: Math.round(json.main.humidity),
          descript: json.weather[0].description,
          icon: json.weather[0].icon,
          wind: Math.round(json.wind.speed)

        }
  return forecast
}

function renderForecast(forecast) {
  const cityName     = document.querySelector('.city-name')
  const currTemp     = document.querySelector('.curr-temperature')
  const descriptIcon = document.querySelector('.descript img')
  const descriptText = document.querySelector('.descript-text')
  const wind         = document.querySelector('.wind .info-unit span')
  const feelsLike    = document.querySelector('.feels-like .info-unit span')
  const humidity     = document.querySelector('.humidity .info-unit span')

  cityName.placeholder     = forecast.name
  currTemp.textContent     = forecast.temp
  descriptIcon.src         = "./img/weather/" + forecast.icon.slice(0, 2) + "d.svg"
  descriptText.textContent = forecast.descript
  wind.textContent         = forecast.wind
  feelsLike.textContent    = forecast.feels_like
  humidity.textContent     = forecast.humidity

}

function renderDate() {
  const weekDay      = document.querySelector('.curr-week-day')
  const day          = document.querySelector('.curr-day')
  const weatherApp   = document.querySelector('.weather-app')
  const descriptText = document.querySelector('.descript-text')

  const d = new Date()
  const h = d.getHours()

  if(h > 18 || h < 6) {
    weatherApp.style.backgroundImage = 'url(./img/bg/background-n.jpg)'

  } else {
    weatherApp.style.backgroundImage = 'url(./img/bg/background-d.jpg)'
    descriptText.style.color = "#171720"
  }

  const week = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

  weekDay.textContent = week[d.getDay()]
  day.textContent = d.getDate()
}

function citySelection(arr) {
  const input      = document.querySelector('.city-name')
  const citiesList = document.querySelector('.cities-list')

  input.oninput = function (e) {
    let value = e.target.value;

    if(!value[0]) {
      citiesList.innerHTML = ''
      return;
    };

    const currInput = value[0].toUpperCase() + value.slice(1)
    citiesList.innerHTML = ''

    arr.forEach((name) => {
      if(name.indexOf(currInput) === 0) {
        addListItem(citiesList, 'suggested-city', name)
      }
    });
  };
}

const citiesListObserver = new MutationObserver(mutations => {
  const citiesList = mutations[0].target
  for(item of citiesList.children) {
    item.onclick = function(e) {

      citiesList.innerHTML = ''
      document.querySelector('.city-name').value = ''
      document.querySelector('.city-name').placeholder = e.target.textContent

      getWeatherForecast(e.target.textContent)
      .then( obj => {
        console.log(obj);
        renderForecast(obj)
      })
      .catch( err => console.log(err))
    }
  }
})

citiesListObserver.observe(document.querySelector('.cities-list'), {
  childList: true
})

function addListItem(parent, className, text) {
  const li = document.createElement('li')

  li.classList.add(className)
  li.textContent = text
  parent.append(li)
}

renderDate()