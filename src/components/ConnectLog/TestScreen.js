import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';




const TestScreen = () => {
  /* const test =  () =>{
    try{
      const auth =  getAuth();
       onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("TESTSCREEN UTILISATEUR CONNECTÉ");
          console.log("TESTSCREEN USER",user)
     
          const uid = user.uid;
        } else {
          console.log("TESTSCREEN non connecté");
        }
      });
    }catch(err){
console.log("TESTSCREEN erreur",err);
    }
     
   
  
  } */
   
  /*  useEffect(()=>{

    test()
    const auth = getAuth();
            const user = auth.currentUser;
            console.log("TESTSCREEN USEEFFECT auth.currentUser",user);
   },[])
 */
    return (<View>
     <Text>ALORS ? CONNECTÉ OU PAS CARPENTIER !??</Text>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8CC0DE',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});
export default TestScreen;