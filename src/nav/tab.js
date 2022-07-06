import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../../src/components/homescreen';
import Account from '../../src/components/account'
import Stats from '../../src/components/stats';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionsList from '../components/transactionslist';

const Tab = createBottomTabNavigator ()
const TabNav = () => {

    return (
              <Tab.Navigator>
        <Tab.Screen options={{
    headerShown: false
  }}
  name="Retour" component={HomeScreen} />
        <Tab.Screen name="Mon compte" component={Account} />
        <Tab.Screen name="Mes stats" component={Stats} />
        <Tab.Screen name="Liste transactions" component={TransactionsList} />

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