export const createNameValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value.trim() === "",
    error: ERROR_STATE.name.EMPTY,
  },

  {
    isInvalid: (value) => !/^[a-zA-ZÀ-ỹ\s]+$/.test(value),
    error: ERROR_STATE.name.INVALID_FORMAT,
  },
];
