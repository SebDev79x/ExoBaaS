import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import get_full_data from '../functions/get_full_data_function'
import {total_incomes_or_expenses} from '../functions/calculations';
import {balance} from '../functions/calculations'

const StatsToDisplay = ({ navigation }) => {
    const collection = "transactions"
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        try {
            get_full_data(collection, setTransactions)

        } catch (err) {
            console.log("err", err);
        }
    }, [])
const incomes = total_incomes_or_expenses(transactions,"Crédit")
const expenses = total_incomes_or_expenses(transactions,"Débit")

    return (
        <View>
            <Text>Synthèse des data</Text>
            <Text></Text>
            <Text>REVENUS : {incomes}</Text>
            <Text>DEPENSES : {expenses}</Text>

            <Text>{balance(incomes,expenses)}</Text>


        </View>
    )
}
export default StatsToDisplay;
