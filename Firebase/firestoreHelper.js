import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, setDoc, getDoc } from "firebase/firestore";
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

export async function deleteAll(collectionName) {
    try{const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docu) => {
        deleteDoc(doc(database, collectionName, docu.id));
    });
    } catch (err) {
        console.log("Delete all", err);
    }
}


export async function updateWarningStatus(docId, collectionName, warningStatus) {
    try {
      const goalDocRef = doc(database, collectionName, docId);
      await updateDoc(goalDocRef, { warning: warningStatus });
    } catch (err) {
      console.log("Update warning status error", err);
    }
  }

  // updateDB used setDoc to update a document
  export async function updateDB(docId, collectionName, data) {
    try {
        const goalDocRef = doc(database, collectionName, docId);
        await setDoc(goalDocRef, data);
    } catch (err) {
        console.log("Update db error", err);
    }
  }

  export async function getOneDocument(docId, collectionName) {
    try {
        const goalDocRef = doc(database, collectionName, docId);
        const docSnapShot = await getDoc(goalDocRef); 
        if (docSnapShot.exists()) {
            return docSnapShot.data();
        } 
        return null;
    } catch (err) {
        console.log("Get one document error", err);
    }
  }

export async function getAllDocuments(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const data = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docu) => {
            data.push(docu.data());
        });
        }
        return data;
      } catch (err) {
        console.log("Get all documents error", err);
      }


}