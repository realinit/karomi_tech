import React from "react";

class Thankyou extends React.Component {

  render() {
    return (
      <div className="error__page__container">
        <center>
          <div className="row error__page-height1">
            <h1>Thank you</h1>
            <img src='/img/impact.jpeg' />
          </div>
          <div className="error__page__contnetbox">
            <p className="error_page_paragraph">
              Wait,You will logout after 5 Sec.,
            </p>
          </div>
        </center>
      </div>
    );
  }
}


export default Thankyou;
