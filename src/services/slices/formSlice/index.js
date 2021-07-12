import { createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { LOAD_STATUSES, MESSAGES } from "../../../constants";
import { handleForgotPasswordFormSubmit } from "./handleForgotPasswordFormSubmit";
import { handleResetPasswordFormSubmit } from "./handleResetPasswordFormSubmit";
import { handleRegisterFormSubmit } from "./handleRegisterFormSubmit";
import { handleLoginFormSubmit } from "./handleLoginFormSubmit";

const initialState = {
  formLoading: LOAD_STATUSES.IDLE,
  formPendingError: null,
  formErrorMessage: null,
  formPendingSuccess: null,
  formPendingSuccessMessage: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
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
          state.formSuccessMessage = null;
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
          state.formPendingError = action?.error || null;
          state.formErrorMessage = MESSAGES.ERRORS.RES_ERROR;
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
