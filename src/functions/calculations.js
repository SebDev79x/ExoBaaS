import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import Data from '../../file.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import get_full_data from './get_full_data_function'

// Data de firestore

// Total des REVENUS
export const total_incomes_or_expenses = (collection,typeAsString) => collection.reduce((total,val)=>{
    if(val.type == typeAsString){
total += Number(val.amount)
    }
    return total
},0)
/* // Total des DEPENSES
export const totalExpenses = transactions.reduce((total,val)=>{
    if(val.type == "Débit"){
total += Number(val.amount)
    }
    return total
},0)
console.log("totalIncomes",totalIncomes); */

// METHODE DE CALCUL DE LA BALANCE
export const balance = (a, b) => {
    let total = a - b
    return total.toFixed(2)
}

