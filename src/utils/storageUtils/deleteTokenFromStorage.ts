export const deleteTokenFromStorage = ():void => {
  localStorage.removeItem('refreshToken');
}
