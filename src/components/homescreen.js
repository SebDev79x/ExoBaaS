import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
/* import AsyncStorage from '@react-native-async-storage/async-storage';
 */
import { Dimensions } from 'react-native';
import { total_incomes_or_expenses } from '../functions/calculations';
import { balance } from '../functions/calculations';
import get_full_data from '../functions/get_full_data_function'

const HomeScreen = ({ navigation }) => {
    const [mySolde, setSolde] = useState('')
    const [lastOps, setLastOps] = useState([])
    const collection = "transactions"
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        try {
            get_full_data(collection, setTransactions)

        } catch (err) {
            console.log("err", err);
        }
    }, [])
    const incomes = total_incomes_or_expenses(transactions, "Crédit")
    const expenses = total_incomes_or_expenses(transactions, "Débit")



    return (
        <ImageBackground
        source={require('../../assets/sunset.png')}
        style={styles.container}
        blurRadius={30}
  >
        <View style={styles.container}>
<View style={styles.test}>
            {/*  <View >
                    <Image
                        source={require('../../assets/sunset.png')}
                        style={styles.imageBG}
                    />
                   
                </View> */}
{/* <View style={styles.globalWithoutImage}>
 */}

               
                <View style={styles.amountAndSolde}>
                    <Text style={styles.amount}>{balance(incomes, expenses)} <Text style={styles.currency}>€</Text></Text>
                <Text  style={styles.solde}>Solde actuel</Text>
                </View>
          
                <View>

                    <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={() => navigation.navigate('Ajout transaction')}
                    >
                        <Text style={styles.textRegister}>Ajout Transaction</Text>
                    </TouchableOpacity>
                </View>

{/*                 </View>
 */}</View>
        </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    test:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'space-evenly',     
    },
    amount:{
        fontSize:40,
        fontWeight:'bold',
        color:'white',
    },
    currency:{
        fontSize:30,

    },
    solde:{
        fontSize:18,
        color:'grey',
      

    },
    amountAndSolde:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    /* globalWithoutImage:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    
   
    imageBG: {

        resizeMode: 'cover',
        justifyContent: 'center',
      
    },
     */
    btnRegister: {
        padding: 10,

        backgroundColor: '#F4BFBF',
        padding: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 10
    },

    textRegister: {
        color: 'grey',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
   
});

export default HomeScreen;
