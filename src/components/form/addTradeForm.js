import React, { Component } from "react";
import { Field, formValues, reduxForm } from "redux-form";
import "./addNewTradeManuallyForm.css";
import connect from "react-redux";
import axios from "axios";

class AddNewtradeForm extends Component {
  renderInputString({ input, label, meta }) {
    return (
      <div className="formField">
        <label className="formFieldLabel">{label}</label>
        <input {...input} align="right" />
        {meta.touched && meta.error && (
          <span className="error_field">{meta.error}</span>
        )}
      </div>
    );
  }
  renderDate({ input, label, meta }) {
    return (
      <div className="formField">
        <label className="formFieldLabel">{label}</label>
        <input {...input} type={"date"} align="right" />
        {meta.touched && meta.error && (
          <span className="error_field">{meta.error}</span>
        )}
      </div>
    );
  }
  renderNumber({ input, label, meta }) {
    return (
      <div className="formField">
        <label className="formFieldLabel">{label}</label>
        <input {...input} type="number" align="right" />
        {meta.touched && meta.error && (
          <span className="error_field">{meta.error}</span>
        )}
      </div>
    );
  }
  renderTextArea({ input, label, meta }) {
    return (
      <div className="formField">
        <label className="formFieldLabel">{label}</label>
        <input {...input} align="right" />
        {meta.touched && meta.error && (
          <span className="error_field">{meta.error}</span>
        )}
      </div>
    );
  }
  renderTradeType({ input, label, meta, value }) {
    return (
      <div className="formField">
        <label className="formFieldLabel">{label}</label>
        <input {...input} type="radio" value="Long" align="right" />
        <input {...input} type="radio" value="Short" align="right" />
        {meta.touched && meta.error && (
          <span className="error_field">{meta.error}</span>
        )}
      </div>
    );
  }
  onFormSubmit = (formData) => {
    this.props.onSubmit(formData);
  };
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className={"addTradeForm"}
      >
        <p className="addNewTradeHeading">Add A new Trade</p>
        <Field
          name="stockTicker"
          component={this.renderInputString}
          label="Stock Ticker"
        />
        <Field
          name="stockName"
          component={this.renderInputString}
          label="Stock Name"
        />
        <div className="formField">
          <label>
            Type of trade
            <Field
              name="typeOfTrade"
              component="input"
              type="radio"
              value="Short"
            />{" "}
            Short
          </label>
          <label>
            <Field
              name="typeOfTrade"
              component="input"
              type="radio"
              value="Long"
            />{" "}
            Long
          </label>
        </div>
        <Field
          name="openPrice"
          component={this.renderNumber}
          label="Open price"
        />
        <Field
          name="tradeQuantity"
          component={this.renderNumber}
          label="Quantity"
        />
        <Field name="openDate" component={this.renderDate} label="Open Date" />
        <Field name="notes" component={this.renderTextArea} label="Notes" />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button className="submitButton">Submit</button>
        </div>
      </form>
    );
  }
}

const validateForm = (formValues) => {
  const err = {};
  // if (!formValues.stockTicker) {
  //   err.stockTicker = "You need a valid stock ticker";
  // }
  return err;
};

//export default connect(mapstatetoPros)(AddnewTradeFrom)
export default reduxForm({ form: "newTradeForm", validate: validateForm })(
  AddNewtradeForm
);
