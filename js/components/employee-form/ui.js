/**
 * Toggles the visibility of a DOM element by adding or removing the 'hidden' class.
 * @param {HTMLElement} el - The target DOM element.
 * @param {boolean} isVisible - True to show the element, false to hide it.
 */
export function setBtnVisibility(el, isVisible) {
  el.classList.toggle("hidden", !isVisible);
}

/**
 * Shows a DOM element by removing the 'hidden' class.
 * @param {HTMLElement} el - The target DOM element.
 */
export function showBtn(el) {
  setBtnVisibility(el, true);
}

/**
 * Hides a DOM element by adding the 'hidden' class.
 * @param {HTMLElement} el - The target DOM element.
 */
export function hideBtn(el) {
  setBtnVisibility(el, false);
}