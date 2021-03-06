import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown'
import { db } from '../../database/config'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import update_document_transaction from '../functions/update_doc_function';
import TransactionDetails from './TransactionDetails';
import { useRef } from 'react';
const updateTransactionValidationSchema = yup.object().shape({
    firstname: yup
        .string()
        .min(3, ({ min }) => `Minimum ${min} caractères`)
        .max(10, ({ max }) => `Minimum ${max} caractères`)
        .required('Requis')
        .matches(
            /^/,
            "Prénom invalide"
        ),
    lastname: yup
        .string()
        .min(3, ({ min }) => `Minimum ${min} caractères`)
        .max(10, ({ max }) => `Minimum ${max} caractères`)
        .required('Requis')
        .matches(
            /^/,
            "Nom invalide"
        ),
    type: yup
        .string(),
    category: yup
        .string(),
    amount: yup
        .string()
        .required('Requis')
        .matches(
            /^\d+(\,\d{1,2})?/,
            "Invalide"
        ),
    comment: yup
        .string()
        .min(5, ({ min }) => `Minimum ${min} caractères`)
        .max(50, ({ max }) => `Minimum ${max} caractères`)
        .required('Requis')
        .matches(
            /^/,
            "Commentaire invalide"
        )
});

const UpdateTransaction = ({ navigation, route }) => {
    // Tableau des types de transactions
    const transactionType = ["Débit", "Crédit", "choix", "Macron", "Brigitte", "Morgan", "Jackie"]
    // Tableau des types de dépenses
    const title = ["Facture", "Logement", "Transport", "Alimentaire", "Foncier", "Patati patata", "Autres"]

    // Destructuring pour récupérer et afficher données dans les inputs
    const { firstname } = route.params.item
    const { lastname } = route.params.item
    const { comment } = route.params.item
    const { amount } = route.params.item
    const { id } = route.params.item
    const { category } = route.params.item
    const { type } = route.params.item
    // States
    /*     const [categoryX, setCategory] = useState(category);
     *//*     const [typeX, setType] = useState(type);
   */    // States pour afficher données en temps réel hors des inputs
    const [fname, setFname] = useState(firstname)
    const [lname, setLname] = useState(lastname)
    const [cmt, setComment] = useState(comment)
    const [amt, setAmount] = useState(amount)
    const [cat, setCat] = useState(category)
    const [typeoftransaction, setTypeoftransaction] = useState(type)
    /* useEffect(()=>{
        setCat(category)
    }) */
    return (

        <View>
            <ScrollView style={styles.scrollView}>
            <View>
                <TransactionDetails
                    firstname={fname}
                    lastname={lname}
                    comment={cmt}
                    amount={amt}
                    id={id}
                    type={typeoftransaction}
                    category={cat}
                />
            </View>

            <Formik
                initialValues={{
                    firstname: firstname,
                    lastname: lastname,
                    category: category,
                    type: type,
                    amount: amount,
                    comment: comment
                }}
                validateOnMount={true}
                onSubmit={(data) => {
                    data.category = cat
                    data.type = typeoftransaction
                    update_document_transaction({ ...data }, "transactions", id)
                }}
                validationSchema={updateTransactionValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
                    <View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Prénom</Text>
                            </View>
                            {/* <TextInputComponent
                            style={styles.input}
                            mode="flat"
                            placeholder="Prénom"
                                    placeholderTextColor={'grey'}
                                    onChangeText={(value) => {
                                        handleChange('firstname')(value)
                                        setFname(value)
                                    }}
                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                            /> */}
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Prénom"
                                    placeholderTextColor={'grey'}
                                    onChangeText={(value) => {
                                        handleChange('firstname')(value)
                                        setFname(value)
                                    }
                                    }

                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                                />
                            </View>
                            {(touched.firstname && errors.firstname) && <Text style={styles.errors}>{errors.firstname}</Text>}
                        </View>
                        <View style={{ height: 30 }}></View>

                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Nom</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Nom"
                                    placeholderTextColor={'grey'}
                                    onChangeText={(value) => {

                                        handleChange('lastname')(value)
                                        setLname(value)
                                    }}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                />
                            </View>
                            {(touched.lastname && errors.lastname) && <Text style={styles.errors}>{errors.lastname}</Text>}
                        </View>
                        <View style={{ height: 30 }}></View>
                        <View>
                            <SelectDropdown
                                rules={{
                                    required: {
                                        message: 'Champ requis'
                                    },
                                }}
                                defaultValue={type}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                buttonStyle={styles.dropdown3BtnStyle}
                                data={transactionType}
                                value={values.type}
                                onSelect={(value, selectedItem, index) => {
/*                                     setType(selectedItem)
 */                                    setTypeoftransaction(value)
                                }}
                            />
                        </View>
                        <View style={{ height: 30 }}></View>
                        <View>
                            <SelectDropdown
                                rules={{
                                    required: {
                                        message: 'Champ requis'
                                    },
                                }}
                                defaultValue={category}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                buttonStyle={styles.dropdown3BtnStyle}
                                data={title}
                                value={values.category}
                                onSelect={(value, selectedItem, index) => {

/*                                     setCategory(selectedItem)(value)

 */                                    setCat(value)
                                }}
                            />
                        </View>
                        <View>
                            <View style={{ height: 30 }}></View>
                        </View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Montant : </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Montant"
                                    placeholderTextColor={'grey'}
                                    onChangeText={(value) => {
                                        handleChange('amount')(value)
                                        setAmount(value)
                                    }}
                                    onBlur={handleBlur('amount')}
                                    value={values.amount}
                                />
                            </View>
                            {(touched.amount && errors.amount) && <Text style={styles.errors}>{errors.amount}</Text>}
                        </View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Commentaire</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    multiline
                                    numberOfLines={10}
                                    mode="flat"
                                    placeholder="Commentaire"
                                    placeholderTextColor={'grey'}
                                    onChangeText={(value) => {
                                        handleChange('comment')(value)
                                        setComment(value)
                                    }}
                                    onBlur={handleBlur('comment')}
                                    value={values.comment}
                                />
                            </View>
                            {(touched.comment && errors.comment) && <Text style={styles.errors}>{errors.comment}</Text>}
                        </View>
                        <View style={styles.center2}>
                            <TouchableOpacity
                                style={styles.btnPass}
                                onPress={handleSubmit} title="Submit">
                                <Text style={styles.textPass}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
            </ScrollView>
        </View>
    );
}

// Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8CC0DE',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    input: {
        backgroundColor: 'grey',
        color: 'black',
        fontSize: 18,
        borderRadius: 10,
        padding: 10
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginBottom: 10,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,

    },

    inputs: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    btnUpdate: {
        /* '#306ec2' */
        backgroundColor: '#306ec2',
        padding: 10,
        width: 100,
        alignItems: 'center',
        borderRadius: 10

    },
    textUpdate: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    btnDelete: {
        /* '#306ec2' */
        backgroundColor: 'red',
        padding: 10,
        width: 100,
        alignItems: 'center',
        borderRadius: 10

    },
    textDelete: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    errors: {
        color: 'red'
    },
    align: {
        flexDirection: 'row'
    },
    center: {
        alignItems: 'center'
    },
    center2: {
        alignItems: 'center',
        marginTop: 15
    },
    btnPass: {
        /* '#306ec2' */
        backgroundColor: '#FFA8A8',
        padding: 10,
        width: 150,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 18
    },
    textPass: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },

     dropdown3BtnStyle: {
         height: 50,
         backgroundColor: '#68A7AD',
         paddingHorizontal: 0,
         borderRadius: 18,
         borderColor: '#444',
 
     },
     dropdown1BtnTxtStyle: {
         color: '#fcf5d9',
         fontWeight: 'bold',
         fontSize: 20,
     }
});

export default UpdateTransaction;
