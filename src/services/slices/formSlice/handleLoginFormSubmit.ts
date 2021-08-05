import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFormData } from "./api/fetchFormData";
import { IInitialFormState } from "./interfaces";
import { IFetchUserData, ISetFetchUserData, IUser } from "../../../interfaces";

import { ApiUrl, LoadStatuses } from "../../../enums";

export const handleLoginFormSubmit = createAsyncThunk<
  IUser,
  IFetchUserData | ISetFetchUserData,
  {
    state: { form: IInitialFormState };
    rejectValue: { message: string };
  }
>(
  "form/handleLoginFormSubmit",
  async (formData, { rejectWithValue, getState }) => {
    const { formLoading } = getState().form;

    if (formLoading !== LoadStatuses.Pending) return;

    try {
      return await fetchFormData(ApiUrl.Login, formData);
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);
