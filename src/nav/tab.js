import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import HomeScreenAuth from '../components/ConnectLog/HomeScreenAuth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Synthesis from '../components/Synthesis';
import Stats from '../components/Stats';
import MyTransactions from '../components/MyTransactions.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()
const TabNav = () => {
    /**<Tab.Screen name="Synthèse" component={Synthesis} /> */
/*     const tabBarOptions = {
        tabStyle: {
                justifyContent: 'center',
                    backgroundColor: 'blue',
        },
} */
    return (
        <Tab.Navigator 
        >
            <Tab.Screen /* tabBarOptions={ tabBarOptions } */
                screenOptions={{ headerShown: false }}
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon="house" size={30} />),
                }}
                ta
            />
            <Tab.Screen name="Mes stats" component={Stats}
            
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon="chart-line" /* color='#10eaae'  */size={30} />),
                }}
            />
            <Tab.Screen name="Mes transactions" component={MyTransactions}
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon="file-invoice-dollar" /* color='#49bed0' */ size={30} />),
                }}
            />
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