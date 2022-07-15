export const getLocalStorage = () => {
  return localStorage.getItem("TJ-token");
};
export const setLocalStorage = (token) => {
  localStorage.setItem("TJ-token", token);
};
export const clearLocalStorage = () => {
  localStorage.removeItem("TJ-token");
};

export const setTweeterOAuthToken = (token) => {
  return localStorage.setItem("TJ-TwitterOauthToken", token);
};

export const setTweeterOAuthVerifier = (token) => {
  return localStorage.setItem("TJ-TwitterOauthVerifier", token);
};

export const getTweeterToken = () => {
  return localStorage.getItem("TJ-TwitterOauthToken");
};
export const getTweeterVerifier = () => {
  return localStorage.getItem("TJ-TwitterOauthVerifier");
};
