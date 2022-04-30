/* jshint ignore:start */
import React from "react";
import Header from "./header/header";
import { Router, Route, Switch } from "react-router-dom";

import CloseTrade from "./closeTrade/closeTrade";
import EditTrade from "./editTrade/editTrade";
import AddNewTrade from "./addNewTrade/addNewTrade";
import TradeDetails from "./../components/tradeDetails/tradeDetail";
import MainDashboard from "./dashboard/main-dashboard";
import history from "../utils/history";
import AddTradeManually from "./addNewTradeManually/addNewTradeManually";
import Signup from "./signup/signup";
import Login from "./login/login";
import "./app.css";
const App = () => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={MainDashboard}></Route>
          <Route path="/trade/:id" exact component={TradeDetails}></Route>
          <Route path="/add-new-trade" exact component={AddNewTrade}></Route>
          <Route
            path="/add-manually"
            exact
            component={AddTradeManually}
          ></Route>
          <Route path={"/:id/edit-trade"} exact component={EditTrade}></Route>
          <Route path={"/:id/close-trade"} exact component={CloseTrade}></Route>
          <Route path={"/login"} exact component={Login}></Route>
          <Route path={"/signup"} exact component={Signup}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
