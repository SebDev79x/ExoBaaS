import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Account = ({ navigation }) => {


    return (
        <SafeAreaView style={styles.container}>
            <Text>Mon COMPTE</Text>

        </SafeAreaView>
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
    alignRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alignColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    marginAndCenter: {
        margin: 20,
        alignItems: 'center'
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold'
    }

});

export default Account;
