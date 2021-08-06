import axios, { Method } from "axios";

import { getCookie } from "../../../../utils";
import { ISetFetchUserData } from "../../../../interfaces";
import { ErrorMessages } from "../../../../enums";

export const fetchUserData = async (
  apiUrl: string,
  method: Method,
  formData?: ISetFetchUserData
) => {
  const token = getCookie("token");

  const resData = formData && method === "patch" ? formData : {};

  try {
    if (!token) {
      throw new Error(ErrorMessages.AccessTokenIsUndefined);
    }

    const { data } = await axios.request({
      url: apiUrl,
      method,
      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
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
    throw err;
  }
};
