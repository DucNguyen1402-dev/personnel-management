export const createEmailValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value.trim() === "",
    error: ERROR_STATE.email.EMPTY,
  },

  {
    isInvalid: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    error: ERROR_STATE.email.INVALID_FORMAT,
  },
];
