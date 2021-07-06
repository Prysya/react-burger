export const getTokenFromStorage = () => {
  const token = localStorage.getItem("refreshToken");
  return token ? JSON.parse(token) : undefined;
};
