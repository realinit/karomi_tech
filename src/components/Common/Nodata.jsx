import React from 'react';
import './NoData.css'
import { STATIC_BASE_URL } from './../../constants/VariableTypes';
const NoData = (props) => {
    const imageUrl = STATIC_BASE_URL + "/img/no-data.png";
    return (
        <div className="nodata__found-container">
            <img
                className="nodata-fount-image"
                src={imageUrl}
            />
            <h2 className="table__body-nodata">{props.labelContent}</h2>
        </div>
    )
}

export default NoData;