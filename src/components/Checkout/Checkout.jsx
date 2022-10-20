
import { useContext } from "react"
import { resolverOrden } from "../../services/firestoreOrdenes";
import CartContext from "../context/CartContext";
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";

import "./checkout.css"

export const Checkout = () => {

    const { user } = useContext(UserContext);
    const { dataProducts, clear, precioTotal } = useContext(CartContext);
    const { user: usuario } = user;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    const goToOrder = () => {
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
                    <div className="mgc-2">
                        <div className="contenedor-checkout">
                            <div className="resumen">
                                <h2>Resumen de la orden</h2>
                                <p>PRECIO TOTAL: ${precioTotal()}</p>
                                <p>Solicitante: {usuario.nombres + " " + usuario.apellidos}</p>
                                <p>Correo: {usuario.correo}</p>
                                <p>Numero: {usuario.numero}</p>
                            </div>
                            <h2>Productos: </h2>
                            <table className="table-checkout" border={1}>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataProducts.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="producto">
                                                        <img src={`${item.img}`}></img>
                                                        <p>{item.nombre}</p>
                                                    </td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.precio}</td>
                                                    <td>${item.cantidad * parseInt(item.precio.split("$")[1])}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="checkout-buttons">
                                <button onClick={() => { goToOrder() }}>
                                    Confirmar Compra
                                </button>
                                <button onClick={goBack}>
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>

                </>
            }

        </>
    )
}
