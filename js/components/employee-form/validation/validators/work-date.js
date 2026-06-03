export const createWorkDateValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value.trim() === "",
    error: ERROR_STATE.workDate.EMPTY,
  },

  {
    isInvalid: (value) =>
      !/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(value),
    error: ERROR_STATE.workDate.INVALID_FORMAT,
  },

  {
    isInvalid: (value) => {
      const [month, day, year] = value.split("/").map(Number);

      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      );
    },

    error: ERROR_STATE.workDate.INVALID_DATE,
  },
];
