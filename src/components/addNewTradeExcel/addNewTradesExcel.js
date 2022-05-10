import axios from "axios";
import React, { Component } from "react";
import uploadExcel from "../../assets/illustrations/upload excel.svg";
import "./addNewTradeExcel.css";
class AddNewTradesExcel extends Component {
  state = {
    data: null,
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const uploadedFile = await axios.post(
      "http://localhost:5000/trades/uploadExcel",
      {}
    );
    console.log(uploadedFile);
  };
  onChange = (e) => {
    console.log(e.target.files[0]);
    this.setState({ data: e.target.files[0] });
  };
  render() {
    return (
      <div className="uploadExcelSheet">
        <div className="uploadExcelContainer">
          <div className="uploadExcelLeft">
            <img src={uploadExcel} />
          </div>
          <div className="uploadExcelRight">
            <h2>
              <span>Excel</span> Uploads
            </h2>
            <p>
              Trade journal allows users to create trades out of the excel data.
              Click Here to learn a tad bit more about how you can upload
              without any hassle. We wont bore you. :)
            </p>
            <button className="btn tertiaryBtn">Learn a bit!</button>
            <hr />
            <form>
              <input type="file" onChange={this.onChange} />
              <button className="btn primaryBtn" onClick={this.onSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddNewTradesExcel;
