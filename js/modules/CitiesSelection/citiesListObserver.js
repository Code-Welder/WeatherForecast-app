import { setInputPh, clearInput } from '../helpers.js'
import { hideCitySelector } from './CitySelector.js'

const input = document.querySelector('.city-name')
const citiesList = document.querySelector(".city-select__list")

/**
 * @param {function} cb - called by click on an hints list item
 */
export default function createHintsListObserver(cb) {
  const hintsListObserver = new MutationObserver(mutations => {
    const hintsList = mutations[0].target

    for (const item of hintsList.children) {
      item.addEventListener('click', e => {
        citiesList.innerHTML = ''
        clearInput(input)
        setInputPh(input, e.target.textContent)
        hideCitySelector()

        cb(e.target.textContent)
      })
    }
  })

  hintsListObserver.observe(citiesList, { childList: true })
}