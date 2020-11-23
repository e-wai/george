import React, { useState, useEffect } from 'react';
import fire from '../firebase.js';
import ItemDescription from './ItemDescription.js';
import './Main.css';
import searchIcon from '../assets/search-24px.png';
import logoutIcon from '../assets/logout.png';
import marketIcon from '../assets/shopping_cart-24px.svg';
import appIcon from '../assets/shopping_bag_icon.svg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import shoppingCart from '../assets/shopping-cart.png';
import deleteIcon from '../assets/trash-icon.png';
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

    const [userItems, setUserItems] = useState(randomArray);

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
                window.location.href = "https://e-wai.github.io/george/#/register"
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
                    setUserItems(userReturned.data().items);
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

    const deleteClicked = (itemToDelete) => {
        usersRef.doc(userData.id).get().then(documentSnapshot => {
            const existingItems = documentSnapshot.data().items;
            usersRef.doc(userData.id).update({
                items: existingItems.filter(post => post.name !== itemToDelete)
            }).then(() => {
                window.location.href = "https://e-wai.github.io/george/#/main";
            }).catch(error => {
                console.log(error);
            })
        })
    }

    return (
        <>
            <div className="mainDiv">
                <div className="searchBar">
                    <div className="icon" >
                        <img className="appIcon" src={appIcon}/>
                    </div>
                    <input className="searchField" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
                    <img className="searchIcon" src={searchIcon} onClick={() => {
                        // Make request to backend here!
                        whenSubmit();
                    }} />
                    <div className="logoutContainer">
                        <img className="logoutIcon" src={logoutIcon} onClick={() => {
                            fire.auth().signOut().then(() => alert('User signed out!'));
                            window.location.href = "https://e-wai.github.io/george/#/";
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
                            {userItems.map(item => (
                                    <div className="shoppingItemContainer">
                                        <div className="shoppingItemNameContainer">
                                            <img className="shoppingItemPhoto" src={item.image}/> {/** Replace with actual photos */}
                                            <p className="shoppingItemText">{item.name}  <span>x{item.quantity}</span></p>
                                        </div>
                                        <img className="deleteIcon" onClick={() => deleteClicked(item.name)} src={deleteIcon}/>


                                        {/* <p className="shoppingItemText">{item.name}</p> */}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <a className="summaryButton" href="https://e-wai.github.io/george/#/Checkout">Show Me The Best Price</a>

                    {/* <input type="button" onclick="window.location.href='https://e-wai.github.io/george/#/Checkout';" className="summaryButton">Show Me The Best Price</input>       */}

                </div>
            } 
            {modalShow ? <ItemDescription show={modalShow} onHide={() => setModalShow(false)} data={searchData} user={userData} /> : null}
        </>
    );


}

export default Main;