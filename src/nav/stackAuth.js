import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, LogBox } from 'react-native';
import { get_full_data } from '../functions/get_full_data_function'
import { total_incomes_or_expenses } from '../functions/calculations';
import { balance } from '../functions/calculations'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/ConnectLog/LoginScreen';
import RegisterScreen from '../components/ConnectLog/RegisterScreen';
import HomeScreenAuth from '../components/HomeScreenAuth';
const Stack = createNativeStackNavigator()

const StackAuth = (props) => {
  
    return (

        <Stack.Navigator>
                        <Stack.Screen name="HomeScreenAuth" component={HomeScreenAuth} />

            <Stack.Screen name="Inscription" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />

        </Stack.Navigator>

    )
}
export default StackAuth;