import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

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
});
