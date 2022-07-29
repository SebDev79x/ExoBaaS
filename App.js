import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { authentication } from './database/config';
import { db } from './database/config'
import StackNav from './src/nav/stack';
import HomeScreenAuth from './src/components/ConnectLog/HomeScreenAuth';
import { NavigationContainer } from '@react-navigation/native';
import StackAuth from './src/nav/stackAuth';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons/faFileInvoiceDollar'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SafeAreaProvider } from 'react-native-safe-area-context'
library.add(fab, faSquareCheck, faSearch, faEye, faTrash, faHouse, faChartLine, faFileInvoiceDollar)


export default function App() {

  // Set an initializing state whilst Firebase connects
/*   const [initializing, setInitializing] = useState(true);
 */  const [isUserLoggedin, setIsUserLoggedin] = useState(false)

  // Handle user state changes
  /* function onAuthStateChanged(user) {
    setIsUserLoggedin(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null
  } */
/*   const checkIfUserIsLogged = () =>{
    const auth = getAuth();
    const user = auth.currentUser;
console.log("APP auth.currentUser",user);
    onAuthStateChanged(auth, (user) => {
      console.log("APP user", user);
      if (user) {
        setIsUserLoggedin(true)
        console.log("APP UTILISATEUR CONNECTÉ user",user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
      } else {
        // User is signed out
        setIsUserLoggedin(false)
  
        console.log("APP non connecté");
      }
    });
  }
  checkIfUserIsLogged() */

  
  useEffect(()=>{
    
  })
  return (
    // En fonction du statut de l'utilisateur, switch de la stack
<SafeAreaProvider>
    <PaperProvider>
      <NavigationContainer>

        {isUserLoggedin == true ? <StackNav /> : <StackAuth />}

      </NavigationContainer>
    </PaperProvider>
    </SafeAreaProvider>)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
