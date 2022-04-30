/*jshint esversion: 6 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import { connect } from "react-redux";

class Header extends Component {
  renderSignIn = () => {
    return (
      <>
        <Link className="btn primaryBtn" to="/login">
          Sign In
        </Link>
      </>
    );
  };
  render() {
    return (
      <div className="header">
        <div className="header-left">
          <div>Trade Journal</div>
        </div>
        <div className="header-center">
          <span>Home</span>
          <span>Help</span>
          <span>About</span>
        </div>
        <Link className="btn primaryBtn" to="/login">
          Sign In
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};
export default connect(mapStateToProps)(Header);
