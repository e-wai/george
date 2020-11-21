import React, { useState } from 'react';
import fire from "../firebase";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginClicked = () => {
        fire
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(response => {
             const uid = response.user.uid;
             const usersRef = fire.firestore().collection('users');
             usersRef.doc(uid).get()
                .then(userReturned => {
                    if(!userReturned.exists) {
                        alert("Please check your credentials and try again.")
                        return;
                    }
                    window.location.href = "http://localhost:3000/main";
                })
         })
    }

    return (
        <div>
            <h1>Login</h1>
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
            <button onClick={() => loginClicked()}>Login</button>
        </div>
    );
}

export default Login;