import React from "react";
import { connect } from "react-redux";
import Inbox from "../components/Inbox";

const InboxContainer = (props) => <Inbox {...props} />;
const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxContainer);
