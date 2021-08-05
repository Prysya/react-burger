export const getTokenFromStorage = (): string | undefined => {
  const token = localStorage.getItem("refreshToken");
  return token ? JSON.parse(token) : undefined;
};
