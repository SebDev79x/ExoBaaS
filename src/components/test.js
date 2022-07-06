import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import GetData from '../functions/getRealTimeData'
import { db } from '../../database/config'

// Ecran pour tester la réception des données
const Test = ({ navigation, route }) => {
  
  const [transactions, setTransactions] = useState('')
  let transaction = "transactions"
      return (
        <View style={styles.container} >
<GetData
collectionName = {transaction}
setMethod = {setTransactions}
/>
<Text>{transactions}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color:'green'
    },

});

export default Test;
