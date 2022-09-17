import React, { Component } from 'react';
import Modal from "react-responsive-modal";

class ModalView extends Component {

    onCloseModal = () => {
        this.props.onClose()
    };

    onExited = () => {
        if (typeof this.props.onExited === 'function') {
            this.props.onExited();
        }
    }
    render() {
        const { openstatus, classNames, showCloseIcon = true } = this.props;
        return (
            <Modal classNames={{ modal: classNames }} open={openstatus} onClose={this.onCloseModal} onExited={this.onExited} center showCloseIcon={showCloseIcon}>
                {/* <h2>{this.props.title}</h2> */}
                {this.props.children}
            </Modal>
        );
    }
}
export default ModalView;
