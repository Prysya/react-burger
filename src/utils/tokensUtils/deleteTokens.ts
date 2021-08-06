import { deleteTokenFromStorage } from "../storageUtils";
import { deleteCookie } from "../cookieUtils";

export const deleteTokens = (): void => {
  deleteTokenFromStorage();

  deleteCookie("token");
};
