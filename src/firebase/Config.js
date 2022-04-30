import firebase from 'firebase';

import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5tApB5YfGSztn_pim_KjY-hGpNcPN9j8",
    authDomain: "sample-1a86f.firebaseapp.com",
    projectId: "sample-1a86f",
    storageBucket: "sample-1a86f.appspot.com",
    messagingSenderId: "443357550934",
    appId: "1:443357550934:web:6580e642f4c5f49e64def7",
    measurementId: "G-59G1S36NXX"
  };

export default firebase.initializeApp(firebaseConfig);