import React, { useState, useEffect } from 'react';
// import Item from './Item.js';
import fire from '../firebase.js';

import './Checkout.css';
import searchIcon from '../assets/search-24px.png';
import logoutIcon from '../assets/logout.png';
import loblawsIcon from '../assets/loblaws_icon.png'
import pcExpressIcon from '../assets/pcexpress.png';

// Probably want to sort dict alphabetically when pulling from db
var tofu = {
    name: " ",
    price: "12.34"
}

const ITEMS = [tofu]


   
const Checkout = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [userData, setUserData] = useState(ITEMS);
    const [totalPrice1, setTotalPrice1] = useState(0);
    const [totalPrice2, setTotalPrice2] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userUID, setUserUID] = useState("");
    const currentUser = fire.auth().currentUser;
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
                    setUserData(userReturned.data().items);
                    setPhoneNumber(userReturned.data().phone_number);
                }
            })
        }

    }, [userUID])

    console.log(phoneNumber);
    const calculateTotal = (decision) => {
        var sum = 0;
        if(decision == 1) {
            for(var i = 0 ; i < userData.length; i++) {
                sum += parseFloat(userData[i].price1);
            }
        } else {
            for(var i = 0 ; i < userData.length; i++) {
                sum += parseFloat(userData[i].price2);
            }
        }
        return sum;
    }

    const showDiscount = (store, otherStore) => {
        if(calculateTotal(store)-calculateTotal(otherStore) < 0) {
           return (
            <div className="discountTag">
                <a className="discountTagText">Saved ${Math.abs(calculateTotal(store)-calculateTotal(otherStore)).toFixed(2)}</a>
            </div>
           );

        }
    }

    return (
        <>
        <div className="mainDiv">
            {/* <div className="searchBar">
                <div className="icon"/>
                <input className="searchField" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />

                <div className="logoutContainer">
                    <img className="logoutIcon" src={logoutIcon} onClick={() => {
                        fire.auth().signOut().then(() => alert('User signed out!'));
                        window.location.href = "http://localhost:3000/";
                    }} />
                </div>
            </div> */}
            <div className="centerView">
                <div className="listViews">
                    <div className="listContainer">
                        <div className="logoWrapper" id="blueWrapper">
                            <img className="imageReceieved" src={pcExpressIcon} id="pcExpressIcon"/> 
                        </div>
                        {
                            userData.map(item => (
                                <div className="labelContainer" >
                                    <div class="itemLabel">
                                        <p className="nameText">{item.name}</p>
                                    </div>
                                    <div class="itemLabel">
                                        <p className="priceText"><span>$</span>{item.price1}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="totalPriceContainer">
                                {/* <p className="totalPriceText">{totalPrice1}</p> */}
                                <p className="totalPriceText"><span>Total: $</span>{calculateTotal(1).toFixed(2)}</p>
                        </div>
                        <div>{showDiscount(1, 2)}</div>
                    </div>
                    <div className="listContainer">
                        <div className="logoWrapper" id="blackWrapper">
                            <img className="imageReceieved" src={loblawsIcon} id="loblawsIcon" /> 
                        </div>
                        {
                            userData.map(item => (
                                <div className="labelContainer" >
                                    <div class="itemLabel">
                                        <p className="nameText">{item.name}</p>
                                    </div>
                                    <div class="itemLabel">
                                        <p className="priceText"><span>$</span>{item.price2}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="totalPriceContainer">
                                {/* <p className="totalPriceText">{items_price}</p> */}
                                <p className="totalPriceText"><span>Total: $</span>{calculateTotal(2).toFixed(2)}</p>
                        </div>
                        <div>{showDiscount(2, 1)}</div>
                        
                    </div>
                </div>
                <div className="listViews">
                    <button className="actionButton">Send List Over Text</button>
                    <button className="actionButton"> Make a Direct Payment</button>
                    <button className="actionButton" onClick={() =>  window.location.href = "http://localhost:3000/main"}> Go back to main</button>
                </div>
            </div>

        </div>
    </>
    )
    




}

export default Checkout;