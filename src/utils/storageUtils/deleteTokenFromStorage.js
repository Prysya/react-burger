export const deleteTokenFromStorage = () => {
  localStorage.removeItem('refreshToken');
}
