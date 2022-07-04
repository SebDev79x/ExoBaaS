import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADbG5aQitVquim-Pif6R710gRcb8cuSg0",
    authDomain: "reactnativefirebase-00000.firebaseapp.com",
    databaseURL: "https://reactnativefirebase-00000.firebaseio.com",
    projectId: "exobaas-c0521",
    storageBucket: "reactnativefirebase-00000.appspot.com",
    messagingSenderId: "000000000000000",
    appId: "1:1095075012837:android:f8a02761b1d20d0c6fb40c"
};
// aide install https://firebase.google.com/docs/web/modular-upgrade
// https://firebase.google.com/docs/android/setup#java_1
// https://firebase.google.com/docs/cli
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)