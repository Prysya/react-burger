import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrl, ErrorMessages, LoadStatuses } from "../../../enums";
import { fetchUserData } from "./api/fetchUserData";
import { ISetFetchUserData, IUser } from "../../../interfaces";
import { IInitialAuthState } from "./interfaces";
import { AppDispatch } from "../../store";
import { handleUpdateToken } from "./";

export const handleUpdateUserData = createAsyncThunk<
  IUser,
  ISetFetchUserData,
  {
    state: {
      auth: IInitialAuthState;
    };
    dispatch: AppDispatch;
    rejectValue: { message: string };
  }
>(
  "auth/handleUpdateUserData",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    const { accessTokenResponseStatus, refreshTokenResponseStatus } =
      getState().auth;

    if (accessTokenResponseStatus === LoadStatuses.Idle) return;

    try {
      return await fetchUserData(ApiUrl.UserData, "patch", formData);
    } catch (err) {
      if (
        err.message === ErrorMessages.AccessTokenIsUndefined ||
        err.response.data.message === "jwt expired"
      ) {
        if (refreshTokenResponseStatus === LoadStatuses.Idle) {
          await dispatch(handleUpdateToken(handleUpdateUserData(formData)));
          return;
        }
      }

      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);
