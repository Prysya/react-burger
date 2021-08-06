import {createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {ErrorMessages, LoadStatuses, SuccessMessages} from "../../../enums";
import {handleForgotPasswordFormSubmit} from "./handleForgotPasswordFormSubmit";
import {handleResetPasswordFormSubmit} from "./handleResetPasswordFormSubmit";
import {handleRegisterFormSubmit} from "./handleRegisterFormSubmit";
import {handleLoginFormSubmit} from "./handleLoginFormSubmit";
import {IInitialFormState} from "./interfaces";

export const initialFormState: IInitialFormState = {
  formLoading: LoadStatuses.Idle,
  formPendingError: null,
  formErrorMessage: null,
  formPendingSuccess: null,
  formPendingSuccessMessage: null,
};

const formSlice = createSlice({
  name: "form",
  initialState: initialFormState,
  reducers: {
    resetToDefault: (state) => {
      state.formLoading = LoadStatuses.Idle;
      state.formPendingError = null;
      state.formErrorMessage = null;
      state.formPendingSuccess = null;
      state.formPendingSuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    for (const thunk of [
      handleForgotPasswordFormSubmit,
      handleResetPasswordFormSubmit,
      handleRegisterFormSubmit,
      handleLoginFormSubmit,
    ]) {
      builder.addCase(thunk.pending, (state) => {
        if (state.formLoading === LoadStatuses.Idle) {
          state.formLoading = LoadStatuses.Pending;
          state.formPendingError = null;
          state.formPendingSuccess = null;
          state.formErrorMessage = null;
          state.formPendingSuccessMessage = null;
        }
      });
      builder.addCase(thunk.fulfilled, (state, action) => {
        if (state.formLoading === LoadStatuses.Pending) {
          state.formLoading = LoadStatuses.Idle;
          state.formPendingSuccess = action.payload;
        }
      });
      builder.addCase(thunk.rejected, (state, action) => {
        if (state.formLoading === LoadStatuses.Pending) {
          state.formLoading = LoadStatuses.Idle;
          if (action.payload?.message) {
            state.formPendingError = action.payload.message;
          } else {
            state.formPendingError = action?.error;
          }

          state.formErrorMessage =
            state.formPendingError === "email or password are incorrect"
              ? ErrorMessages.DataIsIncorrect
              : ErrorMessages.ResError;
        }
      });
    }

    builder.addMatcher(
      isFulfilled(handleResetPasswordFormSubmit),
      (state, action) => {
        if (action.payload?.success) {
          state.formPendingSuccessMessage = SuccessMessages.PasswordSuccess;
        }
      }
    );
    builder.addMatcher(
      isRejected(handleResetPasswordFormSubmit),
      (state, action) => {
        if (action.payload?.message === "Incorrect reset token") {
          state.formErrorMessage = ErrorMessages.TokenError;
        }
      }
    );
  },
});

export {
  handleForgotPasswordFormSubmit,
  handleResetPasswordFormSubmit,
  handleRegisterFormSubmit,
  handleLoginFormSubmit,
};
export const { resetToDefault } = formSlice.actions;
export default formSlice.reducer;
