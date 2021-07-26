import reducer, {
  initialFormState,
  resetToDefault,
  handleForgotPasswordFormSubmit,
  handleResetPasswordFormSubmit,
  handleRegisterFormSubmit,
  handleLoginFormSubmit,
} from "./";
import { LOAD_STATUSES, MESSAGES } from "../../../constants";

describe(`Тест reducers компонента formSlice`, () => {
  it("Должен вернуть initialFormState", () =>
    expect(reducer(undefined, {})).toEqual(initialFormState));

  it("Должен вернуть стейт к начальному состонию", () => {
    expect(
      reducer(
        {
          formLoading: LOAD_STATUSES.PENDING,
          formPendingError: "test",
          formErrorMessage: "test",
          formPendingSuccess: "test",
          formPendingSuccessMessage: "test",
        },
        resetToDefault()
      )
    ).toEqual(initialFormState);
  });
});

describe("Тест handleForgotPasswordFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус PENDING и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "test" },
        {
          type: handleForgotPasswordFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LOAD_STATUSES.PENDING });
  });

  it("Должен вернуть сообщение Reset email sent при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleForgotPasswordFormSubmit.fulfilled,
          payload: { success: true, message: "Reset email sent" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingSuccess: { success: true, message: "Reset email sent" },
    });
  });

  it("Должен вернуть ошибку при Rejected промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleForgotPasswordFormSubmit.rejected,
          error: "Ошибка error",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });

  it("Должен вернуть ошибку при Rejected промисе с сообщением", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleForgotPasswordFormSubmit.rejected,
          payload: { message: "Ошибка error" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });
});

describe("Тест handleResetPasswordFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус PENDING и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "test" },
        {
          type: handleResetPasswordFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LOAD_STATUSES.PENDING });
  });
  


  it("Должен вернуть сообщение при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleResetPasswordFormSubmit.fulfilled,
          payload: { success: true, message: "Success reset" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingSuccess: { success: true, message: "Success reset" },
    });
  });

  it("Должен вернуть ошибку при Rejected промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleResetPasswordFormSubmit.rejected,
          error: "Ошибка error",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });
});

describe("Тест handleRegisterFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус PENDING и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "testError" },
        {
          type: handleRegisterFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LOAD_STATUSES.PENDING });
  });

  it("Должен вернуть сообщение Reset email sent при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleRegisterFormSubmit.fulfilled,
          payload: { success: true, message: "Success register" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingSuccess: { success: true, message: "Success register" },
    });
  });

  it("Должен вернуть ошибку при Rejected промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleRegisterFormSubmit.rejected,
          error: "Ошибка error handleRegisterFormSubmit",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleRegisterFormSubmit",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });

  it("Должен вернуть ошибку при Rejected промисе с сообщением", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleRegisterFormSubmit.rejected,
          payload: { message: "Ошибка error handleRegisterFormSubmit" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleRegisterFormSubmit",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });
});

describe("Тест handleLoginFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус PENDING и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "test handleLoginFormSubmit" },
        {
          type: handleLoginFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LOAD_STATUSES.PENDING });
  });

  it("Должен вернуть сообщение Reset email sent при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleLoginFormSubmit.fulfilled,
          payload: { success: true, message: "Success login" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingSuccess: { success: true, message: "Success login" },
    });
  });

  it("Должен вернуть ошибку при Rejected промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleLoginFormSubmit.rejected,
          error: "Ошибка error handleLoginFormSubmit",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleLoginFormSubmit",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });

  it("Должен вернуть ошибку при Rejected промисе с сообщением", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleLoginFormSubmit.rejected,
          payload: { message: "Ошибка error handleLoginFormSubmit" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleLoginFormSubmit",
      formErrorMessage: MESSAGES.ERRORS.RES_ERROR,
    });
  });

  it("Должен вернуть ошибку что пароль или email не верный", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LOAD_STATUSES.PENDING },
        {
          type: handleLoginFormSubmit.rejected,
          payload: { message: "email or password are incorrect" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "email or password are incorrect",
      formErrorMessage: MESSAGES.ERRORS.DATA_IS_INCORRECT,
    });
  });
});
