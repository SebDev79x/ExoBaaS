import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, LogBox } from 'react-native';


const TransactionDetails = (props) => {
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