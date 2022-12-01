// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARR4B33hwhsK_0PsVPhakPTxisJRB5aLg",
    authDomain: "realtor-clone-react-fa8ea.firebaseapp.com",
    projectId: "realtor-clone-react-fa8ea",
    storageBucket: "realtor-clone-react-fa8ea.appspot.com",
    messagingSenderId: "869896994620",
    appId: "1:869896994620:web:dd64abcbdb176b12c9a839"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()