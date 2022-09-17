import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.data.searchBox = JSON.parse(
      JSON.stringify((ManageUserSearchForm = {}))
    );
  }

  render() {
    return <div className="container" >Home Page </div>;
  }
}
export default Home;
