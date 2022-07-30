import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './tab'
import AddForm from '../components/AddForm'
import UpdateForm from '../components/UpdateForm';
import LoginScreen from '../components/ConnectLog/LoginScreen'
import RegisterScreen from '../components/ConnectLog/RegisterScreen';
import StackAuth from './stackAuth';

const Stack = createNativeStackNavigator()
const StackNav = () => {

  return (

    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Accueil" component={TabNav} />
      <Stack.Screen name="Ajout transaction" component={AddForm} />
      <Stack.Screen name="Modif transaction" component={UpdateForm} />
    </Stack.Navigator>



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