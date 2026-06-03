/**
 * Filters employees by rank and updates the search result state.
 *
 * @param {Object} deps
 * @param {Object} deps.globalState
 * @param {Object} deps.globalState.employeeState
 * @param {Function} deps.globalDispatch
 * @param {Object} deps.employeeTableElements
 * @param {HTMLInputElement} deps.employeeTableElements.searchInput
 */
export function searchEmployee({
  globalState: { employeeState },
  globalDispatch,
  employeeTableElements: { searchInput }
}) {
  const keyword = searchInput.value.trim().toLowerCase();
  const employees = employeeState.getState();

  const result = keyword
    ? employees.filter(
        (employee) => employee.rank.toLowerCase() === keyword
      )
    : employees;

  globalDispatch({
    type: "SEARCH_EMPLOYEE",
    payload: result,
  });
}

/**
 * Use Case: Renders the entire employee list into the table container.
 * @param {Object} params
 * @param {Object} params.globalState - Global state tree containments.
 * @param {Object} params.globalState.employeeState
 * @param {Object} params.renders - Bound UI render utilities.
 * @param {Function} params.renders.renderEmployeeRow
 * @param {Object} params.employeeTableElements - Bound table DOM nodes.
 * @param {HTMLTableSectionElement} params.employeeTableElements.tableBody
 */
export function renderEmployeeTable({
  globalState: { employeeState },
  renders: { renderEmployeeRow },
  employeeTableElements: { tableBody },
}) {
  const list = employeeState.getState();
  tableBody.innerHTML = list.map(renderEmployeeRow).join("");
}

/**
 * Renders the employee table from the provided state.
 * Displays a "not found" row when the state is empty.
 *
 * @param {Object} deps
 * @param {Array} deps.state
 * @param {Object} deps.globalState
 * @param {Object} deps.renders
 * @param {Function} deps.renders.renderEmployeeRow
 * @param {Function} deps.renders.renderNotFoundRow
 * @param {Object} deps.employeeTableElements
 * @param {HTMLTableSectionElement} deps.employeeTableElements.tableBody
 */
export function renderWithState({
  state,
  renders: { renderEmployeeRow, renderNotFoundRow },
  employeeTableElements: { tableBody },
}) {
  if (state.length === 0) {

    tableBody.innerHTML = renderNotFoundRow();
  } else {
    tableBody.innerHTML = state.map(renderEmployeeRow).join("");
  }

}

/**
 * Pure helper function to remove an employee record by ID.
 * @param {string|number} id - Target employee ID.
 * @param {Array<Object>} list - Current raw list of employees.
 * @returns {Array<Object>} A filtered new array instance.
 */
function deleteRow(id, list) {
  const nextEmployees = list.filter(employee => employee.id !== id);
  return nextEmployees;
}

/**
 * Use Case: Triggers deletion handling, updates core state, and re-renders table UI.
 * @param {Object} params
 * @param {string|number} params.deleteId - Selected employee ID to drop.
 * @param {Object} params.globalState - Global state tree containments.
 * @param {Object} params.globalState.employeeState
 * @param {Function} params.globalDispatch - Global dispatcher function.
 * @param {Object} params.useCases - Bound local use case references.
 * @param {Function} params.useCases.renderEmployeeTable
 * @param {Object} params.renders - Bound UI render utilities.
 * @param {Function} params.renders.renderEmployeeRow
 * @param {Object} params.employeeTableElements - Bound table DOM nodes.
 */
export function executeDeleteRow({
  deleteId,
  globalState: { employeeState },
  globalDispatch,
  useCases: { renderEmployeeTable },
  renders: { renderEmployeeRow },
  employeeTableElements,
}) {
  const nextEmployee = deleteRow(
    deleteId,
    employeeState.getState(),
  );

  globalDispatch({
    type: "SET_EMPLOYEES",
    payload: nextEmployee,
  });


  renderEmployeeTable({
    globalState: { employeeState },
    renders: { renderEmployeeRow },
    employeeTableElements,
  });
}


/**
 * Use Case: Locates selected employee and dispatches setup state to load data back into form module.
 * @param {Object} params
 * @param {string|number} params.id - Selected employee target ID.
 * @param {Function} params.globalDispatch - Global dispatcher function.
 * @param {Object} params.globalState - Global state tree containments.
 * @param {Object} params.globalState.employeeState
 */
export function prepareUpdateRow({
  id,
  globalDispatch,
  globalState: { employeeState },

}) {
  const list = employeeState.getState();
  const target = list.find(employee => employee.id === id);
  globalDispatch({
    type: "PREPARE_UPDATE_EMPLOYEE",
    payload: target
  });
}

/**
 * Use Case: Dispatches empty intent notification to initialize form module into addition mode.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global dispatcher function.
 */
export function prepareAddEmployee({
  globalDispatch,
}) {
  globalDispatch({
    type: "PREPARE_ADD_EMPLOYEE"
  })
}