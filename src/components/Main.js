import React, { useState, useEffect } from 'react';
import fire from '../firebase.js';
import Item from './Item.js';
import ItemDescription from './ItemDescription.js';
import './Main.css';
import searchIcon from '../assets/search-24px.png';
import logoutIcon from '../assets/logout.png';
import marketIcon from '../assets/shopping_cart-24px.svg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Main = () => {
    
    const [userUID, setUserUID] = useState("");
    const [userData, setUserData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const usersRef = fire.firestore().collection('users')

    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
              console.log("user" + user.uid)
              setUserUID(user.uid);
            } else {
                window.location.href = "http://localhost:3000/register"
            }
        });
    }, [])


    useEffect(() => {
        // make sure userUID is obtained before data is retrieved
        if(userUID) {
            usersRef.doc(userUID).get()
            .then(userReturned => {
                if(!userReturned.exists) {
                    return;
                } else {
                    setUserData(userReturned.data());
                }
            })
        }

    }, [userUID])


    return (
        <div className="mainDiv">
            <div className="searchBar">
                <div className="icon" />
                <input className="searchField" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
                <img className="searchIcon" src={searchIcon} onClick={() => {
                    // Make request to backend here!
                    console.log(searchQuery)
                }} />
                <div className="checkoutContainer">
                    <img className="marketIcon" src={marketIcon} onClick={() => {
                        // Go to checkout
                        window.location.href = "http://localhost:3000/";
                    }} />
                </div>
                <div className="logoutContainer">
                    <img className="logoutIcon" src={logoutIcon} onClick={() => {
                        fire.auth().signOut().then(() => alert('User signed out!'));
                        window.location.href = "http://localhost:3000/";
                    }} />
                </div>
            </div>

            <div className="itemsContainer">
                {/* Get number of items recieved from backend and map them here */}
                {/* Pass in JSON object to Item.js */}
                <Item data={{
                    name: "Apple",
                    image: "https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg",
                    price: "$15.00",
                }}/>
                {/* <Item />
                <Item />
                <Item />
                <Item />
                <Item /> */}
            </div>
 
        </div>
    );


}

export default Main;