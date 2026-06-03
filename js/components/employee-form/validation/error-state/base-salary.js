export const BASE_SALARY_ERROR_STATE = {
  EMPTY: {
    type: "EMPTY",
    severity: "WARNING",
    message: "The base salary can't be empty.",
  },

  INVALID_FORMAT: {
    type: "INVALID_FORMAT",
    severity: "WARNING",
    message: "The base salary must be a number.",
  },

  OUT_OF_RANGE: {
    type: "OUT_OF_RANGE",
    severity: "WARNING",
    message: "The base salary must be between 1,000,000 and 20,000,000.",
  },
};
