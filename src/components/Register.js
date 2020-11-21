import React, { useState } from 'react';
import fire from '../firebase';
import * as firebase from 'firebase';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhoneNumber] = useState("");

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
        <div>
            <h1>Welcome to George!</h1>
            <div>
                <label>
                    <a>Email: </a>
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    <a>Password: </a>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    <a>Phone Number (xxx xxx xxxx): </a>
                    <input type="text" value={phone_number} onChange={event => setPhoneNumber(event.target.value)}/>
                </label>
            </div>

            <button onClick={() => registerClicked()}>Register</button>
            <button onClick={() => {
                window.location.href = "http://localhost:3000/login"
            }}>
                Login
            </button>
        </div>
    );
}

export default Register;