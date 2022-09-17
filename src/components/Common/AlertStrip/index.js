import React from "react";
import './style.less'
const AlertStrip = (props) => {
    const {
        message = '', colorClass = ''
    } = props;
    return (
        <div className={`alertstrip-main pt-20 pb-20 ${colorClass}`}>
            <p><span className="fa fa-info-circle alertstrip-icon"></span>
                {message}
            </p>
        </div>
    );
}

export default AlertStrip;
