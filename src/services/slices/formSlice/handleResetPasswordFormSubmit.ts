import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrl, LoadStatuses } from "../../../enums";
import { fetchFormData } from "./api/fetchFormData";
import { IInitialFormState } from "./interfaces";
import { IFetchUserData, ISetFetchUserData, IUser } from "../../../interfaces";

export const handleResetPasswordFormSubmit = createAsyncThunk<
  IUser,
  IFetchUserData | ISetFetchUserData,
  {
    state: { form: IInitialFormState };
    rejectValue: { message: string };
  }
>(
  "form/handleResetPasswordFormSubmit",
  async (formData, { rejectWithValue, getState }) => {
    const { formLoading } = getState().form;

    if (formLoading !== LoadStatuses.Pending) return;

    try {
      return await fetchFormData(ApiUrl.ResetPassword, formData);
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);
