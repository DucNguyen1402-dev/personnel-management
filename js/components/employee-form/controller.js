import { useCases, mappers, ui, renders, validation } from "./deps.js";

/**
 * Map of local action types to their corresponding handler functions.
 * @type {Object.<string, Function>}
 */
const actionHandlers = {
  ADD_EMPLOYEE: handleAddEmployee,
  UPDATE_EMPLOYEE: handleUpdateEmployee,
};

/**
 * Creates the internal component dispatch function injected with specific form dependencies.
 * @param {Object} deps - Consolidated component dependencies object.
 * @returns {Function} Higher-order dispatch function accepting a local action `{ type }`.
 */
const createLocalDispatch = (deps) => (action) => {
  const actionHandler = actionHandlers[action.type];
  actionHandler?.(action, deps);
};

/**
 * Main controller factory for the Employee Form.
 * Sets up dependency containment, local state management, and the public UI control API.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.formElements - Collection of form DOM elements.
 * @returns {Object} Core instance object containing `{ internal: { localDispatch }, api: { ui } }`.
 */
export function createEmployeeFormController({ globalDispatch, formElements }) {
  const deps = {
    useCases,
    globalDispatch,
    mappers,
    ui,
    formElements,
    renders,
    validation,
  };

  const localDispatch = createLocalDispatch(deps);

  const { showBtn, hideBtn } = ui;
  const { renderEmployeeForm, clearInputValidationState } = renders;
  const { closeBtn, employeeForm, addBtn, updateBtn, inputs } = formElements;
  return {
    internal: { localDispatch },
    api: {
      ui: {
        /** Displays the 'update' button and hides the 'add' button for editing. */
        showFormUpdate: () => {
          Object.entries(inputs).forEach(([type, el]) => clearInputValidationState(el));
          showBtn(updateBtn);
          hideBtn(addBtn);

        },
        /** Resets the form UI and prepares button states for creation. */
        showFormAdd: () => {
          employeeForm.reset();
          Object.entries(inputs).forEach(([type, el]) => clearInputValidationState(el));
          showBtn(addBtn);
          hideBtn(updateBtn);
        },
        /**
         * Populates form fields with specific data.
         * @param {Object} employee - Employee record data object.
         */
        fillForm: (employee) => {
          renderEmployeeForm({ employee, formElements });
        },
        /** Triggers the click event on the modal closing node. */
        closeForm: () => closeBtn.click()
      },
    },
  };
}

/**
 * Internal Local Handler: Triggers the validation and creation lifecycle use-case.
 * @param {Object} _action - Unused local action structure.
 * @param {Object} deps - Scoped controller dependency object.
 */
function handleAddEmployee(_action, deps) {
  const { addEmployee } = deps.useCases;

  addEmployee({
    globalDispatch: deps.globalDispatch,
    formElements: deps.formElements,
    renders: {
      renderInputValidationState: deps.renders.renderInputValidationState,
    },
    mappers: { extractFormValues: deps.mappers.extractFormValues },
    validation: { validateInput: deps.validation.validateInput }
  });
}

/**
 * Internal Local Handler: Triggers the validation and modification lifecycle use-case.
 * @param {Object} _action - Unused local action structure.
 * @param {Object} deps - Scoped controller dependency object.
 */
function handleUpdateEmployee(_action, deps) {
  const { updateEmployee } = deps.useCases;
  updateEmployee({
    globalDispatch: deps.globalDispatch,
    formElements: deps.formElements,
    renders: {
      renderInputValidationState: deps.renders.renderInputValidationState,
    },
    mappers: { extractFormValues: deps.mappers.extractFormValues },
    validation: { validateInput: deps.validation.validateInput }
  });
}


