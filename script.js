if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(success, err);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=metric&appid=9c727f2de77da6485708877073bc8d14&lang=ru"
    )
      .then((response) => response.json())
      .then((json) => {
        return getForcastProps(json);
      })
      .then((forecast) => {
        renderForecast(forecast);
      })
      .catch((err) => console.log(err));
  }

  function err(error) {
    console.log(`ERROR(${error.code}): ${error.message}`);
  }
} else {
    console.log("location detection is not possible");
}

async function parseJson(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

parseJson("./cities_names.json")
  .then((cities) => {
    citySelection(cities);
  })
  .catch((err) => console.log(err));

async function getWeatherForecast(cityName) {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=metric&appid=9c727f2de77da6485708877073bc8d14&lang=ru"
  );
  const json = await response.json();
  const forecast = getForcastProps(json);

  return forecast;
}

function renderForecast(forecast) {
  const currName = document.querySelector(".curr-city-name");
  const currTemp = document.querySelector(".curr-temperature");
  const descriptIcon = document.querySelector(".descript img");
  const descriptText = document.querySelector(".descript-text");
  const wind = document.querySelector(".wind .info-unit span");
  const feelsLike = document.querySelector(".feels-like .info-unit span");
  const humidity = document.querySelector(".humidity .info-unit span");

  currName.textContent = forecast.name;
  currTemp.textContent = forecast.temp;
  descriptIcon.src = "./img/weather/" + forecast.icon.slice(0, 2) + "d.svg";
  descriptText.textContent = forecast.descript;
  wind.textContent = forecast.wind;
  feelsLike.textContent = forecast.feels_like;
  humidity.textContent = forecast.humidity;
}

function renderDate() {
  const currDay = document.querySelector('.curr-day')
  const currMonth = document.querySelector('.curr-month')
  const currYear = document.querySelector('.curr-year')

  const d = new Date();

  let day, month

  d.getDate() < 10 ? currDay.textContent = '0' + d.getDate():
                     currDay.textContent = d.getDate();

  d.getMonth() + 1 < 10 ? currMonth.textContent = '0' + (d.getMonth() + 1):
                          currMonth.textContent = d.getMonth() + 1;



  currYear.textContent = d.getFullYear()
}

function citySelection(arr) {
  const input = document.querySelector(".city-name");
  const citiesList = document.querySelector(".cities-list");

  input.oninput = function (e) {
    let value = e.target.value;

    if (!value[0]) {
      citiesList.innerHTML = "";
      return;
    }

    const currInput = value[0].toUpperCase() + value.slice(1);
    citiesList.innerHTML = "";

    arr.forEach((name) => {
      if (name.indexOf(currInput) === 0) {
        addListItem(citiesList, "suggested-city", name);
      }
    });
  };
}

const citiesListObserver = new MutationObserver((mutations) => {
  const citiesList = mutations[0].target;

  for (item of citiesList.children) {
    item.onclick = function (e) {
      citiesList.innerHTML = "";

      document.querySelector(".city-name").value = "";
      document.querySelector(".city-name").placeholder = e.target.textContent;

      getWeatherForecast(e.target.textContent)
        .then((obj) => {
          console.log(obj);
          renderForecast(obj);
        })
        .catch((err) => console.log(err));
    };
  }
});

citiesListObserver.observe(document.querySelector(".cities-list"), {
  childList: true,
});

function addListItem(parent, className, text) {
  const li = document.createElement("li");

  li.classList.add(className);
  li.textContent = text;
  parent.append(li);
}

function getForcastProps(json) {
  const obj = {
    name: json.name,
    temp: Math.ceil(json.main.temp),
    feels_like: Math.ceil(json.main.feels_like),
    humidity: Math.round(json.main.humidity),
    descript: json.weather[0].description,
    icon: json.weather[0].icon,
    wind: Math.round(json.wind.speed),
  };

  return obj;
}

function showCitySelector() {
  const citySelector = document.querySelector('.city-selector')
  const openBtn = document.querySelector('.open-button')
  const closeBtn = document.querySelector('.city-selector-close')

  openBtn.onpointerdown = function() {
    citySelector.style.visibility = 'visible'
  }

  closeBtn.onpointerdown = function() {
    citySelector.style.visibility = 'hidden'
  }
}

renderDate();
showCitySelector()