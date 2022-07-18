
import { db } from '../../database/config'
import { doc, setDoc, collection, onSnapshot, deleteDoc,updateDoc } from 'firebase/firestore';


// Suppression d'une transaction
const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
}

export default deleteDocument;