import * as React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { db } from '../../../database/config'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';
/* import { auth } from '../../../database/config'
 */
const registerValidationSchema = yup.object().shape({
    firstname: yup
        .string()
        .min(3, ({ min }) => `Minimum ${min} caractères`)
        .max(12, ({ max }) => `Maximum ${max} caractères`)
        .required('Requis')
        .matches(
            /^/,
            "Prénom invalide"
        ),
    lastname: yup
        .string()
        .min(3, ({ min }) => `Minimum ${min} caractères`)
        .max(12, ({ max }) => `Maximum ${max} caractères`)
        .required('Requis')
        .matches(
            /^/,
            "Nom invalide"
        ),
    email: yup
        .string()
        .email('Saisissez un email valide')
        .max(100, ({ max }) => `Maximum ${max} caractères`)

        .required('Requis'),
    password: yup
        .string()
        .min(2, ({ min }) => `Minimum ${min} caractères`)
        .required('Requis'),

    password2: yup
        .string()
        .min(2, ({ min }) => `Minimum ${min} caractères`)
        .required('Requis')

});

const RegisterScreen = ({ navigation }) => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [users, setUsers] = useState('')


    /* useEffect(() => {
        let isMounted = true;
        const unsub = onSnapshot(collection(db, "users"), (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            });
            if (isMounted) {
                setUsers(documents);
            }
        });
        return () => {
            unsub()
            { isMounted = false }
        };
    }, []) */
    /*  useEffect(() => {
         try{
             get_full_data('users',setUsers)
 
         }catch(err){
 console.log("erreur useeffect gel full data",err);
         }
     }) */


    // Génération d'un nombre aléatoire pour l'ID
    const randomNumberId = () => {
        return Date.now()
    }
    // Ajout/Création d'une transaction
    const createUser = (firstnameParam, lastnameParam, emailParam, passwordParam, password2Param) => {
        const myDoc = doc(db, "users", `${randomNumberId()}`)
        const docData = {
            "firstname": firstnameParam,
            "lastname": lastnameParam,
            "email": emailParam,
            "password": passwordParam,
            "password2": password2Param,
        }
        setDoc(myDoc, docData)
            .then((element) => {
                console.log(element, "USER");
            })
            .catch((err) => {
                console.log("youpi une erreur !", err);
            })
    }

    const onHandleRegister = async () => {
        try {
            const auth = getAuth();
            console.log(auth, "auth");
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user

                    console.log("userCredentials", userCredential);
                    console.log("user", user);
                })
                .catch((error) => console.log(error, "erreur dans usercredentials"))
        } catch (err) {
            console.log("erreur dans try catch credentials", err);
        }
    }

    useEffect(() => {
        if (email && password) {
            onHandleRegister(email, password)
        }

    })
    return (<View>
        <ScrollView style={styles.scrollView}>

            <Formik
                initialValues={{
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    password2: password2
                }}
                validateOnMount={true}
                onSubmit={(data) => {
                    createUser(data.firstname, data.lastname, data.email, data.password, data.password2)
                    /*   setEmail(data.email)
                      setPassword(data.password) */
                    setEmail(data.email)
                    setPassword(data.password)

/*                     console.log(data, "data");
 */                    navigation.navigate('Login', { data: [...users, data], dataUser: data })
/*                 update_document_transaction({ ...data }, "transactions", id)
 */            }}
                validationSchema={registerValidationSchema}
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
                                    onChangeText={handleChange('firstname')

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
                                    onChangeText={handleChange('lastname')}

                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                />
                            </View>
                            {(touched.lastname && errors.lastname) && <Text style={styles.errors}>{errors.lastname}</Text>}
                        </View>
                        <View style={{ height: 30 }}></View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Email</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Email"
                                    placeholderTextColor={'grey'}
                                    onChangeText={

                                        handleChange('email')
                                    }





                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            {(touched.email && errors.email) && <Text style={styles.errors}>{errors.email}</Text>}
                        </View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Mot de passe</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Mot de passe"
                                    placeholderTextColor={'grey'}
                                    onChangeText={handleChange('password')
                                    }

                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>
                            {(touched.password && errors.password) && <Text style={styles.errors}>{errors.password}</Text>}
                        </View>
                        <View style={{ height: 30 }}></View>
                        <View>
                            <View style={styles.center}>
                                <Text style={styles.label}>Confirmation</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    mode="flat"
                                    placeholder="Mot de passe"
                                    placeholderTextColor={'grey'}
                                    onChangeText={handleChange('password2')}

                                    onBlur={handleBlur('password2')}
                                    value={values.password2}
                                />
                            </View>
                            {(touched.password2 && errors.password2) && <Text style={styles.errors}>{errors.password2}</Text>}
                        </View>

                        <View>
                            <View style={{ height: 30 }}></View>
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
    /*     height: 40,
     */    backgroundColor: '#fcf5d9',
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
        color: '#FAF0D7',
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
    /* end :{
      alignItems:'flex-end'
    } */
    /*   pic: {
        width: 180,
        height: 180,
        resizeMode: 'contain'
      },
        picContainer: {
          flex: .4,
        
        }, */
});
export default RegisterScreen;