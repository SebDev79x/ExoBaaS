import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown'
import firebase from '../../database/firebaseDb';

import superData from '../functions/getdata'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

// Tableau des types de dépenses
const expensesMisc = ["Facture", "Logement", "Transport", "Alimentaire", "Foncier", "Autres dépenses"]
// Objet YUP
const expensesValidationSchema = yup.object().shape({
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

// Mon composant principal
const AddExpenses = ({ navigation }) => {

    // State du tableau global des dépenses
    const [myExpensesArray, setMyExpensesArray] = useState('')

    // State de la catégorie
    const [category, setCategory] = useState("Aucune catégorie");
    /*  const [firstnameX, setFirstname] = useState('')
    const [lastnameX, setLastname] = useState('') 
    const [amountX, setAmount] = useState('')
    const [commentX, setComment] = useState('') */

    // Fonction getData => data from database
   /* const getData = async () => {
        try {
            let result = await superData.then((e) => e)
                .catch((err) => err)
            console.log(result, "result");
            setMyExpensesArray(result)
        } catch (err) {
            console.log("erreur survenue avec GETDATA");
        }
    }
 useEffect(()=>{
    getData()
console.log("myExpensesArray après submit",myExpensesArray);
},[]) */
    const dbRef = firebase.firestore().collection('expenses');
    const createExpense = async (firstname, lastname, category, amount, comment) => {
        await dbRef
            .add({
                firstname: firstname,
                lastname: lastname,
                category: category,
                amount: amount,
                comment: comment
            })
            .then((e) => console.log("e", e))
            .catch((err) => console.log("une erreur est survenue", err))
    }
    return (
        <View>
            <Formik
                initialValues={{ firstname: '', lastname: '', category: '', amount: '', comment: '' }}
                validateOnMount={true}
                onSubmit={(data) => {
                    data.category = category

                    /*  setLastname(data.lastname)
                     setAmount(data.amount)
                     setComment(data.comment) */
                    createExpense(data.firstname, data.lastname, category, data.amount, data.comment)
                 
                    /*                     navigation.navigate('Ecran test', { data })
                     */
                }}
                validationSchema={expensesValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
                    <View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Prénom</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Prénom"
                                    placeholderTextColor={'grey'}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                                />
                            </View>
                            {(touched.firstname && errors.firstname) && <Text style={styles.errors}>{errors.firstname}</Text>}
                        </View>
                        <View style={{ height: 30 }}><Text>ESPACE</Text></View>

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
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                />
                            </View>
                            {(touched.lastname && errors.lastname) && <Text style={styles.errors}>{errors.lastname}</Text>}
                        </View>
                        <View style={{ height: 30 }}><Text>ESPACE</Text></View>
                        <View>
                            <SelectDropdown
                                rules={{
                                    required: {
                                        message: 'Champ requis'
                                    },
                                }}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                buttonStyle={styles.dropdown3BtnStyle}
                                data={expensesMisc}
                                value={values.category}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
                                }}
                            />
                        </View>
                        <View>
                            <View style={{ height: 30 }}><Text>ESPACE</Text></View>

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
                                    onChangeText={handleChange('amount')}
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
                                    onChangeText={handleChange('comment')}
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
            <ScrollView>
                <View style={styles.center2}>
                    {/* <TouchableOpacity
                                style={styles.btnPass}
                                onPress={()=>{
                                    youpi()
                                }} title="Submit">
                                <Text style={styles.textPass}>Afficher</Text>
                            </TouchableOpacity> */}
                </View>

                <View>
                    <FlatList
                        data={myExpensesArray}

                        renderItem={({ item }) =>
                            <View>
                                <View>
                                    <Text>______________________</Text>

                                    <Text>______________________</Text>
                                </View>
                                <View style={styles.alignRow}>
                                    <Text>Montant : {item.amount}</Text>
                                    <Text>Cat : {item.category}</Text>
                                </View>
                                <View style={styles.alignColumn}>
                                    <Text>Commentaire : {item.comment}</Text>
                                    <Text>Opération N° : {item.lastname}</Text>
                                </View>
                            </View>
                        }
                    />
                </View>
            </ScrollView>
        </View>
    );
}










const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8CC0DE',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    input: {
/*     height: 40,
*/    backgroundColor: 'grey',
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
/*     marginBottom: 10,
*/    flexDirection: 'column',
        justifyContent: 'space-around',
    },
    btnValidate: {
        /* '#306ec2' */
        backgroundColor: 'yellow',
        padding: 10,
        width: 150,
        alignItems: 'center',
        borderRadius: 10

    },
    textValidate: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
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




export default AddExpenses
