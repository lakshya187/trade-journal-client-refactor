/*jshint esversion: 6 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { clearLocalStorage } from "../../helperFunctions/localstorage";
import { connect } from "react-redux";

import axios from "axios";
import { getLocalStorage } from "../../helperFunctions/localstorage";
import { server_url } from "../../config";
import { authorizedUser } from "../../actions";
import history from "../../utils/history";
class Header extends Component {
  authorizeUser = async () => {
    try {
      const token = getLocalStorage();
      if (!token) {
        history.push("/login");
      }

      const response = await axios.post(
        `${server_url}/users/authorize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.props.authorizedUser(response.data.user);
      console.log(response);
    } catch (err) {
      history.push("/login");
    }
  };
  componentDidMount() {
    this.authorizeUser();
  }
  renderSignIn = () => {
    return (
      <>
        <Link className="btn primaryBtn" to="/login">
          Sign In
        </Link>
      </>
    );
  };
  logout = () => {
    clearLocalStorage();
  };

  render() {
    console.log(this.props.user);
    return (
      <div className="header">
        <div className="header-left">
          <div>Trade Journal</div>
        </div>
        <div className="header-center">
          <div className="welcomeText">
            {this.props.user ? `Welcome, ${this.props.user.name}🙂` : ""}
          </div>
        </div>
        <div className="headerRight">
          {!this.props.user ? (
            <Link className="btn primaryBtn" to="/login">
              Sign In
            </Link>
          ) : (
            <Link className="btn secondryBtn" to="/login" onClick={this.logout}>
              Logout
            </Link>
          )}
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
export default connect(mapStateToProps, { authorizedUser })(Header);
