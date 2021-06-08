const citySelector = document.querySelector('.city-selector')
const cityName = document.querySelector('.curr-city-name')
const closeBtn = document.querySelector('.btn-close')

export default function toggleCitySelectorVisibility() {
  cityName.onpointerdown = showCitySelector
  closeBtn.onpointerdown = hideCitySelector
}

export function showCitySelector() {
    citySelector.hidden = false
}

export function hideCitySelector() {
    citySelector.hidden = true
}