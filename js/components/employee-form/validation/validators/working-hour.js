export const createWorkingHoursValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value.trim() === "",
    error: ERROR_STATE.workingHours.EMPTY,
  },

  {
    isInvalid: (value) => Number.isNaN(Number(value)),
    error: ERROR_STATE.workingHours.INVALID_FORMAT,
  },

  {
    isInvalid: (value) => {
      const hours = Number(value);

      return hours < 80 || hours > 200;
    },

    error: ERROR_STATE.workingHours.OUT_OF_RANGE,
  },
];
