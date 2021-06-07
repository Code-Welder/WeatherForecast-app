export default function showCitySelector() {
  const citySelector = document.querySelector('.city-selector')
  const openBtn = document.querySelector('.curr-city-name span')
  const closeBtn = document.querySelector('.city-selector-close')

  openBtn.onpointerdown = function() {
    citySelector.style.visibility = 'visible'
  }

  closeBtn.onpointerdown = function() {
    citySelector.style.visibility = 'hidden'
  }
}