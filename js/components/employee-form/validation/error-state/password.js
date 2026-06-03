export const PASSWORD_ERROR_STATE = {
  EMPTY: {
    type: "EMPTY",
    severity: "WARNING",
    message: "The password can't be empty.",
  },

  INVALID_LENGTH: {
    type: "INVALID_LENGTH",
    severity: "WARNING",
    message: "The password must contain 6 - 10 characters.",
  },

  MISSING_UPPERCASE: {
    type: "MISSING_UPPERCASE",
    severity: "WARNING",
    message: "The password must contain at least one uppercase letter.",
  },

  MISSING_NUMBER: {
    type: "MISSING_NUMBER",
    severity: "WARNING",
    message: "The password must contain at least one number.",
  },

  MISSING_SPECIAL_CHARACTER: {
    type: "MISSING_SPECIAL_CHARACTER",
    severity: "WARNING",
    message: "The password must contain at least one special character.",
  },
};
