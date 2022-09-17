import React from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

const ViewImage = (props) => {
    const { downloadable = false, zoomable = false, drag = true,
        rotatable = false, scalable = false, noFooter = false,
        noImgDetails = true, disableKeyboardSupport = false, images = [] } = props;
    const changeable = images.length > 1 ? true : false;
    return (
        <div>
            <Viewer
                visible={true}
                onClose={props.onClose}
                images={images}
                downloadable={downloadable}
                zoomable={zoomable}
                drag={drag}
                rotatable={rotatable}
                scalable={scalable}
                noFooter={noFooter}
                noImgDetails={noImgDetails}
                changeable={changeable}
                disableKeyboardSupport={disableKeyboardSupport}
            />
        </div>
    );
}

export default ViewImage;
