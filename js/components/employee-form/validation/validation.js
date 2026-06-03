import {
  ACCOUNT_ERROR_STATE,
  NAME_ERROR_STATE,
  EMAIL_ERROR_STATE,
  PASSWORD_ERROR_STATE,
  BASE_SALARY_ERROR_STATE,
  POSITION_ERROR_STATE,
  WORKDATE_ERROR_STATE,
  WORKING_HOUR_ERROR_STATE,
} from "./error-state/index.js";

import {
  createAccountValidator,
  createNameValidator,
  createEmailValidator,
  createPasswordValidator,
  createWorkDateValidator,
  createBaseSalaryValidator,
  createPositionValidator,
  createWorkingHoursValidator
} from "./validators/index.js";

/** * Frozen lookup configuration mapping field names to their specific static error definitions.
 * @type {Readonly<Object.<string, Object>>} 
 */
const ERROR_STATE = Object.freeze({
  account: ACCOUNT_ERROR_STATE ,
  name: NAME_ERROR_STATE,
  email: EMAIL_ERROR_STATE ,
  password: PASSWORD_ERROR_STATE ,
  workDate: WORKDATE_ERROR_STATE ,
  baseSalary: BASE_SALARY_ERROR_STATE ,
  position: POSITION_ERROR_STATE ,
  workingHours: WORKING_HOUR_ERROR_STATE,
});

/** * Lookup dictionary initializing rule arrays for each field type.
 * @type {Object.<string, Array<{ isInvalid: Function, error: Object }>>} 
 */
const inputValidators = {
  account: createAccountValidator(ERROR_STATE),
  name: createNameValidator(ERROR_STATE),
  email: createEmailValidator(ERROR_STATE),
  password: createPasswordValidator(ERROR_STATE),
  workDate: createWorkDateValidator(ERROR_STATE),
  baseSalary: createBaseSalaryValidator(ERROR_STATE),
  position: createPositionValidator(ERROR_STATE),
  workingHours: createWorkingHoursValidator(ERROR_STATE),
};


/**
 * Iterates through factory-defined rules sequentially to catch the first validation error.
 * @param {Object} params
 * @param {string} params.type - Target field name configuration key.
 * @param {string|number} params.value - User string or transformed input value.
 * @returns {{ isValid: boolean, error: Object|null }} Result structure mapping validation state.
 */
function validate({ type, value }) {
  const validators = inputValidators[type];

  for (const v of validators) {
    if (v.isInvalid(value)) {
      return { isValid: false, error: v.error };
    }
  }

  return { isValid: true, error: null };
}
/**
 * Public validation endpoint interfacing out to external UI use cases.
 * @param {{ type: string, value: (string|number) }} input - Standard wrapper structure.
 * @returns {{ isValid: boolean, error: Object|null }}
 */
export function validateInput(input) {
  return validate(input);
}
