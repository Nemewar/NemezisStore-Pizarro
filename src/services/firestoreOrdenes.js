
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "./firestore";
import { getOrders, updateUser } from "./firestoreUsuarios";





export const createBuyOrder = async (order) => {
    //si no existe la coleccion la crea
    const orderColeccion = collection(firestore, "orders");
    //addDoc a diferencia de setDoc crea un id aleatorio
    const newDoc = await addDoc(orderColeccion, order)
    const docSnapshot = await getDoc(newDoc);
    const id = docSnapshot.id;
    return id;
}


export const getOrderById = async (id) => {
    const docRef = doc(firestore, "orders", id);
    const docSnapshot = await getDoc(docRef);
    const docFormateado = { ...docSnapshot.data(), id: docSnapshot.id }
    return docFormateado;
}

export const getOrdersByUserId = async (usuario) => {
    let ordenesID = await getOrders(usuario.id);
    if (ordenesID.length === 0) {
        return []
    } else {
        let ordenesCompletas = [];
        for (let ordenID of ordenesID) {
            ordenesCompletas = [...ordenesCompletas, await getOrderById(ordenID)]
        }
        return ordenesCompletas;
    }
}


//funcion que resuelve la creacion de la orden
//y agrega el id de la orden al usuario
export const resolverOrden = async (order, usuario) => {
    const ordenId = await createBuyOrder(order);
    let ordenesID = await getOrders(usuario.id);
    ordenesID = [...ordenesID, ordenId];
    const cambios = {
        ordenes: ordenesID,
        cart: []
    }
    await updateUser(cambios, usuario.id)

    return ordenId;
}


