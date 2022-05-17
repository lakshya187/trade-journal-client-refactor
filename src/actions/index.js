import TradeJournalAPI from "./../apis/TradeJournalAPI";
import axios from "axios";
import history from "../utils/history";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../helperFunctions/localstorage";
import { server_url } from "../config";
export const getTrades = () => {
  return async (dispatch) => {
    const response = await axios.get(`${server_url}/trades`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });
    dispatch({ type: "GET_ALL_TRADES", payload: response.data.data.trades });
  };
};
export const getSingleTrade = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${server_url}/trades/${id}`);
    dispatch({ type: "GET_SINGLE_TRADE", payload: response.data.data.trade });
  };
};

export const createNewTrade = (formData) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${server_url}/trades/`,
      {
        ...formData,
      },
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );

    dispatch({ type: "CREATE_NEW_TRADE", payload: response.data });
    // history.push("/");
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${server_url}/users/log-in`, {
        ...formData,
      });
      console.log(response);
      setLocalStorage(response.data.token);
      dispatch({ type: "CURRENT_USER", payload: response.data.user });
      history.push("/");
    } catch (e) {
      dispatch({ type: "ERROR" });
    }
  };
};
export const authorizedUser = (user) => {
  return {
    type: "CURRENT_USER",
    payload: user,
  };
};
export const signup = (formData) => {
  return async (dispatch) => {
    const response = await axios.post(`${server_url}/users/sign-up`, {
      ...formData,
    });
    dispatch({ type: "CURRENT_USER", payload: response.data });
    history.push("/login");
  };
};

export const logout = () => {
  clearLocalStorage();
  return {
    type: "LOGOUT",
  };
};
