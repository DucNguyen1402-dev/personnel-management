export const WORKDATE_ERROR_STATE = {
  EMPTY: {
    type: "EMPTY",
    severity: "WARNING",
    message: "The work date can't be empty.",
  },

  INVALID_FORMAT: {
    type: "INVALID_FORMAT",
    severity: "WARNING",
    message: "The work date format must be mm/dd/yyyy.",
  },

  INVALID_DATE: {
    type: "INVALID_DATE",
    severity: "WARNING",
    message: "The work date is invalid.",
  },
};
