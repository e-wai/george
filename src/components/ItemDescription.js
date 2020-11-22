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
import fire from '../firebase.js';
import * as admin from 'firebase-admin';

const ItemDescription = ({show, onHide, data, user}) => {

    const [quantity, setQuantity] = useState(1);
    const usersRef = fire.firestore().collection('users')
 
    const addToListClicked = () => {
        const object = {
            name: data['metro'].name,
            image: data['metro'].image,
            quantity: quantity,
            price1: (parseFloat(data['metro'].price.replace('$', ''))*quantity).toFixed(2),
            price2: (parseFloat(data['tnt'].price.replace('$', ''))*quantity).toFixed(2), 
        }

        usersRef.doc(user.id).get().then(documentSnapshot => {
            const existingItems = documentSnapshot.data().items;
            usersRef.doc(user.id).update({
                items: [...existingItems, object]
            }).then(() => {
                window.location.href = "https://e-wai.github.io/george/main";
            }).catch(error => {
                console.log(error);
            })
        })
        onHide();
        
    }

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
                <img className="modalImage" src={data['metro'].image} />
                <a className="modalText">{data['metro'].name}</a>
                <div className={quantity > 1 ? "changeQuantityGreen" : "changeQuantity"}>
                    <img className="minus" src={quantity > 1 ? minusGreen : minus} onClick={() => setQuantity(prev => {
                        if(prev > 1){
                            return prev-1;
                        } else {
                            return prev;
                        }
                    })}/>
                    <a className="quantity">{quantity}</a>
                    <img className="plus" src={quantity > 1 ? plusGreen : plus}  onClick={() => setQuantity(prev => prev + 1 )}/>
                </div>
                <div className="addToList" onClick={() => addToListClicked()}>
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
                        <a className="loblawsPriceFont">{"$"}{(parseFloat(data['metro'].price.replace('$', ''))*quantity).toFixed(2)}</a>
                    </div>
                </div>
                <div className="pcexpress">
                    <div className="pcexpressName">
                        <img className="pcexpressLogo" src={pcexpressLogo} />
                    </div>
                    <div className="pcexpressPrice">
                    <a className="pcexpressPriceFont">{"$"}{(parseFloat(data['tnt'].price.replace('$', ''))*quantity).toFixed(2)}</a>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
    
}

export default ItemDescription;