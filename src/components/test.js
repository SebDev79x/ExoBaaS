import { StyleSheet, Text, View } from 'react-native';
import superData from '../functions/getdata'

const ScreenTest = () =>{
    const youpi = async () =>{
        try{
            let result = await superData.then((e)=>e)
            .catch((err)=>err)
         console.log(result,"result");
         setMyExpensesArray(result)
        }catch(err){
        console.log("erreur survenue en important GETDATA");
        }
        
        }
        youpi()
        console.log("youpo",youpi,"onTESTSCREEN");
    return (
        <Text>Ecran de TEST</Text>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ScreenTest;