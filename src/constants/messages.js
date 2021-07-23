export const MESSAGES = {
  ERRORS: {
    DATA_IS_UNDEFINED: "data отстуствует или не является массивом",
    ORDER_NUMBER_IS_UNDEFINED: "В ответе от сервера отсутствует номер заказа",
    RES_ERROR: 'Произошла ошибка при обработке запроса',
    TOKEN_ERROR: 'Ошибка кода из письма',
    ACCESS_TOKEN_IS_UNDEFINED: 'Access token просрочен или отсутствует',
    REFRESH_TOKEN_IS_UNDEFINED: 'Refresh token просрочен или отсутствует',
    DATA_IS_INCORRECT: 'E-mail или пароль введены неверно, исправьте и попробуйте снова.'
  },
  VALIDATION_ERRORS: {
    IS_STRING: 'Значение должно быть строкой',
    IS_REQUIRED: 'Это обязательное поле',
    IS_EMAIL: 'E-mail невалиден',
    IS_PASSWORD: 'Пароль должен быть не менее 8 символов'
  },
  SUCCESS: {
    PASSWORD_SUCCESS: 'Пароль успешно восстановлен'
  }
};
