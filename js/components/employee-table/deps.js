import { employeeState } from "./index.js";
import { searchEmployee, prepareAddEmployee, renderEmployeeTable, prepareUpdateRow, executeDeleteRow, renderWithState} from "./use-cases.js";
import {renderEmployeeRow, renderNotFoundRow} from "./renders.js";


export const globalState = {employeeState};
export const useCases = { searchEmployee, prepareAddEmployee , renderEmployeeTable, prepareUpdateRow, executeDeleteRow, renderWithState};
export const renders = {renderEmployeeRow, renderNotFoundRow};


