import { addEmployee, updateEmployee } from "./use-cases.js";
import { showBtn, hideBtn } from "./ui.js";
import { renderInputValidationState , renderEmployeeForm} from "./renders.js"
import { extractFormValues } from "./mappers.js"
import { validateInput } from "./validation/validation.js"

/**
 * Centralized dependency object containing all modules required by the Employee Form.
 * @type {Object}
 */

export const useCases = { addEmployee, updateEmployee }
export const mappers = { extractFormValues };
export const ui = {
    showBtn, hideBtn
};
export const renders = { renderInputValidationState,renderEmployeeForm  };
export const validation = { validateInput }
