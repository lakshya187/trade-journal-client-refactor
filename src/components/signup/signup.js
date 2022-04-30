import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signup } from "../../actions";
import "./signup.css";
class Signup extends Component {
  state = { name: "", email: "", password: "", confirmPassword: "" };
  onFormSubmit = () => {
    this.props.signup(this.state);
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
