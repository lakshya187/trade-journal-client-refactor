import React from "react";
import Header from "./header/header";
import { Router, Route, Switch } from "react-router-dom";

import OptionAnalytics from "./optionAnalytics/optionAnalytics";
import CloseOptionsStrat from "./closeOptionsStrat/closeOptionsStrat";
import CloseOptions from "./closeOptions/closeOptions";
import OptionDetail from "./optionDetail/optionDetail";
import PreviewTrade from "./addOptions/previewTrade";
import AddOptionsForm from "./addOptions/addOptionsTradeForm";
import CloseTrade from "./closeTrade/closeTrade";
import EditTrade from "./editTrade/editTrade";
import AddNewTrade from "./addNewTrade/addNewTrade";
import TradeDetails from "./../components/tradeDetails/tradeDetail";
import MainDashboard from "./dashboard/main-dashboard";
import history from "../utils/history";
import AddTradeManually from "./addNewTradeManually/addNewTradeManually";
import Signup from "./signup/signup";
import Login from "./login/login";
import AddNewTradesExcel from "./addNewTradeExcel/addNewTradesExcel";
import OptionsDashboard from "./optionsDashboard/optionsDashboard";
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
          <Route
            path={"/options-dashboard"}
            exact
            component={OptionsDashboard}
          ></Route>
          <Route
            path={"/add-excel"}
            exact
            component={AddNewTradesExcel}
          ></Route>
          <Route
            path={"/preview-option-trade"}
            exact
            component={PreviewTrade}
          ></Route>
          <Route path={"/add-option"} exact component={AddOptionsForm}></Route>
          <Route path={"/option/:id"} exact component={OptionDetail}></Route>
          <Route
            path={"/option/close/:id"}
            exact
            component={CloseOptions}
          ></Route>
          <Route
            path={"/option/close-strat/:id"}
            exact
            component={CloseOptionsStrat}
          ></Route>
          <Route
            path={"/option-analytics"}
            exact
            component={OptionAnalytics}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
