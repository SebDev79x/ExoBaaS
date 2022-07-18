import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc,updateDoc } from 'firebase/firestore';


 const update_document_transaction = (value,collectionNameString,id) => {
    const myDoc = doc(db, collectionNameString, id)

    setDoc(myDoc, value)
        .then(() => {
            console.log("UPDATED TRANSACTION");
        })
        .catch((err) => {
            console.log("OUPS une erreur via function update_document_transaction !", err);
        })
}

export default update_document_transaction;