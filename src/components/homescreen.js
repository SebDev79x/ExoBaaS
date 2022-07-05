import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [mySolde, setSolde] = useState('')
    const [lastOps, setLastOps] = useState([])
    const GetData = async () => {
        try {
            await AsyncStorage.getItem('solde').then(element => setSolde(element))
            // We have data!!

        } catch (err) {
            // error reading value
            console.log("erreur survenue", err);
        }
    }
    const GetLastOperations = async () => {
        try {
            await AsyncStorage.getItem('lastOps').then(element => {
                setLastOps(JSON.parse(element));
                // or code.toString().. depends on what you stored
            })


        } catch (e) {
            // error reading value
        }
    }

    return (

        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    onPress={() => GetData()}
                    style={styles.btnSolde}

                >
                    <Text style={styles.textSolde}>Mon solde</Text>
                </TouchableOpacity>
                <Text >{mySolde}</Text>

            </View>
            <View>
                <TouchableOpacity
                    onPress={() => GetLastOperations()}
                    style={styles.btnLastOps}

                >
                    <Text style={styles.textLastOps}>Dernières opérations</Text>
                </TouchableOpacity>

            </View>

            <View>
                <FlatList
                    data={lastOps}
                    renderItem={({ item }) =>
                        <View>
                            <Text>ATTENTION : valeurs du fichier json</Text>

                            <Text>Opération en date du {item.date}</Text>
                            <Text>Montant : {item.amount}</Text>
                            <Text>Catégorie : {item.category}</Text>
                            <Text>Commentaire : {item.comments}</Text>
                            <Text>_______________________</Text>
                        </View>
                    }
                />
            </View>
            <View style={styles.btns}>

                <View>
                    <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={() => navigation.navigate('Ajout transaction')}

                    >
                        <Text style={styles.textRegister}>Ajout Transaction</Text>
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

    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'center',

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
        width: 200,
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
    },
    btnSolde: {
        padding: 10,

        backgroundColor: '#a7b3db',
        padding: 10,
        width: 150,
        alignItems: 'center',
        borderRadius: 10
    },
    textSolde: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    btnLastOps: {
        padding: 10,

        backgroundColor: '#a7dbcf',
        padding: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 10
    },
    textLastOps: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
});

export default HomeScreen;
