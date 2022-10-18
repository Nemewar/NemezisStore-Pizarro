import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firestore";
import { getUser } from "./firestoreUsuarios";

export const iniciarSesion = async (datos) => {
    try {
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, datos.correo, datos.contraseña);
        const { localId: id } = userCredential.user.reloadUserInfo;
        const user = await getUser(id);
        return user;

    } catch (err) {
        console.log(err)
    }
}

export const resolverIniciarSesion = async () => {

}