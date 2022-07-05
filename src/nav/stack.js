import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../components/homescreen';
import Account from '../components/account'
import Stats from '../components/stats';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './tab'
import AddTransaction from '../components/addTransaction'
import TransactionsList from '../components/test';
// remettre         <Stack.Screen  name="Accueil" component={TabNav} /> à  la place de         <Stack.Screen  name="Accueil" component={HomeScreen} />


const Stack = createNativeStackNavigator()
const StackNav = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator >
        <Stack.Screen  name="Accueil" component={TabNav} />
        <Stack.Screen name="Ajout transaction" component={AddTransaction} />
        <Stack.Screen name="Liste transactions" component={TransactionsList} />

      </Stack.Navigator>
      </NavigationContainer>

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

export default StackNav;