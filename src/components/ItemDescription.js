import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ItemDescription.css';
import loblawsLogo from '../assets/loblaws_icon.png';
import pcexpressLogo from '../assets/pcexpress.png';
import cartLogo from '../assets/Group 17.png';
import plus from '../assets/plus.png';
import minus from '../assets/minus.png';
import plusGreen from '../assets/plusGreen.png';
import minusGreen from '../assets/minusGreen.png';

const ItemDescription = ({show, onHide, data}) => {
    console.log(data);

    const [quantity, setQuantity] = useState(0);
    return (
        <Modal
            contentClassName="modalContainer"
            show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            animation={true}
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <img className="modalImage" src={data.image} />
                <a className="modalText">{data.name}</a>
                <div className={quantity > 0 ? "changeQuantityGreen" : "changeQuantity"}>
                    <img className="minus" src={quantity > 0 ? minusGreen : minus} onClick={() => setQuantity(prev => {
                        if(prev > 0){
                            return prev-1;
                        } else {
                            return prev;
                        }
                    })}/>
                    <a className="quantity">{quantity}</a>
                    <img className="plus" src={quantity > 0? plusGreen : plus}  onClick={() => setQuantity(prev => prev + 1 )}/>
                </div>
                <div className="addToList" onClick={() => console.log("hi")}>
                    <img src={cartLogo} />
                    <a className="addToListFont">Add to List</a>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="loblaws">
                    <div className="loblawsName">
                        <img src={loblawsLogo} />
                    </div>
                    <div className="loblawsPrice">
                        <a className="loblawsPriceFont">{data.price}</a>
                    </div>
                </div>
                <div className="pcexpress">
                    <div className="pcexpressName">
                        <img className="pcexpressLogo" src={pcexpressLogo} />
                    </div>
                    <div className="pcexpressPrice">
                        <a className="pcexpressPriceFont">{data.price}</a>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ItemDescription;