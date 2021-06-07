import { addItemToList } from "../helpers.js";

const input = document.querySelector('.city-name')
const citiesList = document.querySelector(".cities-list")

/**
 * @param {Object[string]} hints - array with hints.
 */

export default function displayHintsOnInput(hints) {
  input.addEventListener("input", (e) => {
    let value = e.target.value;
    if (!value[0]) {
      citiesList.innerHTML = "";
      return;
    }
    const currInput = value[0].toUpperCase() + value.slice(1);
    citiesList.innerHTML = "";

    hints.forEach((name) => {
      if (name.indexOf(currInput) === 0) {
        addItemToList(citiesList, "suggested-city", name);
      }
    });
  });
}