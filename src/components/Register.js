import React, { useState, useEffect } from 'react';
import fire from '../firebase';
import * as firebase from 'firebase';
import GroceryCartIcon from '../assets/grocery_cart_icon.png';
import './SignupModalComponent.css';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState("");

    // Checking if user is already online
    // useEffect(() => {
    //     fire.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             window.location.href = "http://localhost:3000/main"
    //         } 
    //     });
    // }, [])

    const registerClicked = () => {

       fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid;
            const data = {
                id: uid,
                email,
                password,
                phone_number,
                items: [],
            };

            const usersRef = fire.firestore().collection('users');
            usersRef.doc(uid).set(data).then(() => {
                // Go to main page once user is registered
                window.location.href = "http://localhost:3000/main";
                alert("Register complete.");
            }).catch(error => {
                alert(error)
            })
        })
    }

    return (
        <div id='signup-modal'>
            <div class="mainBackground">
                <div className='row-reg'>
                    <div className='col' id='info-col'>
                        <p className='title-text'>G.e.o.r.g.e</p>
                        <p className='description-text'>Find the best grocery prices in one consolidated platform and make an order with the click of a button!</p>
                        <img id='icon' alt='grocery-cart-icon' src={GroceryCartIcon}/>
                    </div>
                    <div className='col' id='signup-col'>
                        <p className='info-text' id='sign-up-text'>Already a member? {<a href={"http://localhost:3000/login"}>login</a>}</p>
                        <div className='sign-up-grid-content'>
                            <label className='label1'> 
                                Email
                                <br/>
                                <input className='textInputGrid' type="text" name="email" value={email} onChange={event => setEmail(event.target.value)} />
                            </label>
                            <label className='label2'> 
                                Phone Number
                                <br/>
                                <input className='textInputGrid' type="tel" name="phone" value={phone_number} onChange={event => setPhoneNumber(event.target.value)}/>
                            </label>
                            <label className='label3'>
                                Password
                                <br/>
                                <input className='textInputGrid' type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                            </label>
                            <label className='label4'>
                                Confirm Password
                                <br/>
                                <input className='textInputGrid' type="password"/>
                            </label>
                            <button className='label5' id='register-button' onClick={() => registerClicked()}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <div>
        //         <label>
        //             <a>Email: </a>
        //             <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             <a>Password: </a>
        //             <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             <a>Confirm Password: </a>
        //             <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             <a>Phone Number (xxx xxx xxxx): </a>
        //             <input type="text" value={phone_number} onChange={event => setPhoneNumber(event.target.value)}/>
        //         </label>
        //     </div>

        //     <button onClick={() => registerClicked()}>Register</button>
        //     <button onClick={() => {
        //         window.location.href = "http://localhost:3000/login"
        //     }}>
        //         Login
        //     </button>
        // </div>
    );
}

export default Register;