import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import Data from '../../file.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

// REVENUS TOTAUX
const totalCountIncomes = (json) => {
    return Number(json.map((e) => e.incomes
        .map((e) => +(e.amount
            .replace(/[€,]/g, '')))
        .reduce((a, b) => {
            return a + b
        }, 0)))
}
// DEPENSES TOTALES
const totalCountExpenses = (json) => {
    return Number(json.map((e) => e.expenses
        .map((e) => +(e.amount
            .replace(/[€,]/g, '')))
        .reduce((a, b) => {
            return a + b
        }, 0)))
}
// METHODE DE CALCUL DE LA BALANCE
const Balance = (a, b) => {
    let total = a - b
    return total.toFixed(2)
}
// BALANCE
const myBalance = Balance(totalCountIncomes(Data), totalCountExpenses(Data));
console.log("myBalance",myBalance);
// ASYNCSTORAGE POUR ENREGISTRER LA BALANCE
const StoreData = async (el) => {
    try {
        await AsyncStorage.setItem('solde', el)

    } catch (e) {
        console.log(e);
    }
}
// EXECUTION DE LA METHODE
const youpi = StoreData(myBalance)
console.log("StoreData(myBalance)",StoreData(myBalance));
// TABLEAU DEPENSES/ EXPENSES
const objectsExp = Data.map((e)=>{
    return e.expenses
    })
    // TABLEAU REVENUS/ INCOMES
    const objectsInc = Data.map((e)=>{
        return e.incomes
        })
// DEPENSES => TRI DES OBJETS PAR DATE  
const objAreSortedExp = objectsExp[0].sort((a,b)=>a.date>b.date)
console.log(objAreSortedExp,"objAreSortedExp");

const Misc = () => {
    return (
<View>{youpi}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: '#FAF0D7',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }

});

export default Misc;
