import { StyleSheet, ActivityIndicator, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import UpdateTransaction from './updateForm'
// Fonction pour supprimer une transaction
const deleteADocument = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
}
// Composant Liste des transactions
const TransactionsList = ({ navigation, route }) => {
    const [dataExist, setDataExist] = useState(false)
    // Mettre ici un log de dataExist
    const updateState = (array) => {
        setDataExist(false)

        if (array.length > 0) {
            console.log("ARRAY VAUT : ", array);
            setDataExist(true)
        }
    }
    // On récupère les data passées via les paramètres de la route
    /*     const dataFromAddExpenses = route.params.data.map((e) => e)
     */    // Map sur tableau d'objets
    /* const allTransactions =  dataFromAddExpenses.data.map((e) => e)*/
    /*     console.log("allTransactions",allTransactions);
        !allTransactions.length ? [setDataExist(false),"FAUX Carpentier!"] : [setDataExist(true),"trou"]
    
        console.log("TEST LENGTH dataExist",dataExist); */
    // Initialisation du state des transactions
    const [transactions, setTransactions] = useState('')
    // Actualisation de la liste des documents après la suppression
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "transactions"), (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            });
            setTransactions(documents);
/*             console.log("querySnapshot.docs", querySnapshot.docs);
 */            updateState(querySnapshot.docs)
        });
        return () => unsub();
    }, [])

    return dataExist == false ? (<View style={styles.noData}><Text>AUCUNE DONNEE DISPONIBLE</Text></View>) :
        (<View>
            <FlatList
                data={transactions}

                renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <View>
                                <Text>Type de transaction : {item.type}</Text>
                                <Text>Cat : {item.category}</Text>
                                <Text>{item.type == "Débit" ? "Débiteur : " : "Créditeur : "}{item.lastname}</Text>
                                <Text>Montant : {item.amount}</Text>
                            </View>
                            <View >
                                <Text style={{ color: 'red' }}>Commentaire : {item.comment}</Text>
                                <Text>Opération N° : {item.id}</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <TouchableOpacity
                                    style={styles.btnUpdate}
                                    onPress={() => {
                                        navigation.navigate('UpdateTransaction', { item })
                                    }} title="Submit">
                                    <Text style={styles.textUpdate}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnDelete}
                                    onPress={() => {
                                        deleteADocument(item.id)
                                        console.log("transactions", transactions);
                                        updateState(transactions)

                                    }} title="Submit">
                                    <Text style={styles.textDelete}>Supprimer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
            />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    noData: {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default TransactionsList;