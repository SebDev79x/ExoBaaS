import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc,updateDoc } from 'firebase/firestore';


// Composant Liste des transactions
const getDataFromDB = (collectionName,setMethod) =>{
    // En PAUSE, PHASE TEST !
/* const {collectionName} = props
const {setMethod} = props
const {documents} = props */
    const unsub = onSnapshot(collection(db, collectionName), (querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });
        setMethod(documents);
        console.log("querySnapshot.docs GETREALTRUC", querySnapshot.docs);
        console.log("documents",documents);
    });
    return () => unsub();
}

export default getDataFromDB;