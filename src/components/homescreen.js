import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {
    const [mySolde, setSolde] = useState('')

    const GetData = async () => {
        console.log("youpi", mySolde)

        try {
            const value = await AsyncStorage.getItem('solde')
            if (value !== null) {
                // We have data!!
                console.log(value, "ouais");
                setSolde(value);
            }
        } catch (e) {
            // error reading value
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.alignAsARow}>
                
                <TouchableOpacity
                    onPress={() => GetData()}

                >
                    <Text >Mon solde : {mySolde}</Text>
                </TouchableOpacity>
                <Text>SOLDE </Text>
                <Text> || </Text>
                <Text>DERNIERES OPERATIONS</Text>

            </View>
            <View style={styles.btns}>
                <View>

                    <TouchableOpacity
                        style={styles.btnConnection}
                        onPress={() => navigation.navigate('Ajout Revenus')}

                    >
                        <Text style={styles.textConnection}>Ajout REVENUS</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={() => navigation.navigate('Ajout Dépenses')}

                    >
                        <Text style={styles.textRegister}>Ajout DEPENSES</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: '#FAF0D7',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        borderColor: 'red'
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'red'
    },
    validate: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    /*   btns: {
          justifyContent: 'center',
          alignItems: 'center',
      }, */
    alignAsARow: {
        flexDirection: 'row'
    },

    btnConnection: {
        padding: 10,

        backgroundColor: '#306ec2',

        /* '#306ec2' */
        backgroundColor: '#FFD9C0',
        padding: 10,
        width: 150,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10

    },
    btnRegister: {
        padding: 10,

        backgroundColor: '#F4BFBF',
        padding: 10,
        width: 150,
        alignItems: 'center',
        borderRadius: 10
    },
    textConnection: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    textRegister: {
        color: 'grey',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default HomeScreen;
