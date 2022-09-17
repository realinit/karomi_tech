import React from 'react';
import './preloader.less';

const Preloader = () => {
    return(
        <div className='preloader'>
                 <div className="loader">
                    <svg className="circular" viewBox="25 25 50 50">
                      <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="3.5" strokeMiterlimit="10"/>
                    </svg>
                </div>
        </div>
    );
};
export default Preloader;
