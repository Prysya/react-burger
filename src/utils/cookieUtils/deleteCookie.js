import {setCookie} from "./setCookie";

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
