export const createBaseSalaryValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value.trim() === "",
    error: ERROR_STATE.baseSalary.EMPTY,
  },

  {
    isInvalid: (value) => Number.isNaN(Number(value)),
    error: ERROR_STATE.baseSalary.INVALID_FORMAT,
  },

  {
    isInvalid: (value) => {
      const salary = Number(value);

      return salary < 1_000_000 || salary > 20_000_000;
    },

    error: ERROR_STATE.baseSalary.OUT_OF_RANGE,
  },
];
