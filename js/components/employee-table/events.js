/**
 * Attaches event listeners for table search, addition, and row action delegations (edit/delete).
 * @param {Object} params
 * @param {Function} params.localDispatch - Table's internal component dispatch.
 * @param {Object} params.employeeTableElements - Extracted table DOM elements.
 * @param {HTMLButtonElement} params.employeeTableElements.searchBtn
 * @param {HTMLButtonElement} params.employeeTableElements.addEmployeeBtn
 * @param {HTMLTableSectionElement} params.employeeTableElements.tableBody
 */
export function initEmployeeTableEvents({
  localDispatch,
  employeeTableElements: { searchBtn, addEmployeeBtn, tableBody },
}) {
  searchBtn.addEventListener("click", () => {
    localDispatch({ type: "SEARCH_EMPLOYEE" });
  });
  addEmployeeBtn.addEventListener("click", () => {
    localDispatch({ type: "PREPARE_ADD_EMPLOYEE" });
  });

  // Event delegation for dynamically rendered row buttons
  tableBody.addEventListener("click", (e) => {

    const button = e.target.closest("button");
    if (!button) return;
    const action = button.dataset.action;

    const actionMap = {
      delete: "DELETE_ROW",
      edit: "PREPARE_UPDATE_ROW",
    };

    const type = actionMap[button.dataset.action];
    const row = button.closest("tr");
    const employeeId = row.dataset.id;
    localDispatch({
      type,
      payload: employeeId
    });
  })
}

