/** * Map of action types to their corresponding handler functions.
 * @type {Object.<string, Function>} 
 */
const actionHandlers = {
  ADD_EMPLOYEE: handleAddEmployee,
  UPDATE_EMPLOYEE: handleUpdateEmployee,
  EMPLOYEES_LOADED: hanldleEmployeeLoaded,
  SET_EMPLOYEES: handleSetEmployee,
  PREPARE_UPDATE_EMPLOYEE: handleUpdateEmployeePrepare,
  PREPARE_ADD_EMPLOYEE: handleAddEmployeePrepare,
  SEARCH_EMPLOYEE: handleSearchEmployee
};


/** @type {string|number|null} Track the ID of the employee being edited */
let updateID = null;

/**
 * Creates the global dispatch function injected with controller dependencies.
 * @param {Object} deps - Centralized dependency tree (`ui`, `model`, `globalState`, `globalStateServies`).
 * @returns {Function} Higher-order dispatch function accepting an action `{ type, payload }`.
 */
const createGlobalDispatch = (deps) => (action) => {
  const actionHandler = actionHandlers[action.type];
  actionHandler?.(action, deps);
};

/**
 * Creates a registry to dynamically build and structure the application dependency tree.
 * @param {Object} controllerDeps - The shared reference object holding all system dependencies.
 * @returns {Function} Function that returns the scoped registration methods.
 */
const createControllerRegistry = (controllerDeps) => () => {

  /**
   * Helper to deep-register items into the dependency object using dot-notation.
   * @param {string} path - Dot-separated path (e.g., 'ui.employeeForm').
   * @param {*} deps - Component instance, model, or services to register.
   */
  const register = (path, deps) => {
    const keys = path.split(".");

    let current = controllerDeps;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] ??= {};
      current = current[keys[i]];
    }

    const finalKey = keys[keys.length - 1];
    if (current[finalKey]) {
      throw new Error(`${label} "${path}" already exists`);
    }

    current[finalKey] = deps;
  };

  return {
    registerUI: (path, deps) => register(`ui.${path}`, deps),
    registerModel: (path, deps) => register(`model.${path}`, deps),
    registerGlobalState: (path, deps) => register(`globalState.${path}`, deps),
    registerGlobalStateServices: (path, deps) =>
      register(`globalStateServies.${path}`, deps),
  };
};


/**
 * Core factory to initialize the global state controller and registry management.
 * @returns {{ controllerRegistry: Function, globalDispatch: Function }}
 */
export function createGlobalController() {
  let controllerDeps = {};
  const globalDispatch = createGlobalDispatch(controllerDeps);

  const controllerRegistry = createControllerRegistry(controllerDeps);

  return { controllerRegistry, globalDispatch };
}



/**
 * Action Handler: Creates a new employee, saves to local storage, and refreshes the UI.
 * @param {Object} action - Action structure.
 * @param {Object} action.payload - Raw employee input data.
 * @param {Object} deps - Destruction of required application dependencies.
 */
function handleAddEmployee(action, deps) {


  const {
    globalStateServies: {
      employee: { saveEmployeesToLocalStorage },
    },
    globalState: {
      employee: { employeeState },
    },
    ui: {
      employeeForm: { closeForm },
      employeeTable: { reRender }
    },
    model: {
      Employee
    }
  } = deps;
  const employee = new Employee(action.payload);
  employeeState.add(employee);
  saveEmployeesToLocalStorage(employeeState.getState());
  closeForm();
  reRender();
}


/**
 * Action Handler: Prepares the UI form for updating an employee and stores their ID.
 * @param {Object} action - Action structure.
 * @param {Object} action.payload - The employee data object to edit.
 * @param {Object} deps - Application dependencies tree.
 */
function handleUpdateEmployeePrepare(action, deps) {
  const { ui: { employeeForm } } = deps;

  employeeForm.showFormUpdate();
  employeeForm.fillForm(action.payload);

  updateID = action.payload.id;

}

/**
 * Action Handler: Prepares the UI form for adding a new employee.
 * @param {Object} _action - Unused action object.
 * @param {Object} deps - Application dependencies tree.
 */
function handleAddEmployeePrepare(_action, deps) {
  const { ui: { employeeForm } } = deps;

  employeeForm.showFormAdd();

}

/**
 * Action Handler: Updates an existing employee's data, persists it, and resets state.
 * @param {Object} action - Action structure.
 * @param {Object} action.payload - Updated raw employee data.
 * @param {Object} deps - Application dependencies tree.
 */
function handleUpdateEmployee(action, deps) {
  const {
    globalStateServies: {
      employee: { saveEmployeesToLocalStorage },
    },
    globalState: {
      employee: { employeeState },
    },
    ui: {
      employeeForm: { closeForm, fillForm },
      employeeTable: { reRender }
    },
    model: {
      Employee
    }
  } = deps;


  const updated = new Employee(action.payload);
  updated.id = updateID;

  const list = employeeState.getState();
  const next = list.map(employee => employee.id === updateID ? updated : employee);
  employeeState.setState(next);
  saveEmployeesToLocalStorage(employeeState.getState());

  updateID = null;
  closeForm();
  reRender();
}

/**
 * Action Handler: Initializes the employee state with loaded data from storage.
 * @param {Object} action - Action structure.
 * @param {Array<Object>} action.payload - Array of loaded employee records.
 * @param {Object} deps - Application dependencies tree.
 */

function hanldleEmployeeLoaded(action, deps) {

  const { globalState: {
    employee: { employeeState },
  },
  } = deps;


  employeeState.setState(action.payload);
}

/**
 * Action Handler: Explicitly overwrites the core employee state list.
 * @param {Object} action - Action structure.
 * @param {Array<Object>} action.payload - New array of employees.
 * @param {Object} deps - Application dependencies tree.
 */
function handleSetEmployee(action, deps) {
  const {
    globalState: {
      employee: { employeeState },

    }, globalStateServies: {
      employee: { saveEmployeesToLocalStorage },
    }, } = deps;


  employeeState.setState(action.payload);
  saveEmployeesToLocalStorage(employeeState.getState());

}

/**
 * SEARCH_EMPLOYEE:
 * Render the employee list returned by the search operation.
 */
function handleSearchEmployee(action, deps) {
  const {
    ui: {
      employeeTable: { renderWithState }
    },
  } = deps;

  renderWithState(action.payload);
}