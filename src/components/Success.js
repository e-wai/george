import React, { useState } from 'react';
import Main from './Main.js';
import Modal from 'react-bootstrap/Modal';

const Success = () => {

    const [show, setModalVisible] = useState(true);

    const handleClose = () => {
        window.location.href = "http://localhost:3000/main";
        setModalVisible(false);
    }

    return (
        <div className="successDiv">
            <Main/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Successful</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Your order is on its way!<br/> Tracking Number: 1234567890</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Success;
