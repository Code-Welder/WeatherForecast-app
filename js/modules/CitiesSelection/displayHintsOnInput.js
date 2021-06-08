import { addItemToList } from "../helpers.js";

const input = document.querySelector('.city-name')
const hintsList = document.querySelector(".city-select__list")

/**
 * @param {Object[string]} hints - array with hints (cities names).
 */

export default function displayHintsOnInput(hints) {
  input.addEventListener("input", (e) => {
    let value = e.target.value;
    if (!value[0]) {
      hintsList.innerHTML = "";
      return;
    }
    const currInput = value[0].toUpperCase() + value.slice(1);
    hintsList.innerHTML = "";

    hints.forEach((name) => {
      if (name.indexOf(currInput) === 0) {
        addItemToList(hintsList, "suggested-city", name);
      }
    });
  });
}