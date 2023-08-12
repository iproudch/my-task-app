
import {  addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase.config";
import { IInput } from "../AddTask/AddTask";

export enum EFirebaseCollections {
    TASKS = 'tasks',
    USERS = 'users'
}

export async function addDataToCollection(data: IInput) {
    try {
      const collectionRef = collection(db, EFirebaseCollections.TASKS);
       await addDoc(collectionRef, data);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

export async function fetchCollectionData() {
    try {
      const collectionRef = collection(db, EFirebaseCollections.TASKS);
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error fetching collection data:", error);
      return [];
    }
  }

export async function queryCollectionData(column: string, columnValue: string) {
  try {
    const collectionRef = collection(db, EFirebaseCollections.TASKS);

    const q = query(collectionRef, where(column, "==", columnValue));

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error querying collection data:", error);
    return [];
  }
}
