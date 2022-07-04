import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, FlatList, Button, Image, TouchableOpacity } from 'react-native';
import Data from '../../file.json'


const Account = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Data}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) =>
                    <View>
                        <View style={styles.alignRow}>
                            <Text style={styles.name}>{item.user}</Text>
                            <Text>ID : {item._id}</Text>
                        </View>

                        <View style={styles.marginAndCenter}>
                            <Text>Liste des opérations :</Text>

                        </View>
                        <View style={styles.marginAndCenter}>
                            <Text>REVENUS :</Text>
                        </View>

                        <FlatList
                            data={item.incomes}

                            renderItem={({ item: item2 }) =>
                                <View>
                                    <View>
                                        <Text>______________________</Text>

                                        <Text>______________________</Text>
                                    </View>
                                    <View style={styles.alignRow}>
                                        <Text>Date : {item2.date}</Text>
                                        <Text>Montant : {item2.amount}</Text>
                                        <Text>Cat : {item2.category}</Text>
                                    </View>
                                    <View style={styles.alignColumn}>
                                        <Text>Commentaire : {item2.comments}</Text>
                                        <Text>Opération N° : {item2._id_income}</Text>
                                    </View>
                                </View>
                            }
                        />
                        <View style={styles.marginAndCenter}>
                            <Text>DEPENSES :</Text>
                        </View>
                        <FlatList
                            data={item.expenses}

                            renderItem={({ item: item3 }) =>
                                <View>
                                    <View style={styles.alignRow}>
                                        <Text>Date : {item3.date}</Text>
                                        <Text>Montant : {item3.amount}</Text>
                                        <Text>Cat : {item3.category}</Text>
                                    </View>
                                    <View style={styles.alignColumn}>
                                        <Text>Commentaire : {item3.comments}</Text>
                                        <Text>Opération N° : {item3._id_expense}</Text>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: '#FAF0D7',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    alignRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alignColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    marginAndCenter: {
        margin: 20,
        alignItems: 'center'
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold'
    }

});

export default Account;
