/**
 * @param {Element} parent - parent node.
 * @param {string} className
 * @param {string} text
 */
export function addItemToList(parent, className, text) {
  const li = document.createElement("li");
  li.classList.add(className);
  li.textContent = text;
  parent.append(li);
}

/**
 * @param {Element} node
 */
export function hideNode(node) {
  node.style.visibility = 'hidden'
}

/**
 * @param {Element} input
 */
export function clearInput(input) {
  input.value = ''
}

/**
 * set input placeholder value
 * @param {Element} input
 * @param {string} text
 */
export function setInputPh(input, text) {
  input.placeholder = text
}

/**
 * @param {Element} node
 * @param {string} text
 */
export function setNodeText(node, text) {
  node.textContent = text
}
