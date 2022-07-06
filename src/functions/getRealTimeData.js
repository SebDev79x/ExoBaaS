import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import superData from '../functions/getdata'
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc,updateDoc } from 'firebase/firestore';


// Composant Liste des transactions
const getDataFromDB = (props) =>{
const {collectionName} = props
const {setMethod} = props
    const unsub = onSnapshot(collection(db, {collectionName}), (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });
        setMethod(documents);
    });
    return () => unsub();
}

export default getDataFromDB;