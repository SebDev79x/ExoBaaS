import { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Divider } from 'react-native-paper';
import get_full_data from '../functions/get_full_data_function'
import delete_doc_func from '../functions/delete_doc_function'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

// Ecran pour tester la réception des données
const MyTransactions = ({ navigation, route }) => {
  const collection = "transactions"
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    try {
      get_full_data(collection, setTransactions)
    } catch (err) {
      console.log("err", err);
    }
  }, [])
  {/* <ImageBackground
      source={require('../../assets/beach.jpg')}
      style={styles.container}
      blurRadius={40}
    > 
       </ImageBackground>
 */  }
  console.table(transactions)
  return (!transactions.length ? (<View style={styles.noData}><Text>AUCUNE DONNEE DISPONIBLE</Text></View>) :

    <View >
      <FlatList
        data={transactions}
        renderItem={({ item }) =>
          <View style={styles.icons}>
            <View style={styles.icons2}>
              <Text>Opération N° : {item.id}</Text>
              <Divider />
              <Text>Cat : {item.category}</Text>
              <Divider />
              <Text>{item.type == "Débit" ? "Débiteur : " : "Créditeur : "}{item.lastname}</Text>
              <Divider />
              <Text>Montant : {item.amount}</Text>
              <Divider />
            </View>
            <View style={[styles.icons3, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Modif transaction', { item })
                }} >
                <FontAwesomeIcon icon="eye" size={30} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  delete_doc_func(item.id)
                }} >
                <FontAwesomeIcon icon="trash" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.space}>
            </View>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: 'red'
  },
  icons2: {
    flex: .7,
    /* flexDirection: 'row', 
    justifyContent:'space-evenly', */
    borderWidth: 2,
    borderColor: 'blue'
  },
  icons3: {
    flex: .3,

    /* flexDirection: 'row', 
    justifyContent:'space-evenly', */
    borderWidth: 2,
    borderColor: 'green'
  },
  btnUpdate: {
    /* '#306ec2' */
    backgroundColor: '#306ec2',
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10

  },
  textUpdate: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  btnDelete: {
    /* '#306ec2' */
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    alignItems: 'center',
    borderRadius: 10

  },
  textDelete: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  noData: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  space: {
    height: 100
  }

});

export default MyTransactions;
