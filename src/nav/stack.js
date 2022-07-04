import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../components/homescreen';
import Account from '../components/account'
import Stats from '../components/stats';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './tab'
import AddIncomes from '../components/addIncomesWithDB'
import AddExpenses from '../components/addExpensesWithDB'
import ScreenTest from '../components/test';
// remettre         <Stack.Screen  name="Accueil" component={TabNav} /> à  la place de         <Stack.Screen  name="Accueil" component={HomeScreen} />


const Stack = createNativeStackNavigator()
const StackNav = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator >
        <Stack.Screen  name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Ajout Revenus" component={AddIncomes} />
        <Stack.Screen name="Ajout Dépenses" component={AddExpenses} />
        <Stack.Screen name="Ecran test" component={ScreenTest} />

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