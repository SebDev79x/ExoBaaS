import * as React from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';


const loginValidationSchema = yup.object().shape({

    email: yup
        .string()
        .email('Saisissez un email valide')
        .max(100, ({ max }) => `Maximum ${max} caractères`)
        .required('Requis'),
    password: yup
        .string()
        .min(2, ({ min }) => `Minimum ${min} caractères`)
        .required('Requis'),
});


const LoginScreen = ({ navigation, route }) => {

    if (!route.params) {
        console.log('Aucun param', route.params);
        var noInfoUser = ''
    }
    if (route.params) {
        console.log('Y a des params', route.params);
        var infoUser = route.params.dataUser

    }
    const [email, setEmail] = useState(infoUser ? route.params.dataUser.email : noInfoUser)
    const [password, setPassword] = useState(infoUser ? route.params.dataUser.password : noInfoUser)
    const [isUserLoggedin, setIsUserLoggedIn] = useState(false)
    console.log("email", email);
    console.log("password", password);
    const onHandleLogin = async () => {
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("user",user);
                    console.log("youpi utilisateur connecté");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } catch (err) {
            console.log("erreur try catch handlelogin", err);
        }
    }
  /*   useEffect(() => {
        onHandleLogin()
        console.log("user is logged via firebase");
    },[]) */
/*     setTimeout(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log("utilisateur reconnu");
              // ...
            } else {
              console.log("utilisateur NON reconnu");
            }
          });
    }, 10000); */
    /* console.log("route.params tout court", route.params);
    console.log("route.params.data", route.params.data);
    console.log("route.params.dataUser", route.params.dataUser); */

    
    return (<View>
        <Formik
            initialValues={{

                email: '',
                password: '',
            }}
            validateOnMount={true}
            onSubmit={(data) => {
                setEmail(data.email)
                setPassword(data.password)
                onHandleLogin()
                setIsUserLoggedIn(true)

            }}
            validationSchema={loginValidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, touched, isValid, errors }) => (
                <View>
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
                                onChangeText={handleChange('email')}

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
                                onChangeText={handleChange('password')}

                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        {(touched.password && errors.password) && <Text style={styles.errors}>{errors.password}</Text>}
                    </View>
                    <View style={{ height: 30 }}></View>


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
        </Formik>    </View>)
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
export default LoginScreen;