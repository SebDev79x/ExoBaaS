import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomeScreenAuth = ({ navigation }, props) => {

    const auth = getAuth();
    const user = auth.currentUser;
    console.log("HSAuth auth.currentUser", user);

    return (
        <ImageBackground
            source={require('../../../assets/beach.jpg')}
            style={styles.container}
            blurRadius={40}
        >
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Inscription') }}
                        style={styles.btnLastOps}
                    >
                        <Text style={styles.textLastOps}>Inscription</Text>
                    </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Login') }}
                        style={styles.btnLastOps}
                    >
                        <Text style={styles.textLastOps}>Connexion</Text>
                    </TouchableOpacity>
                </View>
                <View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    alignAsARow: {
        flexDirection: 'row'
    },
    btnConnection: {
        padding: 10,
        backgroundColor: '#306ec2',
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

        backgroundColor: '#6dd6db',
        padding: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 10
    },
    textLastOps: {
        color: '#449094',
        fontWeight: 'bold',
        fontSize: 18
    },
});

export default HomeScreenAuth;
