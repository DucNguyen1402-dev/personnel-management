import { initEmployeeFormEvents } from "./events.js";
import { createEmployeeFormController } from "./controller.js"

/**
 * Factory function to initialize the Employee Form component.
 * Links local event listeners with internal controllers and exposes the public API.
 * * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.formElements - Collection of form DOM elements.
 * @returns {Object} Public API methods for the form component (`ui` object).
 */
export function createEmployeeFormComponent({ globalDispatch, formElements }) {

    const { internal: { localDispatch }, api } = createEmployeeFormController({ globalDispatch, formElements });

    initEmployeeFormEvents({ localDispatch, formElements });


    return api;
}