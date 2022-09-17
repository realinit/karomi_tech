import React, { Component } from 'react';
import Preloader from "components/Common/Preloader";

const preloaderContainer = () => {
    return (
        <div className="manage_user dash-borderRadius dash-padding dashboard__main__content">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <Preloader />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default preloaderContainer;