import { async } from "@firebase/util";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { app } from "./firestore";
import { registrarUsuarioConGoogle } from "./firestoreRegister";
import { existUser, getUser } from "./firestoreUsuarios";

const obtenerNombresYApellidos = (nombres = "") => {
    return new Promise((resolve, reject) => {
        let count = 0;
        for (let i = 0; i <= nombres.length - 1; i++) {
            if (nombres.charAt(i) === " ") {
                count++;
            }
        }
        if (count === 1) {
            resolve({
                nombres: nombres.split(" ")[0],
                apellidos: nombres.split(" ")[1]
            })
        }
        if (count === 3) {
            resolve({
                nombres: nombres.split(" ")[0] + nombres.split(" ")[1],
                apellidos: nombres.split(" ")[2] + nombres.split(" ")[3]
            })
        }
    })
}


export const iniciarSesionConCorreoYContraseña = async (datos) => {
    try {
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, datos.correo, datos.contraseña);
        const { localId: id } = userCredential.user.reloadUserInfo;
        const user = await getUser(id);
        return user;
    } catch (err) {
        throw err
    }
}

export const iniciarSesionConGoogle = async (dataProducts) => {
    try {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken;
        const user = result.user
        const { localId: id, displayName, email: correo } = user.reloadUserInfo;
        const existeUsuario = await existUser(id);
        if (existeUsuario) {
            const nUser = await getUser(id);
            return nUser;
        } else {
            const { nombres, apellidos } = await obtenerNombresYApellidos(displayName);
            const nDatos = { id, nombres, apellidos, correo }
            const nUser = await registrarUsuarioConGoogle(nDatos,dataProducts);
            return nUser;
        }
    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.errorMessage;
        //const email = err.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(err);
    }
}