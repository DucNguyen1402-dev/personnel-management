export const WORKING_HOUR_ERROR_STATE = {
  EMPTY: {
    type: "EMPTY",
    severity: "WARNING",
    message: "The working hours can't be empty.",
  },

  INVALID_FORMAT: {
    type: "INVALID_FORMAT",
    severity: "WARNING",
    message: "The working hours must be a number.",
  },

  OUT_OF_RANGE: {
    type: "OUT_OF_RANGE",
    severity: "WARNING",
    message: "The working hours must be between 80 and 200.",
  },
};
