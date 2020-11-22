import app from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBu_KUV2j4GegMB-0y5ch0QR8X4rw3uiFA",
    authDomain: "hackwestern7-f84f9.firebaseapp.com",
    databaseURL: "https://hackwestern7-f84f9.firebaseio.com",
    projectId: "hackwestern7-f84f9",
    storageBucket: "hackwestern7-f84f9.appspot.com",
    messagingSenderId: "806434084198",
    appId: "1:806434084198:web:b31da2d6c9ac42239da4a7"  
};

// Establishes connection with firebase
const fire = app.initializeApp(firebaseConfig);

export default fire;