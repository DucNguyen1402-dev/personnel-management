import { globalState, useCases, renders } from "./deps.js";

/**
 * Map of local table action types to their corresponding handler functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  SEARCH_EMPLOYEE: handleSearchEmployee,
  PREPARE_ADD_EMPLOYEE: handlePrepareAddEmployee,
  DELETE_ROW: handleDeleteRow,
  PREPARE_UPDATE_ROW: handlePrepareUpdateRow,

};

/**
 * Creates the internal component dispatch function injected with table dependencies.
 * @param {Object} deps - Consolidated table component dependencies.
 * @returns {Function} Higher-order dispatch function accepting a local action `{ type, payload }`.
 */
const createLocalDispatch = (deps) => (action) => {
  const actionHandler = actionHandlers[action.type];
  actionHandler?.(action, deps);
};


/**
 * Main controller factory for the Employee Table.
 * Manages local query filtering, action delegation hooks, and table body re-renders.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.employeeTableElements - Collection of table DOM elements.
 * @returns {Object} Core instance object containing `{ internal: { localDispatch }, api: { ui } }`.
 */
export function createEmployeeTableController({
  globalDispatch,
  employeeTableElements,
}) {
  const deps = {
    globalState,
    useCases,
    globalDispatch,
    employeeTableElements,
    renders,

  };

  const localDispatch = createLocalDispatch(deps);
  const { renderEmployeeTable , renderWithState} = deps.useCases;

  /** Encapsulated method to trigger a full re-render of the table rows using fresh state */
  const renderUI = () =>
    renderEmployeeTable({
      globalState: { employeeState: deps.globalState.employeeState },
      renders: { renderEmployeeRow: deps.renders.renderEmployeeRow },
      employeeTableElements: deps.employeeTableElements,
    });

  // Initial render when component bootstraps
  renderUI();
  return {
    internal: { localDispatch },
    api: {
      ui: {
        reRender: renderUI,
        renderWithState: (state) => renderWithState({
          state,
          renders: { renderEmployeeRow: deps.renders.renderEmployeeRow, renderNotFoundRow: deps.renders.renderNotFoundRow },
          employeeTableElements: deps.employeeTableElements,
        })
      },
    },
  };
}

/**
 * Internal Local Handler: Triggers search filtration use-case.
 * @param {Object} _action - Unused local action structure.
 * @param {Object} deps - Scoped table controller dependency object.
 */
function handleSearchEmployee(_action, deps) {
  const { searchEmployee } = deps.useCases;

  searchEmployee({
    globalState: { employeeState: deps.globalState.employeeState },
    globalDispatch: deps.globalDispatch,
    employeeTableElements: deps.employeeTableElements,
  });
}

/**
 * Internal Local Handler: Dispatches intent to switch form module into addition mode.
 * @param {Object} _action - Unused local action structure.
 * @param {Object} deps - Scoped table controller dependency object.
 */
function handlePrepareAddEmployee(_action, deps) {
  const { prepareAddEmployee } = deps.useCases;

  prepareAddEmployee({
    globalDispatch: deps.globalDispatch
  })
}


/**
 * Internal Local Handler: Executes row deletion workflow.
 * @param {Object} action - Local action structure containing target payload.
 * @param {string|number} action.payload - Employee ID to be deleted.
 * @param {Object} deps - Scoped table controller dependency object.
 */
function handleDeleteRow(action, deps) {

  const { executeDeleteRow } = deps.useCases;

  executeDeleteRow({
    deleteId: action.payload,
    globalState: { employeeState: deps.globalState.employeeState },
    globalDispatch: deps.globalDispatch,
    useCases: { renderEmployeeTable: deps.useCases.renderEmployeeTable },
    renders: { renderEmployeeRow: deps.renders.renderEmployeeRow },
    employeeTableElements: deps.employeeTableElements,
  })

}

/**
 * Internal Local Handler: Locates employee data and prepares form module for modification.
 * @param {Object} action - Local action structure containing target payload.
 * @param {string|number} action.payload - Employee ID to be updated.
 * @param {Object} deps - Scoped table controller dependency object.
 */
function handlePrepareUpdateRow(action, deps) {

  const { prepareUpdateRow } = deps.useCases;
  prepareUpdateRow({
    id: action.payload,
    globalDispatch: deps.globalDispatch,
    globalState: { employeeState: deps.globalState.employeeState },

  })
}