
import { getAuth, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { app, firestore } from "./firestore"



export const getUser = async (id) => {
    try {
        const docRef = doc(firestore, "usuarios", id);
        const docSnapshot = await getDoc(docRef);
        const docFormateado = { ...docSnapshot.data(), id: id };
        return docFormateado;
    } catch (err) {
        throw err
    }
}

export const existUser = async (id) => {
    try {
        const docRef = doc(firestore, "usuarios", id);
        const docSnapshot = await getDoc(docRef);
        if(docSnapshot._document){
            return true
        }else{
            return false
        }
    } catch (err) {
        throw err
    }
}



export const createUser = async (user, id) => {
    const usuariosColleccion = collection(firestore, "usuarios")
    await setDoc(doc(usuariosColleccion, id), user)
}

export const updateUser = async (data, id) => {
    const docRef = doc(firestore, "usuarios", id);
    await updateDoc(docRef, data)
    return "Usuario Actualizado"
}

export const getOrders = async (id) => {
    const docRef = doc(firestore, "usuarios", id);
    const docSnapshot = await getDoc(docRef);
    const orders = docSnapshot.data().ordenes;
    return orders;
}

export const resolverCerrarSesion = async (user, dataProducts) => {
    const auth = getAuth(app);
    const message = await updateUser({
        cart: dataProducts
    }, user.id)
    const res = await signOut(auth);
    return "Usuario deslogeado"
}