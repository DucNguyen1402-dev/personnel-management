import {createEmployeeTableController} from "./controller.js";
import {initEmployeeTableEvents} from "./events.js";

/**
 * Factory function to initialize the Employee Table component.
 * Links table DOM event handlers with internal controller logic and returns the public API.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.employeeTableElements - Collection of table DOM elements.
 * @returns {Object} Public API methods for the table component (`ui` object).
 */
export function createEmployeeTableComponent({
  globalDispatch,
  employeeTableElements,
}) {
   
    const {internal: {localDispatch}, api} = createEmployeeTableController({globalDispatch, employeeTableElements});

    initEmployeeTableEvents({localDispatch,employeeTableElements });


    return api;

}
