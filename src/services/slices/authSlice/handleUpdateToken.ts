import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrl, LoadStatuses } from "../../../enums";
import { fetchTokenSend } from "./api/fetchTokenSend";
import { IInitialAuthState, IUpdateToken } from "./interfaces";
import { AppDispatch } from "../../store";

export const handleUpdateToken = createAsyncThunk<
  IUpdateToken,
  any,
  {
    state: {
      auth: IInitialAuthState;
    },
    dispatch: AppDispatch;
    rejectValue: { message: string };
  }
>(
  "auth/handleUpdateToken",
  async (afterRefreshAction, {getState, dispatch, rejectWithValue}) => {
    const { refreshTokenResponseStatus } = getState().auth;

    if (refreshTokenResponseStatus === LoadStatuses.Idle) return;

    try {
      const data = await fetchTokenSend(ApiUrl.TokenReset);

      if (afterRefreshAction) {
        dispatch(await afterRefreshAction);
      }

      return data;
    } catch (e) {
      if (!e.response) {
        throw e;
      }

      return rejectWithValue(e.response.data);
    }
  }
);
