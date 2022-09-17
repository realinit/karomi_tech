import React from "react";
import { connect } from "react-redux";
import Asset from "../components/Asset";

const AssetContainer = (props) => <Asset {...props} />;
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
)(AssetContainer);
