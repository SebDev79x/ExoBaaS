import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown'
/* import firebase from '../../database/firebaseDb';*/

/* good import superData from '../functions/getdata' 
 */// Using DB reference
/*  import getData from '../functions/getdata.js'
 */import { db } from '../../database/config'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';

// Tableau des types de dépenses
const title = ["Facture", "Logement", "Transport", "Alimentaire", "Foncier", "Patati patata", "Autres"]
// Tableau des types de transactions
const transactionType = ["Débit", "Crédit"]

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
// TEST NEW METHOD
/* export const UserContext = React.createContext();
 */
// Mon composant principal
const AddATransaction = ({ navigation, route }) => {
    const thisTransaction = route.params
    console.log("ON récupère bien les données dans la console, pas dans les inputs, mais c'est normal, rien n'a été fait ni tenté à ce niveau-là");
    console.log("thistransaction", thisTransaction);
    // State du tableau global des dépenses
    /*     const [myExpensesArray, setMyExpensesArray] = useState('')
     */
    // State de la catégorie
    const [category, setCategory] = useState("Aucune catégorie");
    const [type, setType] = useState("Rien");

    /*  const [firstnameX, setFirstname] = useState('')
    const [lastnameX, setLastname] = useState('') 
    const [amountX, setAmount] = useState('')
    const [commentX, setComment] = useState('') */

    // Fonction getData => data from database
    /*    const getData = async ("expenses",) => {
            try {
                let result = await superData.then((e) => e)
                    .catch((err) => err)
                console.log(result, "result");
                setMyExpensesArray(result)
            } catch (err) {
                console.log("erreur survenue avec GETDATA");
            }
        }
        */
    /*  useEffect(()=>{
        getData()
    console.log("myExpensesArray après submit",myExpensesArray);
    },[])  */
    /* GOOOOOOOOD   const dbRef = firebase.firestore().collection('expenses');
       const createExpense = async (firstnameParam, lastnameParam, categoryParam, amountParam, commentParam) => {
           await dbRef
               .add({
                   firstname: firstnameParam,
                   lastname: lastnameParam,
                   category: categoryParam,
                   amount: amountParam,
                   comment: commentParam
               })
               .then((e) => console.log("e", e))
               .catch((err) => console.log("une erreur est survenue", err))
       }
        const youpi =  getData("expenses","expenses"+data.firstname+data.lastname,setMyExpensesArray) */
    


   /*  const youpi = collection(db, "transactions");
    const docRef = doc(db, "transactions");
    console.log("collection", docRef.path); */

    const [myTransactions, setMyTransactions] = useState('')


    useEffect(() => {
        const unsub = onSnapshot(collection(db, "transactions"), (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            });
            setMyTransactions(documents);
        });
        return () => unsub();
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
            {/*    <View>

                <TouchableOpacity
                    style={styles.btnUpdate}
                    onPress={() => {
                        navigation.navigate('Ecran test')
                    }}>
                    <Text style={styles.textUpdate}>GOOOOO</Text>
                </TouchableOpacity>

            </View> */}
            <Formik
                initialValues={{ firstname: '', lastname: '', typeTransaction: '', category: '', amount: '', comment: '' }}
                validateOnMount={true}
                onSubmit={(data, { resetForm }) => {

                    /* ,{resetForm} setLastname(data.lastname)
                     setAmount(data.amount)
                     setComment(data.comment) */
                    createExpense(data.firstname, data.lastname, type, category, data.amount, data.comment)
                    resetForm({ data })
                    navigation.navigate('Liste transactions', { data: [...myTransactions, data] })

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
                                data={transactionType}
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
                                data={title}
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

                {/*  <View>
                    <FlatList
                        data={myTransactions}

                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <View>
                                    </View>
                                    <View style={styles.alignRow}>
                                        <Text>Type de transaction : {item.type}</Text>
                                        <Text>Cat : {item.category}</Text>
                                        <Text>{item.type == "Débit" ? "Débiteur : " : "Créditeur : "}{item.lastname}</Text>
                                        <Text>Montant : {item.amount}</Text>
                                    </View>
                                    <View style={styles.alignColumn}>
                                        <Text>Commentaire : {item.comment}</Text>
                                        <Text>Opération N° : {item.id}</Text>
                                    </View>
                                </View>

                                <View>

                                    <TouchableOpacity
                                        style={styles.btnUpdate}
                                        onPress={() => {
                                            console.log("submit de la transaction");
                                        }} title="Submit">
                                        <Text style={styles.textUpdate}>Modifier</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.btnDelete}
                                        onPress={() => {
                                            console.log("submit de la transaction");
                                        }} title="Submit">
                                        <Text style={styles.textDelete}>Supprimer</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        }
                    />
                </View> */}
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
