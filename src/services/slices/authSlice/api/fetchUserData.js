import axios from "axios";

import { LOAD_STATUSES, MESSAGES } from "../../../../constants";
import { getCookie } from "../../../../utils";
import {
  handleGetUserData,
  handleUpdateToken,
  handleUpdateUserData,
} from "../";

export const fetchUserData =
  (apiUrl, method) =>
  async (formData, { rejectWithValue, dispatch, getState }) => {
    const { accessTokenResponseStatus, refreshTokenResponseStatus } =
      getState().auth;

    if (accessTokenResponseStatus === LOAD_STATUSES.IDLE) return;

    const token = getCookie("token");

    const resData = formData && method === "patch" ? formData : {};

    try {
      if (!token) {
        throw new Error(MESSAGES.ERRORS.ACCESS_TOKEN_IS_UNDEFINED);
      }

      const { data } = await axios({
        url: apiUrl,
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: resData,
      });

      if (data && data?.success) {
        return data;
      }

      throw new Error(data.message);
    } catch (err) {
      if (
        err.message === MESSAGES.ERRORS.ACCESS_TOKEN_IS_UNDEFINED ||
        err.response.data.message === "jwt expired"
      ) {
        if (refreshTokenResponseStatus === LOAD_STATUSES.IDLE) {
          if (formData) {
            await dispatch(handleUpdateToken(handleUpdateUserData(formData)));
          } else {
            await dispatch(handleUpdateToken(handleGetUserData()));
          }
        }
      }

      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  };
