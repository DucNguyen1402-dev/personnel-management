import {createEmployeeFormComponent } from "../components/employee-form/component.js";

/**
 * Bootstraps and queries DOM elements for the Employee Form component.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @returns {Object} Instantiated form component.
 */

export function bootstrapEmployeeFormComponent({ globalDispatch }) {
  const rootElement = document.querySelector('[data-role="modal-form-container"]');

  /** @type {Object} collection of form DOM nodes */
  const formElements = {
    employeeForm : rootElement.querySelector('[data-role = "employee-form"]'),
    inputs: {
      account: rootElement.querySelector('[data-role="account-input"]'),

      name: rootElement.querySelector('[data-role="employee-name-input"]'),

      email: rootElement.querySelector('[data-role="email-input"]'),

      password: rootElement.querySelector('[data-role="password-input"]'),

      workDate: rootElement.querySelector('[data-role="work-date-input"]'),

      baseSalary: rootElement.querySelector('[data-role="base-salary-input"]'),

      position: rootElement.querySelector('[data-role="position-select"]'),

      workingHours: rootElement.querySelector(
        '[data-role="working-hours-input"]',
      ),
    },
    addBtn: rootElement.querySelector('[data-action="add"]'),
    updateBtn: rootElement.querySelector('[data-action="update"]'),
    closeBtn: rootElement.querySelector('[data-action="close"]')
  };

  return createEmployeeFormComponent({ globalDispatch, formElements });
}
