export const setTokenInStorage = (token) => {
  localStorage.setItem('refreshToken', JSON.stringify(token));
}
