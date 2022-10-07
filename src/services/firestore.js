// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection, getDocs, doc, getDoc, query, where, setDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGsEqKGyPPeZN-CaEZO_2wjIE3lk5_jeE",
    authDomain: "nemezisstore-e5aae.firebaseapp.com",
    projectId: "nemezisstore-e5aae",
    storageBucket: "nemezisstore-e5aae.appspot.com",
    messagingSenderId: "753699596391",
    appId: "1:753699596391:web:1b94b79e05e14df46bccc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//para realizar operaciones con la bd
const firestore = getFirestore(app);













//agregar documentos a una cierta coleccion a firebase
/*
const miColeccion = collection(firestore,"videojuegos");
await setDoc( doc(miColeccion,"id213") , {
    nombre:"aea",
    apellido: "gaaaa"
})
*/

const getData = async () => {
    const miColeccion = collection(firestore, "videojuegos");
    let misDocsInfo = await getDocs(miColeccion);
    let misDocs = misDocsInfo.docs.map(doc => {
        let miDoc = {
            ...doc.data(),
            id: doc.id
        }
        return miDoc
    })

    return misDocs;
}


const getSingleItem = async (id) => {
    const docRef = doc(firestore, "videojuegos", id);
    const docSnapshot = await getDoc(docRef);

    const docFormateado = { ...docSnapshot.data(), id: docSnapshot.id }
    return docFormateado;
}



const getItemsByCategory = async (category) => {
    const miColeccion = collection(firestore, "videojuegos");
    const queryCategory = query(miColeccion, where("categoria", "==", category));
    const misDocsInfo = await getDocs(queryCategory);
    let misDocs = misDocsInfo.docs.map(coleccion => {
        let docn = { ...coleccion.data(), id: coleccion.id };
        return docn;
    })
    return misDocs;
}

const getItemsByInputSearch = async (q) => {
    const miColeccion = collection(firestore,"videojuegos");
    let misDocsInfo = await getDocs(miColeccion);
    let misDocs = misDocsInfo.docs.map( doc => {
        let miDoc = {
            ...doc.data(),
            id: doc.id
        }
        return miDoc
    })
    let itemsByQ = misDocs.filter( item => item.nombre.toLowerCase().includes(q.toLowerCase()));
    return itemsByQ;
}


export {
    getData,
    getSingleItem,
    getItemsByCategory,
    getItemsByInputSearch
}


