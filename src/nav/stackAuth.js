import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/ConnectLog/LoginScreen';
import RegisterScreen from '../components/ConnectLog/RegisterScreen';
import HomeScreenAuth from '../components/ConnectLog/HomeScreenAuth';
const Stack = createNativeStackNavigator()

const StackAuth = (props) => {

    return (
      
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreenAuth" component={HomeScreenAuth}  />
            <Stack.Screen name="Inscription" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>

    )
}
export default StackAuth;