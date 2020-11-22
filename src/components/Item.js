import React, { useState, useEffect } from 'react';
import fire from '../firebase.js';
import './Item.css';

const Item = () => {
    // data format

    // const name = "apple";
    // const image = "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg";
    // const price = "$15.00";
    
    const exampleData = {
        name: "Apple",
        image: "https://firebasestorage.googleapis.com/v0/b/hackwestern7-f84f9.appspot.com/o/6000200094514.jpg?alt=media&token=9e8003a8-da17-4d10-8d7f-03f864129bb4",
        price: "$15.00",
    }

    return (
        <div className="itemContainer">
            <img className="imageReceieved" src="https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg" />
            <a className="itemText">{exampleData.name}</a>
        </div>
    );
}

export default Item;