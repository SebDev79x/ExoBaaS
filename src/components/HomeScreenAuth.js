import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationEvents } from 'react-navigation';
import RegisterScreen from './ConnectLog/RegisterScreen';
import LoginScreen from './ConnectLog/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackAuth from '../nav/stackAuth';
import StackNav from '../nav/stack';

const HomeScreenAuth = ({ navigation }) => {

  

    return (

        <View style={styles.container}>
            <Text>My auth screen</Text>
            <View>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Inscription')}}
                    style={styles.btnLastOps}
                >
                    <Text style={styles.textLastOps}>Inscription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Login')}}
                    style={styles.btnLastOps}
                >
                    <Text style={styles.textLastOps}>Connexion</Text>
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </View>
    )
        
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

export default HomeScreenAuth;
