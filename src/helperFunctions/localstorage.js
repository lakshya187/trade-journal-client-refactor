export const getLocalStorage = () => {
  return localStorage.getItem("TJ-token");
};
export const setLocalStorage = (token) => {
  localStorage.setItem("TJ-token", token);
};
export const clearLocalStorage = () => {
  localStorage.removeItem("TJ-token");
};
