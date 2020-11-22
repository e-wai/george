import React, { useState, useEffect } from 'react';
import fire from '../firebase.js';
import './Item.css';
import ItemDescription from './ItemDescription.js';

const Item = ({data}) => {

    const [modalShow, setModalShow] = useState(false);
    
    return (
        <>
            <div className="itemContainer" onClick={() => setModalShow(true)}>
                <img className="imageReceieved" src={data.image} />
                <a className="itemText">{data.name}</a>
            </div>
            {console.log(modalShow)}
            <ItemDescription show={modalShow} onHide={() => setModalShow(false)} data={data} />
        </>
    );
}

export default Item;