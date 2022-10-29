

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    addDoc
} from "firebase/firestore"

import { data } from "./data";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain: process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId: process.env.REACT_APP_FIREBASE_appId
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//para realizar operaciones con la bd
const firestore = getFirestore(app);




const exportDataToFirestore = async () => {
    //si no existe la coleccion la crea
    const miColeccion = collection(firestore, "videojuegos");
    //la data a exportar tiene que ser un objeto
    let nData = data.map(item => {
        const { id, ...itemSinId } = item;
        return itemSinId;
    })

    for (let item of nData) {
        const queryImg = query(miColeccion, where("img", "==", item.img));
        const fItem = await getDocs(queryImg);
        if (fItem.empty) {
            await addDoc(miColeccion, item)
        }
    }
}



export {
    app,
    firestore,
    exportDataToFirestore
}


