import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown'
import { db } from '../../database/config'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';

// Tableau des types de dépenses
const titles = ["Facture", "Logement", "Transport", "Alimentaire", "Foncier", "Patati patata", "Autres"]
// Tableau des types de transactions
const transactionTypes = ["Débit", "Crédit"]

// Objet YUP
const transactionValidationSchema = yup.object().shape({
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
// Mon composant principal
const AddATransaction = ({ navigation, route }) => {
    /*     const thisTransaction = route.params
     */
    // State de la catégorie
    const [category, setCategory] = useState("Aucune catégorie");
    const [type, setType] = useState("Rien");
    const [myTransactions, setMyTransactions] = useState('')


    useEffect(() => {
        let isMounted = true;
        const unsub = onSnapshot(collection(db, "transactions"), (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            });
            if (isMounted) {
                setMyTransactions(documents);
            }
        });
        return () => {
            unsub()
            { isMounted = false }
        };
    }, [])
    // Génération d'un nombre aléatoire pour l'ID
    const randomNumberId = () => {
        return Date.now()
    }
    // Ajout/Création d'une transaction
    const createExpense = (firstnameParam, lastnameParam, typeParam, categoryParam, amountParam, commentParam) => {
        const myDoc = doc(db, "transactions", `${randomNumberId()}`)
        const docData = {
            "firstname": firstnameParam,
            "lastname": lastnameParam,
            "type": typeParam,
            "category": categoryParam,
            "amount": amountParam,
            "comment": commentParam
        }
        setDoc(myDoc, docData)
            .then((element) => {
                console.log(element, "ELEMENT");
            })
            .catch((err) => {
                console.log("youpi une erreur !", err);
            })
    }
    return (
        <View>
            <ScrollView>
            <Formik
                initialValues={{ firstname: '', lastname: '', typeTransaction: '', category: '', amount: '', comment: '' }}
                validateOnMount={true}
                onSubmit={(data, { resetForm }) => {
                    createExpense(data.firstname, data.lastname, type, category, data.amount, data.comment)
                    resetForm({ data })
                    navigation.navigate('Mes transactions', { data: [...myTransactions, data] })
                }}
                validationSchema={transactionValidationSchema}
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
                                    onChangeText={handleChange('lastname')}
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
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                buttonStyle={styles.dropdown3BtnStyle}
                                data={transactionTypes}
                                value={values.type}
                                onSelect={(selectedItem, index) => {
                                    setType(selectedItem)
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
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                buttonStyle={styles.dropdown3BtnStyle}
                                data={titles}
                                value={values.category}
                                onSelect={(selectedItem, index) => {
                                    setCategory(selectedItem)
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




export default AddATransaction;
