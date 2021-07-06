import axios from "axios";

import { LOAD_STATUSES, MESSAGES } from "../../../../constants";
import { getTokenFromStorage } from "../../../../utils";

export const fetchTokenSend =
  (apiUrl) =>
  async (afterRefreshAction, { rejectWithValue, dispatch, getState }) => {
    const { refreshTokenResponseStatus } = getState().auth;

    if (refreshTokenResponseStatus === LOAD_STATUSES.IDLE) return;

    const token = getTokenFromStorage();

    try {
      if (!token) {
        throw new Error(MESSAGES.ERRORS.REFRESH_TOKEN_IS_UNDEFINED);
      }

      const { data } = await axios.post(apiUrl, { token });

      if (data && data?.success) {
        if (afterRefreshAction) {
          dispatch(await afterRefreshAction);
        }
        return data;
      }

      throw new Error(data.message);
    } catch (e) {
      if (!e.response) {
        throw e;
      }

      return rejectWithValue(e.response.data);
    }
  };
