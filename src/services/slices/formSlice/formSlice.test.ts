import reducer, {
  handleForgotPasswordFormSubmit,
  handleLoginFormSubmit,
  handleRegisterFormSubmit,
  handleResetPasswordFormSubmit,
  initialFormState,
  resetToDefault,
} from "./";
import { ErrorMessages, LoadStatuses } from "../../../enums";

describe(`Тест reducers компонента formSlice`, () => {
  it("Должен вернуть initialFormState", () =>
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialFormState));

  it("Должен вернуть стейт к начальному состонию", () => {
    expect(
      reducer(
        {
          formLoading: LoadStatuses.Pending,
          formPendingError: "test",
          formErrorMessage: "test",
          formPendingSuccess: null,
          formPendingSuccessMessage: "test",
        },
        resetToDefault()
      )
    ).toEqual(initialFormState);
  });
});

describe("Тест handleForgotPasswordFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус Pending и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "test" },
        {
          type: handleForgotPasswordFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LoadStatuses.Pending });
  });

  it("Должен вернуть сообщение Reset email sent при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
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
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleForgotPasswordFormSubmit.rejected,
          error: "Ошибка error",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error",
      formErrorMessage: ErrorMessages.ResError,
    });
  });

  it("Должен вернуть ошибку при Rejected промисе с сообщением", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleForgotPasswordFormSubmit.rejected,
          payload: { message: "Ошибка error" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error",
      formErrorMessage: ErrorMessages.ResError,
    });
  });
});

describe("Тест handleResetPasswordFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус Pending и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "test" },
        {
          type: handleResetPasswordFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LoadStatuses.Pending });
  });

  it("Должен вернуть сообщение при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
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
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleResetPasswordFormSubmit.rejected,
          error: "Ошибка error",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error",
      formErrorMessage: ErrorMessages.ResError,
    });
  });
});

describe("Тест handleRegisterFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус Pending и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "testError" },
        {
          type: handleRegisterFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LoadStatuses.Pending });
  });

  it("Должен вернуть сообщение Reset email sent при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
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
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleRegisterFormSubmit.rejected,
          error: "Ошибка error handleRegisterFormSubmit",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleRegisterFormSubmit",
      formErrorMessage: ErrorMessages.ResError,
    });
  });

  it("Должен вернуть ошибку при Rejected промисе с сообщением", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleRegisterFormSubmit.rejected,
          payload: { message: "Ошибка error handleRegisterFormSubmit" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleRegisterFormSubmit",
      formErrorMessage: ErrorMessages.ResError,
    });
  });
});

describe("Тест handleLoginFormSubmit компонента formSlice", () => {
  it("Должен вернуть статус Pending и обнулить все данные при начале запроса", () => {
    expect(
      reducer(
        { ...initialFormState, formErrorMessage: "test handleLoginFormSubmit" },
        {
          type: handleLoginFormSubmit.pending,
        }
      )
    ).toEqual({ ...initialFormState, formLoading: LoadStatuses.Pending });
  });

  it("Должен вернуть сообщение Reset email sent при fullfiled промисе", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
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
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleLoginFormSubmit.rejected,
          error: "Ошибка error handleLoginFormSubmit",
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleLoginFormSubmit",
      formErrorMessage: ErrorMessages.ResError,
    });
  });

  it("Должен вернуть ошибку при Rejected промисе с сообщением", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleLoginFormSubmit.rejected,
          payload: { message: "Ошибка error handleLoginFormSubmit" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "Ошибка error handleLoginFormSubmit",
      formErrorMessage: ErrorMessages.ResError,
    });
  });

  it("Должен вернуть ошибку что пароль или email не верный", () => {
    expect(
      reducer(
        { ...initialFormState, formLoading: LoadStatuses.Pending },
        {
          type: handleLoginFormSubmit.rejected,
          payload: { message: "email or password are incorrect" },
        }
      )
    ).toEqual({
      ...initialFormState,
      formPendingError: "email or password are incorrect",
      formErrorMessage: ErrorMessages.DataIsIncorrect,
    });
  });
});
