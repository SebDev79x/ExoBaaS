import * as React from 'react';
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity,ImageBackground } from 'react-native';
import {
    LineChart
} from 'react-native-chart-kit'
import Data from '../../file.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

// SOMME des dépenses
const totalCountExpenses = (json) => {
    return json.map((e) => e.expenses.map((e) => e.amount)).map((e) => {
        return e.map((e) => +(e.replace(/[€,]/g, '')))
    })
}
const expenses = totalCountExpenses(Data)
// SOMME des revenus
const totalCountIncomes = (json) => {
    return json.map((e) => e.incomes.map((e) => e.amount)).map((e) => {
        return e.map((e) => +(e.replace(/[€,]/g, '')))
    })
}
const incomes = totalCountIncomes(Data)

// Format des Dates YYYY/MM/DD
const datesExpenses = (json) => {
    return json.map((e) => e.expenses.map((e) => e.date)).map((e) => e.map((e) => e.substring(0, 10)))
}

// CONST Dates Dépenses
const realDatesExpenses = datesExpenses(Data)
// Tri des dates , de la + ancienne à la plus récente
const sortedDatesExpenses = realDatesExpenses[0].sort((a, b) => a > b)
// Formatage des dates
const frSortedDatesExpenses = sortedDatesExpenses.map((e) => {
    e = new Date(e)
    return e.toLocaleDateString("fr")
})
// TABLEAU DEPENSES/ EXPENSES
const objectsExp = Data.map((e) => {
    return e.expenses
})
// TABLEAU REVENUS/ INCOMES
const objectsInc = Data.map((e) => {
    return e.incomes
})
/* console.log("obj",objectsExp[0],objectsInc[0]);
 */// DEPENSES => TRI DES OBJETS PAR DATE  
const objAreSortedExp = objectsExp[0].sort((a, b) => a.date > b.date)
// DEPENSES => TABLEAU DES DATES TRIEES & FORMATEES
const datesAreSortedAndFormattedForExpenses = objAreSortedExp.map((e) => {
    return e.date.substring(0, 10)
})
// DEPENSES => TABLEAU DES DATES TRIEES & FORMATEES EN FR
const datesExpAreSortedAndInFrFormat = datesAreSortedAndFormattedForExpenses.map((e) => {
    e = new Date(e)
    return e.toLocaleDateString('fr-FR')
})
/* console.log(datesAreSortedAndFormattedForExpenses,"datesAreSortedAndFormattedForExpenses")
 */// DEPENSES => TABLEAU DES DEPENSES EN FONCTION DES DATES TRIEES
const expensesAreWellSorted = objAreSortedExp.map((e) => {
    return +(e.amount.replace(/[€,]/g, ''))
})


// REVENUS => TRI DES OBJETS PAR DATE
const objAreSortedInc = objectsInc[0].sort((a, b) => a.date > b.date)
// REVENUS => TABLEAU DES DATES TRIEES & FORMATEES
const datesAreSortedAndFormattedForIncomes = objAreSortedInc.map((e) => {
    return e.date.substring(0, 10)
})
// REVENUS => TABLEAU DES DATES TRIEES & FORMATEES EN FR
const datesIncAreSortedAndInFrFormat = datesAreSortedAndFormattedForIncomes.map((e) => {
    e = new Date(e)
    return e.toLocaleDateString('fr-FR')
})
// REVENUS => TABLEAU DES REVENUS EN FONCTION DES DATES TRIEES
const incomesAreWellSorted = objAreSortedInc.map((e) => {
    return +(e.amount.replace(/[€,]/g, ''))
})

// DERNIERES OPERATIONS 1 POUR DEPENSES, 1 POUR REVENUS
const lastExpense = objAreSortedExp[objAreSortedExp.length - 1]
const lastIncome = objAreSortedInc[objAreSortedInc.length - 1]
// Initialize new array
const arrayLastOps = []
// SET Last Ops in new array
const pushLastOpsInArray = (array) => {
    array.push(lastExpense)
    array.push(lastIncome)
    return array
}
// SET Last Ops in arrayLastOps
pushLastOpsInArray(arrayLastOps)

const StoreLastOps = async (array) => {
    try {
        await AsyncStorage.setItem('lastOps', JSON.stringify(array))

    } catch (e) {
        console.log(e);
    }
}
StoreLastOps(arrayLastOps)
// EXECUTION DE LA METHODE

// Nombre d'objets dans mon tableau de dépenses || Output : 5
const countOcc = objectsExp[0].reduce((acc, val) => acc + 1, 0)
// Somme des dépenses
const sumExpenses = objectsExp[0].reduce((acc, exp) => acc + exp.amount, 0)
/// Array of dates (format de base)
const arrayOfDates = objectsExp[0].reduce((acc, exp) => [...acc, exp.date], [])
// Array of dates au format YYYY/MM/DD
const arrayOfMiniDates = objectsExp[0].reduce((acc, exp) => [...acc, exp.date], []).map((e) => e.substring(0, 10))

// FIN

// Méthode Dates Revenus
const datesIncomes = (json) => {
    return json.map((e) => e.incomes.map((e) => e.date)).map((e) => e.map((e) => e.substring(0, 10)))
}

// CONST Dates Revenus
const realDatesIncomes = datesIncomes(Data)
// Mémo : les 2e,3e et4e valeurs dans le graph ne sont pas les bonnes valeurs mais la courbe semble ok elle, écart de 490 entre 1er et 2e, 2e et 3e etc.
//https://github.com/indiespirit/react-native-chart-kit/issues/21 NORMAL A PRIORIS
const Stats = ({ navigation }) => {

    // Voir pour les revenus et correler dates avec dépenses/revenus
    const dataExpenses = {
        labels: datesExpAreSortedAndInFrFormat,
        datasets: [{
            data: expensesAreWellSorted
        }],
    };


    const dataIncomes = {
        labels: datesIncAreSortedAndInFrFormat,
        datasets: [{
            data: incomesAreWellSorted
        }],
    };

    return (
        <ImageBackground
        source={require('../../assets/beach.jpg')}
        style={styles.container}
        blurRadius={40}
  >
        <View >
            <Text>
                Courbe DÉPENSES :
            </Text>
            <LineChart
                data={dataExpenses}
                // from react-native
                width={400}
                height={220}
                xAxisLabel={''}
                yAxisLabel={''}
                chartConfig={{
                    
                    backgroundGradientFrom: 'black',
                    backgroundGradientTo: 'cyan',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <Text>
                Courbe REVENUS :
            </Text>
            <LineChart
                data={dataIncomes}
                // from react-native
                width={400}
                height={220}
                xAxisLabel={''}
                yAxisLabel={''}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
        </ImageBackground>

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
    btns: {
        justifyContent: 'center',
    },
    validate: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },



    btnConnection: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#306ec2',

        /* '#306ec2' */
        backgroundColor: '#FFD9C0',
        padding: 10,
        width: 150,
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10

    },
    btnRegister: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#F4BFBF',
        padding: 10,
        width: 150,
        alignItems: 'center',
        borderRadius: 10
    },
    textConnection: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    textRegister: {
        color: 'grey',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default Stats;
