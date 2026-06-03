export const createPositionValidator = (ERROR_STATE) => [
  {
    isInvalid: (value) => value === "",
    error: ERROR_STATE.position.EMPTY,
  },

  {
    isInvalid: (value) => !["sep", "truong-phong", "nhan-vien"].includes(value),

    error: ERROR_STATE.position.INVALID_POSITION,
  },
];
