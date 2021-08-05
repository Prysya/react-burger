import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrl, ErrorMessages, LoadStatuses } from "../../../enums";
import { fetchUserData } from "./api/fetchUserData";
import { IUser } from "../../../interfaces";
import { IInitialAuthState } from "./interfaces";
import { AppDispatch } from "../../store";
import { handleUpdateToken } from "./index";

export const handleGetUserData = createAsyncThunk<
  IUser,
  void,
  {
    state: {
      auth: IInitialAuthState;
    };
    dispatch: AppDispatch;
    rejectValue: { message: string };
  }
>(
  "auth/handleGetUserData",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const { accessTokenResponseStatus, refreshTokenResponseStatus } =
      getState().auth;

    if (accessTokenResponseStatus === LoadStatuses.Idle) return;

    try {
      return await fetchUserData(ApiUrl.UserData, "get");
    } catch (err) {
      if (
        err.message === ErrorMessages.AccessTokenIsUndefined ||
        err.response.data.message === "jwt expired"
      ) {
        if (refreshTokenResponseStatus === LoadStatuses.Idle) {
          await dispatch(handleUpdateToken(""));
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
