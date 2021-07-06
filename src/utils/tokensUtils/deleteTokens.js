import {deleteTokenFromStorage} from "../storageUtils";
import {deleteCookie} from "../cookieUtils";

export const deleteTokens = () => {
  deleteTokenFromStorage();
  
  deleteCookie("token");
}
