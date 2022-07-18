import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, LogBox } from 'react-native';
import {get_full_data} from '../functions/get_full_data_function'
import {total_incomes_or_expenses} from '../functions/calculations';
import {balance} from '../functions/calculations'

const TransactionDetails = (props) => {
 console.log(props, "dans le composant transactiondetails");
/* const transactionDetails = route.params
console.log(transactionDetails); */
    return (
<View>
    <Text>Nom : <Text style={{color:'red'}}>{props.firstname}</Text></Text>
    <Text >Prénom : <Text style={{color:'red'}}>{props.lastname}</Text></Text>
    <Text>ID : <Text style={{color:'red'}}>{props.id}</Text></Text>
    <Text>Type : <Text>{props.type}</Text></Text>
    <Text>Catégorie :<Text>{props.category}</Text></Text>

    <Text>Montant : <Text>{props.amount}</Text></Text>
    <Text>Commentaire : <Text>{props.comment}</Text></Text>

</View>
    )
}
export default TransactionDetails;