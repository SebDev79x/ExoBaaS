import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../database/config'
import { useState, useEffect, createContext, useContext } from 'react';
import { doc, setDoc, collection, onSnapshot, deleteDoc,updateDoc  } from 'firebase/firestore';

// Fonction pour supprimer une transaction
const deleteADocument = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
}
// Composant Liste des transactions
const TransactionsList = ({ navigation, route }) => {
    // On récupère les data passées via les paramètres de la route
    const dataFromAddExpenses = route.params
    // Map sur tableau d'objets
    const allTransactions = dataFromAddExpenses.data.map((e) => e)
    // Initialisation du state des transactions
    const [transactions, setTransactions] = useState(allTransactions)
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
        });
        return () => unsub();
    }, [])


    return (
        <View>
            <Text>TEST ECRAN</Text>
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
                                        navigation.navigate('Ajout transaction',{item})
                                    }} title="Submit">
                                    <Text style={styles.textUpdate}>Modifier</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnDelete}
                                    onPress={() => {
                                        console.log("Supprimer la transaction");
                                        deleteADocument(item.id)
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
});

export default TransactionsList;