const AUTH_KEY = 'isAuthenticated';

export const setAuthStatus = (status: boolean) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(status));
};

export const getAuthStatus = () => {
  const storedStatus = localStorage.getItem(AUTH_KEY);
  return storedStatus ? JSON.parse(storedStatus) : false;
};

export const clearAuthStatus = () => {
  localStorage.removeItem(AUTH_KEY);
};
