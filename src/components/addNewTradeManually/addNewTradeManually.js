import React, { Component } from "react";

import { connect } from "react-redux";
import AddNewtradeForm from "../form/addTradeForm";
import { createNewTrade } from "../../actions";

class AddTradeManually extends Component {
  onFormSubmit = (data) => {
    console.log("Working");
    console.log(this.props);
    this.props.createNewTrade(data);
  };
  render() {
    return <AddNewtradeForm onSubmit={this.onFormSubmit} />;
  }
}
export default connect(null, { createNewTrade })(AddTradeManually);
