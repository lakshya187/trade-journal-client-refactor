export const getLocalStorage = () => {
  return localStorage.getItem("token");
};
export const setLocalStorage = (token) => {
  localStorage.setItem("token", token);
};
