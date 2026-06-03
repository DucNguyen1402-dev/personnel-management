export const createPasswordValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value.trim() === "",
    error: ERROR_STATE.password.EMPTY,
  },

  {
    isInvalid: (value) => value.length < 6 || value.length > 10,
    error: ERROR_STATE.password.INVALID_LENGTH,
  },

  {
    isInvalid: (value) => !/[A-Z]/.test(value),
    error: ERROR_STATE.password.MISSING_UPPERCASE,
  },

  {
    isInvalid: (value) => !/\d/.test(value),
    error: ERROR_STATE.password.MISSING_NUMBER,
  },

  {
    isInvalid: (value) => !/[!@#$%^&*(),.?":{}|<>]/.test(value),
    error: ERROR_STATE.password.MISSING_SPECIAL_CHARACTER,
  },
];
