/** * Mapping of validation severity levels to Tailwind CSS class configurations.
 * @type {Object.<string, string[]>} 
 */
const SEVERITY_MAP_TO_UI = {
  ERROR: ["bg-red-50", "text-red-700", "border-red-500"],
  WARNING: ["bg-yellow-50", "text-yellow-700", "border-yellow-500"],
};

/** @type {string[]} Flattened array of all validation styling classes for easy removal */
const ALL_CLASSES = Object.values(SEVERITY_MAP_TO_UI).flat();


/**
 * Renders the visual validation state (error/warning messages and borders) for a specific input field.
 * @param {Object} params
 * @param {Object} params.validationState - Current validation status of the field.
 * @param {boolean} params.validationState.isValid - Flag indicating if the input is valid.
 * @param {Object|null} params.validationState.error - Error details if invalid.
 * @param {string} params.validationState.error.message - The validation error message to display.
 * @param {string} params.validationState.error.severity - Severity level ('ERROR' or 'WARNING').
 * @param {HTMLElement} params.el - The target input element being validated.
 */
export function renderInputValidationState({
  validationState: { error, isValid },
  el,
}) {
  const errorUI = el.parentElement.parentElement.querySelector(".sp-thongbao");

  errorUI.classList.remove(...ALL_CLASSES);
  if (isValid) {
    errorUI.classList.add("hidden");
    return;
  }

  errorUI.textContent = error.message;

  errorUI.classList.add(...SEVERITY_MAP_TO_UI[error.severity]);
  errorUI.classList.remove("hidden");
}


export function clearInputValidationState(el) {
  const errorUI = el.parentElement.parentElement.querySelector(".sp-thongbao");
  errorUI.classList.remove(...ALL_CLASSES);
  errorUI.classList.add("hidden");
}


/**
 * Fills the form input elements with data from an employee object.
 * @param {Object} params
 * @param {Object} params.employee - The source employee data object.
 * @param {Object} params.formElements - Collection of form DOM nodes containing the `inputs` mapping.
 */
export function renderEmployeeForm({ employee, formElements }) {
  Object.entries(formElements.inputs).forEach(([type, el]) => {
    el.value = employee[type];
  })
}