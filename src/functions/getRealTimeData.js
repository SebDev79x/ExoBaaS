/* import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import superData from '../functions/getdata'
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc,updateDoc } from 'firebase/firestore';


// Composant Liste des transactions
const UpdateTransaction = (id,data) => {
   
    const ref = doc(db, "transactions", id);

    await updateDoc(ref, {
        "firstname": data.firstname,
        "lastname": data.lastname,
        "type": data.type,
        "category": data.category,
        "amount": data.amount,
        "comment": data.comment    });
   
}



export default UpdateTransaction; */