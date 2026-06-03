import {createEmployeeTableComponent } from "../components/employee-table/component.js";

/**
 * Bootstraps and queries DOM elements for the Employee Table component.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @returns {Object} Instantiated table component.
 */
export function bootstrapEmployeeTableComponent({ globalDispatch }) {
  const rootElement = document.querySelector('[data-role="employee-table-container"]');


  const employeeTableElements = {
    searchBtn: rootElement.querySelector('[data-action ="search"]'),
    searchInput: rootElement.querySelector('[data-role="search-input"]'),
    tableBody: rootElement.querySelector('[data-role="table-body"]'),
    addEmployeeBtn: rootElement.querySelector('[data-action="prepare-add-employee"]'),
  };

  return createEmployeeTableComponent({ globalDispatch, employeeTableElements });
}

