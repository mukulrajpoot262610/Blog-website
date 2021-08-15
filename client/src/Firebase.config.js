import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBfpCRNUNfgwCJZWrMz4VlzQG2yXfFwMLo",
    authDomain: "blog-app-2debf.firebaseapp.com",
    projectId: "blog-app-2debf",
    storageBucket: "blog-app-2debf.appspot.com",
    messagingSenderId: "651382840647",
    appId: "1:651382840647:web:97f0916d1ee7d5c5f58062",
    measurementId: "G-9Y6HGWM7C1"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
export default storage

