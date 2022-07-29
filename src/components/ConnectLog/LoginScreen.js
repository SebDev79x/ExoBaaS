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


const LoginScreen = ({ navigation }) => {
/*     const auth = getAuth();
    const user = auth.currentUser;
    console.log("LOGINSCREEN USEEFFECT auth.currentUser",user);

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [isUserLoggedin, setIsUserLoggedIn] = useState(false)
    const onHandleLogin = async () => {
        try {
            console.log(email,password,'email & password dans bloc TRY/CATCH avant AUTH');
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    if(userCredential){
 // Signed in 
 const user = userCredential.user;
 console.log("LOGINSCREEN user",user);
 navigation.navigate('TestScreen')
 setIsUserLoggedIn(true)
                    }else{
                        console.log("PAS DE CONNEXION");
                    }
                   

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } catch (err) {
            console.log("ERREUR TRY CATCH LOGINSCREEN", err);
        }
    }
    useEffect(() => {
if(isUserLoggedin){
console.log('YOUPIPIPIPIPI');
}
        
    }, []) */
    return (<View>
        {/* <Formik
            initialValues={{

                email: '',
                password: '',
            }}
            validateOnMount={true}
            onSubmit={(data) => {
                setEmail(data.email)
                setPassword(data.password)
                console.log("data.email & data.password après submit",data.email,data.password,"email & password après submit",email, password);
                
                onHandleLogin()

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
        </Formik> */}
        <Text>SUPER LOGIN</Text>
    </View>)
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