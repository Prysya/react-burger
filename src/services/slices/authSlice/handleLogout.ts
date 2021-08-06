import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiUrl, LoadStatuses } from "../../../enums";
import { fetchTokenSend } from "./api/fetchTokenSend";
import { IInitialAuthState } from "./interfaces";

export const handleLogout = createAsyncThunk<
  Response,
  void,
  {
    state: {
      auth: IInitialAuthState;
    };
    rejectValue: { message: string };
  }
>("auth/handleLogout", async (_, { rejectWithValue, getState }) => {
  const { refreshTokenResponseStatus } = getState().auth;

  if (refreshTokenResponseStatus === LoadStatuses.Idle) return;

  try {
    return await fetchTokenSend(ApiUrl.Logout);
  } catch (err) {
    if (!err.response) {
      throw err;
    }

    return rejectWithValue(err.response.data);
  }
});
