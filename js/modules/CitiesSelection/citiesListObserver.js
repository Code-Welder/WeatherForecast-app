import { hideNode, setInputPh, clearInput } from '../helpers.js'

const input = document.querySelector('.city-name')
const citySelector = document.querySelector('.city-selector')
const citiesList = document.querySelector(".cities-list")

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
        hideNode(citySelector)

        cb(e.target.textContent)
      })
    }
  })

  hintsListObserver.observe(citiesList, { childList: true })
}