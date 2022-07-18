import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown'
import { db } from '../../database/config'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';



const TextInputComponent = (props) => {
return(
    <View>
    <TextInput
        style={props.style}
        mode={props.mode}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
     
        value={props.values}
    />
   </View>
)
}
export default TextInputComponent;