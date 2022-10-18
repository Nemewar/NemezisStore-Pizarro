
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app} from "./firestore";
import { createUser } from "./firestoreUsuarios";



export const registrarUsuario = async (datos,dataProducts) => {

    try {
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, datos.correo, datos.contraseña);
        const { localId: id } = userCredential.user.reloadUserInfo;
        let { contraseña, ...user } = datos;
        user = {
            ...user,
            ordenes: [
                
            ],
            cart: dataProducts
        }
        await createUser(user, id);
        user = {...user,id}
        return user;

    } catch (err) {
        console.log(err)
    }
}