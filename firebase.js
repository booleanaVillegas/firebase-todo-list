// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc   } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1kOwhT6xbLlABx_oK5DDuYiyhefnxINs",
  authDomain: "todo-list-juliana.firebaseapp.com",
  projectId: "todo-list-juliana",
  storageBucket: "todo-list-juliana.appspot.com",
  messagingSenderId: "413400694669",
  appId: "1:413400694669:web:a3a3f842e45834fec247c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export async function getTasks() {

    const allTasks = []

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push(doc.data())
    });

    return allTasks
}

export async function addTask(taskTitle){

    try {
        const docRef = await addDoc(collection(db, "tasks"), {
          title: taskTitle,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
