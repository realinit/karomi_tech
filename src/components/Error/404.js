import React, { Component } from "react";
import "../Error/error.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { STATIC_BASE_URL } from "./../../constants/VariableTypes";
class Error extends Component {
  render() {
    const { userInfo = {} } = this.props;
    const imageUrl = STATIC_BASE_URL + "/img/error404.png";
    const logoImage = "/public/img/karomiLogo.png";
    return (
      <div className="error__page__container">
        <center>
          <div className="row">
            <Link to="/">
              <img
                src={logoImage}
                className="img-responsive error-notFound-logo"
                alt={logoImage}
              />
            </Link>
          </div>
          <div className="row error__page-height">
            <img src={logoImage} className="img-responsive" />
          </div>
          <div className="error__page__contnetbox">
            <p className="error_page_paragraph">
              Sorry, we could not find the resource you are looking for,
            </p>
            <a href="/" className="btn btn-warning error_button_homepage">
              GO TO HOMEPAGE
            </a>
            <p className="error_page_paragraph">or explore by</p>
          </div>
        </center>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo || {},
});

export default connect(mapStateToProps)(Error);
