import React, {useState, useEffect} from 'react';
// import Item from './Item.js';
import fire from '../firebase.js';

import './Checkout.css';
import searchIcon from '../assets/search-24px.png';
import logoutIcon from '../assets/logout.png';
import marketIcon from '../assets/shopping_cart-24px.svg';
import Item from './Item.js';

// Probably want to sort dict alphabetically when pulling from db
var tofu = {
    name: "tofu",
    price: "12.34"
}

var kimchi = {
    name: "kimchi",
    price: 12.12
}

var lettuce = {
    name: "lettuce",
    price: 3.25
}
const ITEMS = [tofu, kimchi, lettuce]
   
const Checkout = () => {
    const [userUID, setUserUID] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

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

    return (
        <div className="mainDiv">
            <div className="searchBar">
                <div className="icon"/>
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
            
            <div className="centerView">
                <div className="listViews">
                    <div className="listContainer">
                        <img className="imageReceieved" src="https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg" /> {/* Change to the loblaws/t&t logo*/}
                        {
                            ITEMS.map(item => (
                                <div className="labelContainer">
                                    <div class="itemLabel">
                                        <p>{item.name}</p>
                                    </div>
                                    <div class="itemLabel">
                                        <p className="priceText">{item.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="listContainer">
                        <img className="imageReceieved" src="https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg" /> {/* Change to the loblaws/t&t logo*/}
                        {
                            ITEMS.map(item => (
                                <div className="labelContainer">
                                    <div class="itemLabel">
                                        <p>{item.name}</p>
                                    </div>
                                    <div class="itemLabel">
                                        <p className="priceText">{item.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Checkout;