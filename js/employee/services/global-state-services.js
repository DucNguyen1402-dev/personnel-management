import { Employee } from "../model/Employee.js";
const EMPLOYEES_STORAGE_KEY = "employees";

export function saveEmployeesToLocalStorage(employees) {
  localStorage.setItem(
    EMPLOYEES_STORAGE_KEY,
    JSON.stringify(employees)
  );
}

export function getEmployeesFromLocalStorage() {
  const raw = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  const employeeObjects = JSON.parse(raw);

  return employeeObjects.map(
    (employeeObject) => new Employee(employeeObject)
  );
}