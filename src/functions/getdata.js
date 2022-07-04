
import firebase from '../../database/firebaseDb';

const GetData = async () => {

    try {
        let expensesList = []
        let snpashot = await firebase.firestore().collection('expenses').get()
        snpashot.forEach((e) => {
            expensesList.push(e.data())
        })
       return expensesList
    } catch (err) {
        console.log("Une erreur est survenue dans le composant GETDATA",err);
    }
}

const superData = GetData();
export default superData;
/* import { collection, doc, getDocs, query } from "firebase/firestore"; 
import firebaseApp from "../../database/firebaseDb";
const getData = async () =>{
    const q = query(collection(firebaseApp,"expenses"))
    const querySnapshot = await getDocs(q)
   const data = querySnapshot.docs.map((doc)=>({
        ...doc.data()
    }))
    console.log(data,"data TEST");
}
const superData = getData();
export default superData; */