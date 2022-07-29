import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView } from 'react-native';


const TestImageBG = ({ navigation }) => {
    
    return (
            <ImageBackground
        source={require('../../assets/sunset.png')}
        style={styles.container}
        blurRadius={40}
  >
       
        </ImageBackground>
        

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    }
   
});

export default TestImageBG;
