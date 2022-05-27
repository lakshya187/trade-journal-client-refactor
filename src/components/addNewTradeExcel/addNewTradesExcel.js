import axios from "axios";
import React, { Component } from "react";
import uploadExcel from "../../assets/illustrations/upload excel.svg";
import "./addNewTradeExcel.css";
import { server_url } from "./../../config";
import { getLocalStorage } from "./../../helperFunctions/localstorage";
import history from "../../utils/history";
class AddNewTradesExcel extends Component {
  state = {
    data: null,
  };

  onSubmit = async (e) => {
    try {
      e.preventDefault();
      //  `${server_url}/trades/uploadExcel`
      let formData = new FormData();
      formData.append("file", this.state.data);
      const response = await axios({
        method: "post",
        url: `${server_url}/trades/uploadExcel`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getLocalStorage()}`,
        },
      });
      history.push("/");

      // console.log(response);
    } catch (e) {
      console.log(e);
    }
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
