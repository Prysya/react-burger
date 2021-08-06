export const setTokenInStorage = (token: string): void => {
  localStorage.setItem("refreshToken", JSON.stringify(token));
};
