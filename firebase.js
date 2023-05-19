// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Storage
const storage = getStorage(app);

export async function getTasks() {

    const allTasks = []

    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        allTasks.push({ ...doc.data(), id: doc.id })
    });

    return allTasks
}

export async function addTask(taskTitle) {

    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title: taskTitle,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addUserToDb(userInfo, id) {

    try {
        await setDoc(doc(db, "users", id), userInfo);
        console.log("user written with ID: ", id);
    } catch (e) {
        console.error("Error adding user: ", e);
    }
}

export async function editDocument(title, id) {

    // Add a new document in collection "cities"
    await setDoc(doc(db, "tasks", id), {
        title: title,
        completed: true,
    });
}

export async function createUser(userInfo) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        // Subir Imagen
        const url = await uploadFile(user.uid+userInfo.picture.name, userInfo.picture, 'profilePictures')

        // crear usuario en DB

        const dbInfo = {
            url,
            email: userInfo.email,
            birthday: userInfo.birthday,
            username: userInfo.username
        }

        addUserToDb(dbInfo, user.uid)
        
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
    }

}

export async function uploadFile(name, file, folder) {
    
    try {
        const taskImgRef = ref(storage, `${folder}/${name}`);
        await uploadBytes(taskImgRef, file);
        const url = await getDownloadURL(taskImgRef);
        return url;
    } catch (error) {
        console.log("error creando imagen ->", error);
    }
}
