// accepts json structure to bne displayed in tooltip
import React from "react";
import './tooltip.less';
import utility from '../../../utils/utility';

const checkNegs = props => {
    let flag = true;
    Object.keys(props).forEach(obj => {
        if (props[obj] !== -1) flag = false;
    });
    return flag;
};


const Tooltip = (props = {}) => {
    const allNegVals = checkNegs(props);
    if (utility.isEmpty(props) || allNegVals) return '';
    return (
        <span className="hoverInfo">
            <i className="fa fa-info hover_icon" aria-hidden="true"></i>
            <span className="hoverInfo_content">
                {Object.keys(props).map((obj, key) =>
                    (obj && props[obj] !== -1) &&
                    <span className="hoverInfo_content-detail" key={key}>
                        <p className="mg_right-50">{obj}</p>
                        <p className="price-width-left text-right">{utility.formatPrice(props[obj])}</p>
                    </span>
                )}
            </span>
        </span>
    );
};

export default Tooltip;
