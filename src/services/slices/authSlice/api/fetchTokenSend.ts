import axios from "axios";

import { ErrorMessages } from "../../../../enums";
import { getTokenFromStorage } from "../../../../utils";

export const fetchTokenSend = async (
  apiUrl: string,
) => {
  const token = getTokenFromStorage();

  try {
    if (!token) {
      throw new Error(ErrorMessages.RefreshTokenIsUndefined);
    }

    const { data } = await axios.post(apiUrl, { token });

    if (data && data?.success) {
      return data;
    }

    throw new Error(data.message);
  } catch (e) {
    throw e;
  }
};
