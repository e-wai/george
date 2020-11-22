import React, { useState, useEffect } from 'react';
import Main from './Main.js';
import Modal from 'react-bootstrap/Modal'
import fire from '../firebase.js';;

const Success = () => {

    const [show, setModalVisible] = useState(true);

    const [userUID, setUserUID] = useState("");
    const [userData, setUserData] = useState({});

    const usersRef = fire.firestore().collection('users')
    


    useEffect(() => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
              console.log("user" + user.uid)
              setUserUID(user.uid);
            } else {
                window.location.href = "https://e-wai.github.io/george/register"
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

    const handleClose = () => {
        usersRef.doc(userData.id).get().then(documentSnapshot => {
            usersRef.doc(userData.id).update({
                items: []
            }).then(() => {
                window.location.href = "https://e-wai.github.io/george/main";
            }).catch(error => {
                console.log(error);
            })
        })
        setModalVisible(false);
    }



    return (
        <div className="successDiv">
            <Main/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Successful</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Your order is on its way!<br/> Tracking Number: 1234567890</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Success;
