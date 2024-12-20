export const isAuthenticated = () => {
  return getAccessToken();
};
export const getAccessToken = () => {
  return localStorage.getItem('token') || false;
};
export const setAccessToken = (token: string) => {
  return localStorage.setItem('token', token);
};
