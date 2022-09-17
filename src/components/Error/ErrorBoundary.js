import React, { Fragment } from "react";
import { connect } from "react-redux";
import utility from "./../../utils/utility";
import messageBus from "utils/messageBus";
import ActionTypes from "constants/ActionTypes";
import Notifications from "react-notify-toast";
import { STATIC_BASE_URL } from "./../../constants/VariableTypes";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
    console.log("error", error);
  }

  componentWillReceiveProps = (nextProps) => {
    const { errorHandler = {} } = nextProps;
    const { errors = [], persistError = [] } = errorHandler;
    if (!_.isEmpty(persistError)) {
      utility.showErrorMsg(persistError, true);
    } else if (!_.isEmpty(errors)) {
      utility.showErrorMsg(errors);
      //can not removed because it needs to childs component
      messageBus.trigger(ActionTypes.REMOVE_GLOBAL_ERROR_EVENT, {
        success: false,
      });
    }
  };

  render() {
    const imageUrl = STATIC_BASE_URL + "/img/error404.png";

    if (this.state.error) {
      return (
        <div className="error__page__container">
          <center>
            <div className="row error__page-height">
              <img
                src="https://wpklik.com/wp-content/uploads/2019/03/How-to-Make-a-Custom-404-Page-in-WordPress.jpg"
                className="img-responsive"
              />
            </div>
            <div className="error__page__contnetbox">
              <p className="error_page_paragraph">
                Sorry, we could not find the resource you are looking for,
              </p>
            </div>
          </center>
        </div>
      );
    }
    return <Fragment>
      <div className={"error-icon__close"}>
        <Notifications options={{ zIndex: 9999 }} />
      </div>
      {this.props.children}
    </Fragment>

  }
}

const mapStateToProps = (state) => {
  const { user = {}, errorHandler = {} } = state;
  const { userInfo = {} } = user;
  const { userId = "" } = userInfo;
  return {
    userId,
    errorHandler,
  };
};

export default connect(mapStateToProps)(ErrorBoundary);
