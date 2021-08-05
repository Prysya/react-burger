import { setCookie } from "./setCookie";

export const deleteCookie = (name: string): void => {
  setCookie(name, null, { expires: -1 });
}
