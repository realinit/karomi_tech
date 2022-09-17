import React from "react";
import Sidebar from "shared/components/subNavbar/index.jsx";
import Notifications from "react-notify-toast";
import "../../../public/css/main.css";
import "../../../public/css/globals.less";
import utility from "utils/utility";
import { connect } from "react-redux";

/**
 * This is the master layout consist of Left Bar and Header
 */
class MasterLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onSidebar: false,
      hidePersistError: false,
    };
  }

  render() {
    const { bgV2 = false} = this.props;
    const errorKlass = !this.state.showPersistError ? "" : "error-icon__close";
    const logoName = bgV2 ? 'logoAdmin' : 'karomiLogo';
    return (
      <div className="layout">
        <div className={errorKlass}>
          <Notifications options={{ zIndex: 9999 }} />
          {/* <i className="fa fa-close" onClick={this.removePersistError}></i> */}
        </div>
        <Sidebar content="" heading=""  bgV2={bgV2} loginpage={true} />
        <div
          className={
            this.state.onSidebar == true
              ? "dashboard-wrapper-container dashboard-wrapper-container--open"
              : "dashboard-wrapper-container loginpage"
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { router, errorHandler } = state;
  return {
    errorHandler,
  };
};

export default connect(mapStateToProps, null)(MasterLayout);
