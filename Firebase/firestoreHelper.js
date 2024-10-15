import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    
    try {
        await addDoc(collection(database, collectionName), data);
        
     }
   catch (err) {
       console.log("Write to db",err);
     }
}

// add a function to delete a document from a collection given its Firestore Doc ID
export async function deleteDocFromDB(docId, collectionName) {
    try { 
        await deleteDoc(doc(database, collectionName, docId));
      }
      catch (err) {
        console.log("Delete from db", err);
      }
}
