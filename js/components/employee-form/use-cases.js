/**
 * Internal helper to validate all form inputs, render validation states, and check overall validity.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.formElements - Collection of form DOM nodes.
 * @param {Object} params.renders - Object containing render utilities.
 * @param {Function} params.renders.renderInputValidationState
 * @param {Object} params.validation - Object containing validation utilities.
 * @param {Function} params.validation.validateInput
 * @returns {boolean} True if all input fields pass validation, false otherwise.
 */
function validateInputs({
  globalDispatch,
  formElements,
  renders: { renderInputValidationState },
  validation: {validateInput}

}) {

  const validatedInputs = Object.entries(formElements.inputs).map(([type, el]) => ({
    validationState: validateInput({ type, value: el.value.trim() }),
    el,
  }));

  const allValid = validatedInputs.every(
    ({ validationState: { isValid } }) => isValid,
  );

  validatedInputs.forEach(({ validationState, el }) =>
    renderInputValidationState({validationState, el}),
  );

  return allValid;
}

/**
 * Use Case: Validates, extracts form data, and dispatches an action to add a new employee.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.formElements - Collection of form DOM nodes.
 * @param {Object} params.renders - UI rendering methods.
 * @param {Object} params.mappers - Form data mapping utilities.
 * @param {Function} params.mappers.extractFormValues
 * @param {Object} params.validation - Input validation utilities.
 */
export function addEmployee({
  globalDispatch,
  formElements,
  renders,
  mappers: { extractFormValues },
  validation
}) {

  const isAllInputValid = validateInputs({
    globalDispatch,
    formElements,
    renders,
    validation
  });
  if (!isAllInputValid) return;

  const employeeData = extractFormValues(formElements.inputs);
  globalDispatch({
    type: "ADD_EMPLOYEE",
    payload: employeeData,
  });
  formElements.employeeForm.reset();
}


/**
 * Use Case: Validates, extracts form data, and dispatches an action to update an existing employee.
 * @param {Object} params
 * @param {Function} params.globalDispatch - Global state dispatch function.
 * @param {Object} params.formElements - Collection of form DOM nodes.
 * @param {Object} params.renders - UI rendering methods.
 * @param {Object} params.mappers - Form data mapping utilities.
 * @param {Function} params.mappers.extractFormValues
 * @param {Object} params.validation - Input validation utilities.
 */
export function updateEmployee({
  globalDispatch,
  formElements,
  renders,
  mappers: { extractFormValues },
  validation
}) {
  const isAllInputValid = validateInputs({
    globalDispatch,
    formElements,
    renders,
    validation
  });
  if (!isAllInputValid) return;

  const updateData = extractFormValues(formElements.inputs);
  globalDispatch({
    type: "UPDATE_EMPLOYEE",
    payload: updateData,
  });
    formElements.employeeForm.reset();
}

