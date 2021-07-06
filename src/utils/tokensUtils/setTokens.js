import { setTokenInStorage } from "../storageUtils";
import { setCookie } from "../cookieUtils";

export const setTokens = (action) => {
  setTokenInStorage(action.payload.refreshToken);

  setCookie("token", action.payload.accessToken.replace("Bearer ", ""));
};
