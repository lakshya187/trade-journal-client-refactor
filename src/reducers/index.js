import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import mainDashboardStatsCombinedReducer from "./mainDashboardStatsCombined";
import equityMonthlyReturnsReducer from "./equityMonthlyReturns";
import optionsMonthlyReturnsReducer from "./optionsMonthlyReturns";
import mainDashboardStatsReducer from "./mainDashboardStatsReducer";
import closeOptionStartReducer from "./closeOptionStartReducer";
import closeOptionReducer from "./closeOptionData";
import singleOptionsReducer from "./singleOptionReducer";
import createNewOptionsReducer from "./addNewOption";
import getAllOptionsTradesReducer from "./getAllOptionsTradesReducer";
import statsReducer from "./statsReducer";
import errorReducer from "./errorReducer";
import logoutReducer from "./logoutReducer";
import tradesReducer from "./tradesReducer";
import addNewTrade from "./addNewTrade";
import getAllTradesReducer from "./getAllTradesReducer";
import loginReducer from "./loginReducer";
import riskRewardReducer from "./riskRewardRatio";
export default combineReducers({
  getAllTrades: getAllTradesReducer,
  singleTrade: tradesReducer,
  form: formReducer,
  newTrade: addNewTrade,
  currentUser: loginReducer,
  error: errorReducer,
  stats: statsReducer,
  optionsTrades: getAllOptionsTradesReducer,
  newOptionTrade: createNewOptionsReducer,
  singleOptiontrade: singleOptionsReducer,
  closeOption: closeOptionReducer,
  closeOptionStart: closeOptionStartReducer,
  dashboardReturns: mainDashboardStatsReducer,
  optionsReturns: optionsMonthlyReturnsReducer,
  equityReturns: equityMonthlyReturnsReducer,
  combinedStats: mainDashboardStatsCombinedReducer,
  riskReward : riskRewardReducer
});
