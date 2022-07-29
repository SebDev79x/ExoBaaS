import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';


// Liste d'une collection donnée
const get_full_data = (collectionName, setMethod) => {
    let isMounted = true;

    const unsub = onSnapshot(collection(db, collectionName), (querySnapshot) => {
        let documents = querySnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });
        if (isMounted) {
            setMethod(documents);
        }
    });
    return () => {unsub()
    { isMounted = false }
}
}

export default get_full_data;