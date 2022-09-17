import React, { useState } from "react";
import '../OtherPages/portalForm.less';
import Sidebar from "shared/components/subNavbar/index.jsx";
import { Fragment } from "react";
import productdata from '../../dummydata/dummy_product.json';
import './style.less'

const AssetComponent = ({ }) => {
    const [filterData,SetInboxData] = useState(productdata.products);

    return (
        <Fragment>
            <Sidebar heading="Logo" wrapClass="allLinks">
                {/* renders as this.props.children in sidebar component */}
                <div className="allLinks__content">
                <div className="allLinks__content__list">
                    <a
                    href="/inbox"
                    className="allLinks__content__link "
                    >
                    <span className="allLinks__content__text">Inbox</span>
                    </a>
                    <a href="/asset" className="allLinks__content__link active">
                    <span className="allLinks__content__text">
                        Asset
                    </span>
                    </a>
                </div>
                </div>
                <div className="portallForm__btn logout__btn">
                <button type="button" className="btn gbtn me-2">
                    Logout
                </button>
                </div>
            </Sidebar>
             <div className="inbox dashboard-wrapper-container">
            {/* Top Content */}
            <div className="inbox_header">
                <h1 className="inbox_header_head">Assets</h1>
                <a href="/admin/home" className="btn gbtn mobileWrap_btn">Home</a>
            </div>
            {/* inbox Data in Table */}
            <div className="asset_container">
                <div className="asset__list">
                    {filterData && filterData.map(data=>{
                        return (
                            <div className="asset_item">
                                <div className="asset_thumbnail">
                                    <img src={data.thumbnail} />
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>
            </div>
        
        </Fragment>
    )
}

export default AssetComponent
