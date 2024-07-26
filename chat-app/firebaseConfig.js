import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDPDNbm2sE0PDjXOQMPD3N1Az_FF3FpdLI",
    authDomain: "chatapp-tutorial-1c26c.firebaseapp.com",
    projectId: "chatapp-tutorial-1c26c",
    storageBucket: "chatapp-tutorial-1c26c.appspot.com",
    messagingSenderId: "203830797060",
    appId: "1:203830797060:web:81b105d956095906ffa651"
};
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app)
export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');