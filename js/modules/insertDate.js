/**
 * Changing nodes textContent option for date display.
 * @param {Object} nodes - object with elems where insert date
 * @param {Element} nodes.day
 * @param {Element} nodes.month
 * @param {Element} nodes.year
 */
export default function insertDate({day, month, year}) {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1; // why does January start at 0? JS why?
  const y = date.getFullYear();

  d < 10 ? (day.textContent = "0" + d) : (day.textContent = d);
  m < 10 ? (month.textContent = "0" + m) : (month.textContent = m);
  year.textContent = y
}
