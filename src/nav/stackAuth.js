import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/ConnectLog/LoginScreen';
import RegisterScreen from '../components/ConnectLog/RegisterScreen';
import HomeScreenAuth from '../components/ConnectLog/HomeScreenAuth';
import TestScreen from '../components/ConnectLog/TestScreen';

const Stack = createNativeStackNavigator()

const StackAuth = (props) => {

    return (

        <Stack.Navigator>
            <Stack.Screen name="HomeScreenAuth" component={HomeScreenAuth} />
            <Stack.Screen name="Inscription" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="TestScreen" component={TestScreen} />
        </Stack.Navigator>

    )
}
export default StackAuth;