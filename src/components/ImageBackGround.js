import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const ImageBackGround = (props) => {
    const  {urlToInsert}  = props
 
    return (
        <ImageBackground source={{ uri: props.urlToInsert }} style={styles.image}>
    <Text>Inside</Text>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        flex: 1,
        resizeMode: 'cover'
    }

});

export default ImageBackGround;