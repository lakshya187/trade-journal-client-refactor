import TradeJournalAPI from "./../apis/TradeJournalAPI";
import axios from "axios";
import history from "../utils/history";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../helperFunctions/localstorage";
import { server_url } from "../config";
import { CompressOutlined } from "@mui/icons-material";
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
export const getStats = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${server_url}/trades/getStats`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });
    dispatch({ type: "CURRENT_STATS", payload: data.data.trades[0] });
  };
};
export const getAllOptions = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${server_url}/options`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });
    // console.log(data.data.allOptionsTrade);
    dispatch({
      type: "GET_ALL_OPTIONS",
      payload: data.data.allOptionsTrade,
    });
  };
};
export const queryFilters = (endpoint, query) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `${server_url}/options/${endpoint}`,
      query,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    dispatch({
      type: "GET_ALL_OPTIONS",
      payload: data.data,
    });
    console.log(data);
  };
};
export const createOptionsTrade = (formData) => {
  return {
    type: "OPTIONS_DATA",
    payload: formData,
  };
};

export const getSingleOptionsTrade = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`${server_url}/options/${id}`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });
    dispatch({
      type: "SINGLE_OPTION_TRADE",
      payload: res.data.data,
    });
  };
};

export const closeOption = (formdata) => {
  return {
    type: "CLOSE_OPTION",
    payload: formdata,
  };
};
export const closeOptionStrat = (data) => {
  return {
    type: "CLOSE_OPTION_START",
    payload: data,
  };
};

export const getDashboardStats = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${server_url}/combined/getReturns`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`,
      },
    });

    dispatch({
      type: "DASHBOARD_TOTAL_RETURNS",
      payload: data.returns,
    });
  };
};

export const getChartDataOptions = () => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `${server_url}/options/getDataMonthly`,
      null,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    dispatch({
      type: "OPTIONS_MONTHLY_RETURNS",
      payload: data.modData,
    });
  };
};

export const getChartDataEquity = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `${server_url}/combined/getEquityReturns`,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    dispatch({
      type: "EQUITY_MONTHLY_RETURNS",
      payload: data.modData,
    });
  };
};

export const getMainDashboardStats = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `${server_url}/combined/getAggregateStats`,
      {
        headers: {
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      }
    );
    dispatch({
      type: "MAINDASHBOARD_STATS",
      payload: data.data,
    });
  };
};

export const getRiskRewardRatio = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${server_url}/combined/getAggregateRiskReward`, {
      headers: {
        Authorization: `Bearer ${getLocalStorage()}`
      }
    })
    dispatch({
      type: 'RISK_REWARD',
      payload: data.data
    })
  }
}