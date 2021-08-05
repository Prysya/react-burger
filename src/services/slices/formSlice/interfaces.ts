import { SerializedError } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces";
import { LoadStatuses } from "../../../enums";

export interface IInitialFormState {
  formLoading: LoadStatuses.Idle | LoadStatuses.Pending;
  formPendingError: string | SerializedError | null;
  formErrorMessage: string | null;
  formPendingSuccess: IUser | IForgotPasswordResponse | null;
  formPendingSuccessMessage: string | null;
}

export interface IForgotPasswordResponse {
  success: boolean;
  message: string;
}
