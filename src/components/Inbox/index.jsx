import React, { useState } from "react";
import '../OtherPages/portalForm.less';
import Sidebar from "shared/components/subNavbar/index.jsx";
import { Fragment } from "react";
import inboxdata from '../../dummydata/inbox_data.json';
import Modal from "../Common/Modal/modalBox";
import InputBox from "../Common/inputBox/input";

const InboxComponent = ({ }) => {
    const [filterData,SetInboxData] = useState(inboxdata);
    const [open,SetModalStatus] = useState(false);
    const [selectedRow,SetSelectedRow] = useState({});

    const handleFilter = ({target},key) => {
        const { value = "" } = target;
        const obj = [...inboxdata];
        const data = obj.filter(dataObj=>{
            return dataObj[key].toLowerCase().includes(value)
        })
        SetInboxData(data)
    };
    const handleClick = (data) => {
        SetModalStatus(!open)
        SetSelectedRow(data)
    }
    const onCloseModal = () => {
        SetModalStatus(!open)
        SetSelectedRow({})
    }

    return (
        <Fragment>
            <Sidebar heading="Logo" wrapClass="allLinks">
                {/* renders as this.props.children in sidebar component */}
                <div className="allLinks__content">
                <div className="allLinks__content__list">
                    <a
                    href="/inbox"
                    className="allLinks__content__link active"
                    >
                    <span className="allLinks__content__text">Inbox</span>
                    </a>
                    <a href="/asset" className="allLinks__content__link">
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
                <h1 className="inbox_header_head">Inbox</h1>
                <a href="/admin/home" className="btn gbtn mobileWrap_btn">Home</a>
            </div>
            {/* inbox Data in Table */}
            <div className="inbox_tableWrap">
                <table className="table redTable">
                    <thead>
                        <tr>
                            <th>Request Type</th>
                            <th>Product Name</th>
                            <th>Component Type</th>
                            <th>Brand</th>
                            <th>Pending With</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {["requestType","productName","componentName","brand","pendingWith","status"].map(data=>{
                            return (
                                <td>
                                    <input 
                                        type="text" 
                                        className="tableFilterInput" 
                                        data-key={data} 
                                        placeholder="Search..."
                                        onChange={e=>handleFilter(e,data)}
                                    />
                                </td>
                            )
                        })}
                        </tr>
                        {filterData.length > 0 && filterData.map(data => {
                            return (
                                <tr key={data.id} onClick={e=>handleClick(data)} style={{cursor:'pointer'}}>
                                    <td>{`${data.requestType || ''}`}</td>
                                    <td>{`${data.productName || ''}`}</td>
                                    <td>{`${data.componentName || ''}`}</td>
                                    <td>{`${data.brand || ''}`}</td>
                                    <td>{`${data.pendingWith || ''}`}</td>
                                    <td style={{background:`${data.status.toLowerCase()}`}}>{data.status || ''}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        <Modal
            open={open}
            onCloseModal={onCloseModal}
        >
            <div className="modal__header">Edit Request : {selectedRow ? selectedRow.id :''}</div>
            <div className="modal__body">
            <div className="requestEdit">
            {["requestType","productName","componentName","brand","pendingWith","status"].map(data=>{
                return (<div className="form__field__inputWrap">
                        <InputBox
                            type="text"
                            name={data}
                            placeholder={data}
                            value={selectedRow[data]}
                            handleChange={e=>{}}//(e) => onChangeHandler(e, "aadharNumber")}
                        />
                    </div>
                );
            })}
            </div>
            </div>
        </Modal>
        </Fragment>
    )
}

export default InboxComponent
