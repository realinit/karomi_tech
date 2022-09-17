import React from 'react';
import './tooltip.less';

const ToolTip = props => {
    const { tooltipContent = '', showAllContent = '' } = props;
    return (
        <div className="tool_tip">
            <p class="margin_zero elipsis">{tooltipContent}</p>
            <div class="tooltip_content">
                <p>{showAllContent}</p>
            </div>
        </div>
    )
};

export default ToolTip;
