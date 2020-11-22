import React, { useState, useEffect } from 'react';
import fire from '../firebase.js';
import ItemDescription from './ItemDescription.js';
import './Main.css';
import searchIcon from '../assets/search-24px.png';
import logoutIcon from '../assets/logout.png';
import marketIcon from '../assets/shopping_cart-24px.svg';
import appIcon from '../assets/app_icon.svg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import shoppingCart from '../assets/shopping-cart.png';
import deleteIcon from '../assets/trash-icon.png'
import './ItemDescription.css';
import './Checkout.css';

const Main = () => {    
    const [userUID, setUserUID] = useState("");
    const [userData, setUserData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [searchData , setSearchData] = useState({});
    const [baseURL, setBaseURL] = useState("");
    
    const usersRef = fire.firestore().collection('users')
    

    const [modalShow, setModalShow] = useState(false);
    
    let randomArray = ["testing", "replace", "with", "userData", "items"]

    // const closeModal = () => {
    //     setModalShow(false);
    // }
    console.log(userData);
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
    
    const whenSubmit = () => {
        setBaseURL(`http://bb467e118e37.ngrok.io/products?item_name=${searchQuery}`);
        console.log("hi1")
    }

    useEffect(() => {
        console.log("hi2");
        fetch(baseURL)
            .then(res => res.json())
            .then(
                (result) => {
                    setSearchData(result);
                    console.log(result);
                    setModalShow(true);
                },
                (error) => console.log(error)
            );
    }, [baseURL])


    return (
        <>
            <div className="mainDiv">
                <div className="searchBar">
                    <div className="icon" />
                    <input className="searchField" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
                    <img className="searchIcon" src={searchIcon} onClick={() => {
                        // Make request to backend here!
                        whenSubmit();
                    }} />
                    <div className="logoutContainer">
                        <img className="logoutIcon" src={logoutIcon} onClick={() => {
                            fire.auth().signOut().then(() => alert('User signed out!'));
                            window.location.href = "http://localhost:3000/";
                        }} />
                    </div>
                </div>
            </div>

            {(userData.items == undefined || userData.items.length == 0) &&  
                <div className="placeholderContainer">
                    <img className="placeholderImage" src={shoppingCart}></img>
                    <div>
                        <p className="placeholderText">No items in shopping cart<br></br>Search for items to add them to your shopping list!</p>
                    </div>
                </div>
            } 
            
            {(userData.items != undefined && userData.items.length >= 1) &&
                <div className="centeringContainer">
                    <div className="shoppingListCard">
                        <p className="shoppingListText">My Shopping List</p>
                        <div className="shoppingListContainer">
                            {/* {userData.items.map(item => ( */}
                            {randomArray.map(item => (
                                    <div className="shoppingItemContainer">
                                        <div className="shoppingItemNameContainer">
                                            <img className="shoppingItemPhoto" src={shoppingCart}/> {/** Replace with actual photos */}
                                            <p className="shoppingItemText">Apples  <span>x5</span></p>
                                        </div>
                                        <img className="deleteIcon" src={deleteIcon}/>


                                        {/* <p className="shoppingItemText">{item.name}</p> */}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <a className="summaryButton" href="http://localhost:3000/Checkout">Show Me The Best Price</a>

                    {/* <input type="button" onclick="window.location.href='http://localhost:3000/Checkout';" className="summaryButton">Show Me The Best Price</input>       */}

                </div>
            } 
            {modalShow ? <ItemDescription show={modalShow} onHide={() => setModalShow(false)} data={searchData} user={userData} /> : null}
        </>
    );


}

export default Main;