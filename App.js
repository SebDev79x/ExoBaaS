import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { authentication } from './database/config';
import {db} from './database/config'
import StackNav from './src/nav/stack';
import HomeScreenAuth from './src/components/HomeScreenAuth';
import { NavigationContainer } from '@react-navigation/native';
import StackAuth from './src/nav/stackAuth';
export default function App() {
/*     const [isUserLoggedin, setIsUserLoggedin] = useState(true)
 *//*     useEffect(()=>{
      setIsUserLoggedin(false)

    }) */
    const isUserLoggedin = false
  return (
    // En fonction du statut de l'utilisateur, switch de la stack
    <NavigationContainer>
      {isUserLoggedin ? <StackAuth /> : <StackNav />}

    </NavigationContainer>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
