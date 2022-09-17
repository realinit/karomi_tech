import React, { Fragment } from "react";
import "./sidebar.less";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { heading = "", logo = "/img/karomiLogo.png", wrapClass = "", bgV2 = false,loginpage= false } = this.props;
    const adminClass = bgV2 ? 'adminSideWrap' : '';

    return (
      <div className={`sidebar__container ${adminClass} ${wrapClass} ${loginpage ? "loginpage" : ""}`}>
        {/* {heading && <h1 className="sidebar__container--heading">{heading}</h1>} */}
        {logo && (
          <div className="sidebar__container--logo">
            <img
              src={logo}
              alt="Logo"
              className="sidebar__container--logo--img"
            />
          </div>
        )}
        <div className="sidebar__container--content">{this.props.children}</div>
      </div>
    );
  }
}

export default Sidebar;
