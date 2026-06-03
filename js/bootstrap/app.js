import { bootstrapEmployeeFormComponent, bootstrapEmployeeTableComponent } from "./index.js";
import { createGlobalController } from "../controller.js";
import { employeeState} from "../employee/store/global-state.js";
import {saveEmployeesToLocalStorage, getEmployeesFromLocalStorage} from "../employee/services/global-state-services.js";
import { Employee } from "../employee/model/employee.js";


/**
 * Initializes the application by setting up the global controller, 
 * registering core dependencies, loading initial data, and bootstrapping UI components.
 */
export function initApp() {


  const { globalDispatch, controllerRegistry } = createGlobalController();

  // Register state, services, and models to the registry
  const { registerUI, registerGlobalState, registerGlobalStateServices, registerModel } = controllerRegistry();

  
  registerGlobalStateServices("employee", { saveEmployeesToLocalStorage, getEmployeesFromLocalStorage });
  registerGlobalState("employee", { employeeState });
  registerModel("Employee", Employee);

// Load initial data from storage and sync to global state
  const employees = getEmployeesFromLocalStorage();
  globalDispatch({
    type: "EMPLOYEES_LOADED",
    payload: employees,
  });

  // Bootstrap UI components with global dispatch
  const employeeForm = bootstrapEmployeeFormComponent({ globalDispatch });
  const employeeTable = bootstrapEmployeeTableComponent({ globalDispatch });

// Register UI instances to the core controller
  registerUI("employeeForm", employeeForm.ui);
  registerUI("employeeTable", employeeTable.ui);


}

