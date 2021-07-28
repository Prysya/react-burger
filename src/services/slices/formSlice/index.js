import { createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { LOAD_STATUSES, MESSAGES } from "../../../constants";
import { handleForgotPasswordFormSubmit } from "./handleForgotPasswordFormSubmit";
import { handleResetPasswordFormSubmit } from "./handleResetPasswordFormSubmit";
import { handleRegisterFormSubmit } from "./handleRegisterFormSubmit";
import { handleLoginFormSubmit } from "./handleLoginFormSubmit";

export const initialFormState = {
  formLoading: LOAD_STATUSES.IDLE,
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
      state.formLoading = LOAD_STATUSES.IDLE;
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
        if (state.formLoading === LOAD_STATUSES.IDLE) {
          state.formLoading = LOAD_STATUSES.PENDING;
          state.formPendingError = null;
          state.formPendingSuccess = null;
          state.formErrorMessage = null;
          state.formPendingSuccessMessage = null;
        }
      });
      builder.addCase(thunk.fulfilled, (state, action) => {
        if (state.formLoading === LOAD_STATUSES.PENDING) {
          state.formLoading = LOAD_STATUSES.IDLE;
          state.formPendingSuccess = action.payload;
        }
      });
      builder.addCase(thunk.rejected, (state, action) => {
        if (state.formLoading === LOAD_STATUSES.PENDING) {
          state.formLoading = LOAD_STATUSES.IDLE;
          if (action.payload?.message) {
            state.formPendingError = action.payload.message;
          } else {
            state.formPendingError = action?.error;
          }

          state.formErrorMessage =
            state.formPendingError === "email or password are incorrect"
              ? MESSAGES.ERRORS.DATA_IS_INCORRECT
              : MESSAGES.ERRORS.RES_ERROR;
        }
      });
    }

    builder.addMatcher(
      isFulfilled(handleResetPasswordFormSubmit),
      (state, action) => {
        if (action.payload?.success) {
          state.formPendingSuccessMessage = MESSAGES.SUCCESS.PASSWORD_SUCCESS;
        }
      }
    );
    builder.addMatcher(
      isRejected(handleResetPasswordFormSubmit),
      (state, action) => {
        if (action.payload?.message === "Incorrect reset token") {
          state.formErrorMessage = MESSAGES.ERRORS.TOKEN_ERROR;
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
