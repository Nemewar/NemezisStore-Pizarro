
import { useContext } from "react"
import { resolverOrden } from "../../services/firestoreOrdenes";
import CartContext from "../context/CartContext";
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";


export const Checkout = () => {

    const { user } = useContext(UserContext);
    const { dataProducts, clear, precioTotal } = useContext(CartContext);
    const { user: usuario } = user;
    const navigate = useNavigate();

    const crearOrden = () => {
        const order = {
            date: new Date(),
            dataProducts: dataProducts,
            precioTotal: precioTotal()
        }
        resolverOrden(order, usuario)
            .then(ordenId => {
                clear();
                navigate(`/account/orders/${ordenId}`)
            })
            .catch(err => console.log(err))
    
    }



    return (
        <>
            {
                (user.logged) &&
                <>
                    <div>
                        <h2>Resumen del pedido</h2>
                        <p>Nombres: {usuario.nombres}</p>
                        <p>Apellidos: {usuario.apellidos}</p>
                        <p>Correo: {usuario.correo}</p>
                        <p>Numero: {usuario.numero}</p>
                        <p>Productos: </p>
                        <p>{JSON.stringify(dataProducts)}</p>
                        <button onClick={crearOrden}>Confirmar Compra</button>
                    </div>

                </>
            }

        </>
    )
}
