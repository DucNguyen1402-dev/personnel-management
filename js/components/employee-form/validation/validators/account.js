export const createAccountValidator = (ERROR_STATE) =>[
    {
      isInvalid: (value) => value.trim() === "",
      error: ERROR_STATE.account.EMPTY,
    },

    {
      isInvalid: (value) => value.length < 4 || value.length > 6,
      error: ERROR_STATE.account.INVALID_LENGTH,
    },

    {
      isInvalid: (value) => !/^\d+$/.test(value),
      error: ERROR_STATE.account.INVALID_FORMAT,
    },
  ]