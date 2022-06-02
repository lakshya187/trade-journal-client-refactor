import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import createNewOptionsReducer from "./addNewOption";
import getAllOptionsTradesReducer from "./getAllOptionsTradesReducer";
import statsReducer from "./statsReducer";
import errorReducer from "./errorReducer";
import logoutReducer from "./logoutReducer";
import tradesReducer from "./tradesReducer";
import addNewTrade from "./addNewTrade";
import getAllTradesReducer from "./getAllTradesReducer";
import loginReducer from "./loginReducer";
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
});
