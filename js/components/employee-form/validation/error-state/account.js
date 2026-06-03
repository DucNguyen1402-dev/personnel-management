export const ACCOUNT_ERROR_STATE ={
    EMPTY: {
      type: "EMPTY",
      severity: "WARNING",
      message: "The account can't be empty.",
    },

    INVALID_LENGTH: {
      type: "INVALID_LENGTH",
      severity: "WARNING",
      message: "The account must contain 4 - 6 digits.",
    },

    INVALID_FORMAT: {
      type: "INVALID_FORMAT",
      severity: "WARNING",
      message: "The account must contain digits only.",
    },
  }