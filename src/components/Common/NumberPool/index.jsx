import React from 'react';
import './style.less';

const mapper = {
    0: 'info_length-green',
    1: 'info_length-green',
    2: 'info_length-green',
    3: 'info_length-blue',
    4: 'info_length-blue',
    5: 'info_length-blue',
    6: 'info_length-orange',
    7: 'info_length-orange',
    8: 'info_length-orange'
};

const classMapper = type => {
    return mapper[type] || 'info_length-other';
}

const NumberPool = props => {
    const { displayNo } = props;
    return (
        <span className="ball__mainwrapper">
            <span className={`ball__border ${classMapper(displayNo)}`}>
                <span className="numbering-section">{displayNo}</span>
            </span>
        </span>
    );
};

export default NumberPool;
