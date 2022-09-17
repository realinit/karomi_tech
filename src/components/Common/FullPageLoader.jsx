import React from 'react';
import './fullpageLoader.less';

const FullLoader = () => {
    return (
        <div className='full_page-loader'>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3.5" strokeMiterlimit="10" />
                </svg>
            </div>
        </div>
    );
};
export default FullLoader;
