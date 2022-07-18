import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import get_full_data from '../functions/get_full_data_function'
import delete_doc_func from '../functions/delete_doc_function'
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

  return (!transactions.length ? (<View style={styles.noData}><Text>AUCUNE DONNEE DISPONIBLE</Text></View>) :
    <View>
      <FlatList
        data={transactions}
        renderItem={({ item }) =>
          <View style={{ flexDirection: 'row',justifyContent:'space-evenly' }}>
            <View>
              <Text>Opération N° : {item.id}</Text>
              <Text>Cat : {item.category}</Text>
              <Text>{item.type == "Débit" ? "Débiteur : " : "Créditeur : "}{item.lastname}</Text>
              <Text>Montant : {item.amount}</Text>
            </View>
            <View>
              <View>
                <TouchableOpacity
                  style={styles.btnUpdate}
                  onPress={() => {
                    navigation.navigate('Modif transaction', { item })
                  }} title="Submit">
                  <Text style={styles.textUpdate}>Voir/Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => {
                    delete_doc_func(item.id)

                  }} title="Submit">
                  <Text style={styles.textDelete}>Supprimer</Text>
                </TouchableOpacity>
              </View>
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
