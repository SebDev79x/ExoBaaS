import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Dimensions } from 'react-native';

const ImageToDisplay = (string) =>{
    if((string.at(0) + string.at(1)  + string.at(2) + string.at(3)) == 'http'){
        console.log("HTTP OK",string);
        return {uri:string}
    }/* else{
        return youpi = () =>{
            require(string)
        }
       } */
  }

const ImageBG = (props) => {
    const superSource = props
   
  
    return (
        <ImageBackground 
        source={superSource} 
        style={styles.image}>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  
    image: {
      
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width:300,
        height:300
    },

});

export default ImageBG;