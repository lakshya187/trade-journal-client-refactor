import React, { Component } from "react";
import { Field, formValues, reduxForm } from "redux-form";
import "./addNewTradeManuallyForm.css";

import axios from "axios";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import { server_url } from "../../config";
import history from "../../utils/history";
import { Alert } from "@mui/material";
import Select from "react-select";

import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { connect } from "react-redux";
const typeOfTrade = [
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
];
class AddNewtradeForm extends Component {
  state = {
    stockTicker: "",
    stockName: "",
    typeOfTrade: "",
    openDate: "",
    openPrice: 0,
    entryAnalysis: "",
    exitAnalysis: "",
    notes: "",
    tradeQuantity: 0,
    entProg: 0,
    entryObj: null,
    exitPro: 0,
    exitObj: null,
  };
  constructor(props) {
    super(props);
    this.entryAnalysis = React.createRef();
    this.exitAnalysis = React.createRef();
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const trade = {
      stockTicker: this.state.stockTicker,
      stockName: this.state.stockName,
      typeOfTrade: this.state.typeOfTrade,
      openDate: this.state.openDate,
      openPrice: this.state.openPrice,
      entryAnalysis: this.state.entryAnalysis,
      exitAnalysis: this.state.exitAnalysis,
      notes: this.state.notes,
      tradeQuantity: this.state.tradeQuantity,
    };
    try {
      const res = await axios.post(
        `${server_url}/trades`,
        { ...trade },
        {
          headers: {
            Authorization: `Bearer ${getLocalStorage()}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  handleExitUpload = (e) => {
    e.preventDefault();
    if (!this.state.exitObj) return;
    const storageRef = ref(
      storage,
      `/exit-analysis-equity/user=${this.props.user.id}${this.state.exitObj.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, this.state.exitObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ exitPro: progress });
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          this.setState({ exitAnalysis: url });
          console.log(url);
        });
      }
    );
  };

  handleEntryUpload = (e) => {
    e.preventDefault();
    if (!this.state.entryObj) return;
    // console.log(this.state.entryObj);
    const storageRef = ref(
      storage,
      `/entry-analysis-equity/user=${this.props.user.id}${this.state.entryObj.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, this.state.entryObj);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ entProg: prog });
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          this.setState({ entryAnalysis: url });
        });
      }
    );
  };

  render() {
    // console.log(this.state);
    return (
      <div className="addTradeForm">
        <div className="addTradeFormContainer">
          <div className="addtradeFormHeading subHeading">Add a new trade</div>
          <form>
            <div className="formField">
              <label className="formFieldLabel">Stock Ticker</label>
              <input
                type="text"
                align="right"
                required
                onChange={(e) => this.setState({ stockTicker: e.target.value })}
                value={this.state.stockTicker}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Stock name</label>
              <input
                type="text"
                align="right"
                // required
                onChange={(e) => this.setState({ stockName: e.target.value })}
                value={this.state.stockName}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Type of Trade</label>
              <Select
                type="text"
                options={typeOfTrade}
                align="right"
                required
                onChange={(e) => this.setState({ typeOfTrade: e.value })}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Open Date</label>
              <input
                type="datetime-local"
                align="right"
                required
                onChange={(e) => this.setState({ openDate: e.target.value })}
                value={this.state.openDate}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Entry Analysis</label>
              <input
                type="file"
                align="right"
                ref={this.entryAnalysis}
                onChange={(e) => this.setState({ entryObj: e.target.files[0] })}
                accept="image/*"
                style={{ width: "20%" }}
              />
              <button
                className="uploadImageBtn btn secondryBtn "
                onClick={(e) => this.handleEntryUpload(e)}
              >
                Upload
              </button>
              <div>{this.state.entProg}%</div>
            </div>
            <div className="formField">
              <label className="formFieldLabel">Exit Analysis </label>
              <input
                type="file"
                align="right"
                ref={this.exitAnalysis}
                onChange={(e) => this.setState({ exitObj: e.target.files[0] })}
                accept="image/*"
                style={{ width: "20%" }}
              />
              <button
                className="btn secondryBtn uploadImageBtn"
                onClick={(e) => this.handleExitUpload(e)}
              >
                Upload
              </button>
              <div>{this.state.exitPro}%</div>
            </div>
            <div className="formField">
              <label className="formFieldLabel">Open Price</label>
              <input
                type="number"
                align="right"
                // required
                onChange={(e) => this.setState({ openPrice: +e.target.value })}
                value={this.state.openPrice}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Trade Quantity</label>
              <input
                type="number"
                align="right"
                required
                onChange={(e) =>
                  this.setState({ tradeQuantity: +e.target.value })
                }
                value={this.state.tradeQuantity}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel">Notes</label>
              <textarea
                align="right"
                onChange={(e) => this.setState({ notes: e.target.value })}
                value={this.state.notes}
              />
            </div>
            <button
              className="btn primaryBtn marginTop"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};
export default connect(mapStateToProps)(AddNewtradeForm);
