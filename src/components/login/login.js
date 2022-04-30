import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { getLocalStorage } from "../../helperFunctions/localstorage";
import mainImg from "./../../assets/illustrations/loginMain.svg";
import { login } from "../../actions";
import "./login.css";
import Signup from "../signup/signup";
import { Link } from "react-router-dom";
class Login extends Component {
  state = { email: "", password: "" };
  onFormSubmit() {
    this.props.login(this.state);
  }

  componentDidMount() {}
  render() {
    return (
      <div className="login">
        <div className="loginContainer">
          <div className="loginLeft">
            <img src={mainImg} />
          </div>
          <div className="loginRight">
            <div className="loginText">
              <h1>Welcome</h1>
              <p>Please log into your account to get started</p>
            </div>
            <form>
              <div className="loginFormField">
                <input
                  onChange={(e) => this.setState({ email: e.target.value })}
                  type="email"
                  value={this.state.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="loginFormField">
                <input
                  onChange={(e) => this.setState({ password: e.target.value })}
                  type="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                />
              </div>
              <div className="loginBtnContainer">
                <button
                  className=" btn primaryBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    this.onFormSubmit();
                  }}
                >
                  Login
                </button>
                <Link to={"/signup"} className=" btn tertiaryBtn">
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    user: state.currentUser,
  };
};
export default connect(mapPropsToState, { login })(Login);
