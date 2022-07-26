import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import HomeScreenAuth from '../components/HomeScreenAuth';

import Synthesis from '../components/Synthesis';
import Stats from '../components/Stats';
import MyTransactions from '../components/MyTransactions.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()
const TabNav = () => {
    /**<Tab.Screen name="Synthèse" component={Synthesis} /> */
    return (
        <Tab.Navigator>
            <Tab.Screen

                screenOptions={{ headerShown: false }}
                name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="Mes stats" component={Stats} />
            <Tab.Screen name="Mes transactions" component={MyTransactions} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TabNav;