import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "./firestore";



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
    const miColeccion = collection(firestore, "videojuegos");
    let misDocsInfo = await getDocs(miColeccion);
    let misDocs = misDocsInfo.docs.map(doc => {
        let miDoc = {
            ...doc.data(),
            id: doc.id
        }
        return miDoc
    })
    let itemsByQ = misDocs.filter(item => item.nombre.toLowerCase().includes(q.toLowerCase()));
    return itemsByQ;
}

export {
    getData,
    getSingleItem,
    getItemsByCategory,
    getItemsByInputSearch
}