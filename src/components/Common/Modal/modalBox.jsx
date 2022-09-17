import React from 'react';
// import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';

const ModalBox = (props) => {
    const {open= false,onCloseModal,modalClass='', overlayKlass='' } = props;
    return (
        <Modal 
            open={open} 
            onClose={() => onCloseModal()} 
            classNames={{ modal: `gvModal_wrap ${modalClass}`, overlay: `gvModal ${overlayKlass}` }}
            center >
            {props.children}
        </Modal>
    )
}

export default ModalBox

