import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFormData } from "./api/fetchFormData";
import {
  IForgotPasswordResponse,
  IInitialFormState,
} from "./interfaces";
import {IFetchUserData, ISetFetchUserData} from "../../../interfaces";
import { ApiUrl, LoadStatuses } from "../../../enums";

export const handleForgotPasswordFormSubmit = createAsyncThunk<
  IForgotPasswordResponse,
  IFetchUserData | ISetFetchUserData,
  {
    state: { form: IInitialFormState };
    rejectValue: { message: string };
  }
>(
  "form/handleForgotPasswordFormSubmit",
  async (formData, { rejectWithValue, getState }) => {
    const { formLoading } = getState().form;

    if (formLoading !== LoadStatuses.Pending) return;

    try {
      return await fetchFormData(ApiUrl.ForgotPassword, formData);
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);
