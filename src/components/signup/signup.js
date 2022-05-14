import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../utils/history";
import { signup } from "../../actions";
import "./signup.css";
import { server_url } from "../../config";
import { Alert } from "@mui/material";
class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    success: false,
    error: false,
  };
  onFormSubmit = async () => {
    try {
      const response = await axios.post(`${server_url}/users/sign-up`, {
        ...this.state,
      });
      this.setState({ error: false });
      this.setState({ success: true });

      setTimeout(() => history.push("/login"), 4000);
    } catch (e) {
      this.setState({ error: true });
    }
  };
  render() {
    return (
      <div>
        <div className="signupContainer">
          <div className="signupLeft">
            <div className="signupText">
              Welcome to <br /> <span>Trade Journal!</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                <br />
                industry. Lorem Ipsum has been the
                <br /> industry's standard dummy text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="signupRight">
            <p>Create an account!</p>
            <form>
              {this.state.success ? (
                <Alert severity="success">
                  Your account has been created!! Redirecting now🙂
                </Alert>
              ) : (
                ""
              )}
              {this.state.error ? (
                <Alert severity="error">Something went wrong 😓</Alert>
              ) : (
                ""
              )}
              <div className="loginFormField">
                <input
                  onChange={(e) => this.setState({ name: e.target.value })}
                  type="email"
                  value={this.state.name}
                  placeholder="Enter your name"
                />
              </div>
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
              <div className="loginFormField">
                <input
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                  type="password"
                  value={this.state.confirmPassword}
                  placeholder="Confirm the password"
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
                  Create new account
                </button>
                <Link to={"/login"} className=" btn tertiaryBtn">
                  login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signup })(Signup);
