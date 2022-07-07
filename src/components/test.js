import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { db } from '../../database/config'
import GetRealTimeData from '../functions/getRealTimeData'
import { doc, setDoc, collection, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

// Ecran pour tester la réception des données
const Test = ({ navigation, route }) => {
  const collection = "transactions"
  const [transactions, setTransactions] = useState('')
  const [dataExist, setDataExist] = useState(false)

  // EN PAUSE !!
  /*   console.log("TESTFUNCTION",  GetRealTimeData(collection,setTransactions));
   */
  const updateState = (array) => {
    setDataExist(false)

    if (array.length > 0) {
      console.log("ARRAY VAUT : ", array);
      setDataExist(true)
    }
  }
  useEffect(() => {
    GetRealTimeData(collection, setTransactions)
    updateState(transactions)
  }, [])
  console.log("transactionsYOUPI", transactions);
  return (dataExist == false ? (<View style={styles.noData}><Text>AUCUNE DONNEE DISPONIBLE</Text></View>) :
    <View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => {
          <View>
            <Text>Type de transaction : {item.type}</Text>
            <Text>Cat : {item.category}</Text>
            <Text>{item.type == "Débit" ? "Débiteur : " : "Créditeur : "}{item.lastname}</Text>
            <Text>Montant : {item.amount}</Text>
          </View>
        }
        }
      />
    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'green'
  },

});

export default Test;
