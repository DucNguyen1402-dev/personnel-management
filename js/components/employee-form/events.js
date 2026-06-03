/**
 * Attaches click event listeners to the form action buttons.
 * @param {Object} params
 * @param {Function} params.localDispatch - Form's internal component dispatch.
 * @param {Object} params.formElements - Extracted button DOM elements.
 * @param {HTMLButtonElement} params.formElements.addBtn
 * @param {HTMLButtonElement} params.formElements.updateBtn
 */
export function initEmployeeFormEvents({
  localDispatch,
  formElements: { addBtn, updateBtn },
}) {
  addBtn.addEventListener("click", () => {
    localDispatch({ type: "ADD_EMPLOYEE" });
  });

  updateBtn.addEventListener("click", () => {
    localDispatch({ type: "UPDATE_EMPLOYEE" });
  });

}
