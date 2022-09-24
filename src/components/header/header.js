/*jshint esversion: 6 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { logout } from "../../actions";
import "./header.css";
import { clearLocalStorage } from "../../helperFunctions/localstorage";
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

      this.setState({ user: response.data.user });
    } catch (err) {
      clearLocalStorage();
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
  logout = (e) => {
    this.props.logout();
    history.push("/login");
  };

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <div>
            Trade<span> Journal</span>
          </div>
        </div>
        <div className="header-center">
          <div>Journal</div>
          <div>Feed</div>
          <div>Help</div>
          <div>Contact</div>
        </div>
        <div className="headerRight">
          {!this.props.user ? (
            <Link className="btn primaryBtn" to="/login">
              Sign In
            </Link>
          ) : (
            <Link to="/user-profile">
              <div className="headerAvatar">
                <div>
                  {this.props.user.name.split(" ").map((el) => el.slice(0, 1))}
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, store) => {
  return {
    user: state.currentUser,
    store: store,
  };
};
export default connect(mapStateToProps, { authorizedUser, logout })(Header);
