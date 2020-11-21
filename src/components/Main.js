import React, { useState, useEffect } from 'react';
import fire from '../firebase.js';

const Main = () => {
    
    const [userUID, setUserUID] = useState("");
    const [userData, setUserData] = useState({});
    const usersRef = fire.firestore().collection('users')

    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
              console.log("user" + user.uid)
              setUserUID(user.uid);
            } else {
                window.location.href = "http://localhost:3000/"
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
        <div>
            Welcome {userUID}!
            {userData.email}
            <button onClick={() => {
                fire.auth().signOut().then(() => alert('User signed out!'));
                window.location.href = "http://localhost:3000/";
            }}>
                Logout
            </button>
        </div>
    );


}

export default Main;