import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md"
import Swal from 'sweetalert2'

import "./cart.css"
import "./swal.css"
import CartContext from "../context/CartContext"
import { UserContext } from "../context/UserContext"
import { ModalContext } from "../context/ModalContext"



export const Cart = () => {

    let { dataProducts = [],
        isEmpty,
        precioTotal,
        cantidadProductos,
        clear,
        removeItem } = useContext(CartContext);

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const {setModalVisible} = useContext(ModalContext);

    dataProducts = dataProducts.map((item, indice) => {
        return (
            {
                ...item,
                indice: indice + 1
            }
        )
    })

    const styleTr = (indice) => {

        if (indice % 2 === 0) {
            return {
                backgroundColor: "white"
            }
        }
        else {
            return (
                {
                    backgroundColor: "rgb(107, 214, 250)"
                }
            )

        }
    }


    const goToProducts = () => {
        navigate("/")
    }

    const createOrder = () => {
        if (user.logged) {
            navigate("/checkout")
        }
        else {
            Swal.fire({
                title: 'Debes iniciar sesión para seguir con la compra',
                text: "Iniciar Sesión?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí'
            }).then((result) => {
                if (result.isConfirmed) {
                    setModalVisible(true)
                }
            })
        }

    }


    return (
        <>
            <div className="mg-2">
                <hr />
                <div className="container-cart">
                    <h1>Mi Carrito</h1>
                    {
                        (isEmpty())
                            ?
                            <div>
                                <p className="msg-p">Su carrito está vacío.
                                    Para seguir comprando, navegar por las categorías, o busque su productos
                                </p>
                                <button
                                    className="goToProducts"
                                    onClick={goToProducts}
                                >
                                    Elegir Productos
                                </button>
                            </div>
                            :
                            <div className="info-cart">
                                <table className="table-cart" border={1} >

                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataProducts.map(item => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    style={styleTr(item.indice)}
                                                >
                                                    <td className="producto">
                                                        <Link to={`/item/${item.id}`}>
                                                            <img src={`${item.img}`}></img>
                                                        </Link>
                                                        <p>{item.nombre}</p>
                                                    </td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.precio}</td>
                                                    <td>${item.cantidad * parseInt(item.precio.split("$")[1])}</td>
                                                    <td className="delete">
                                                        <MdDeleteForever
                                                            className="btn-delete"
                                                            onClick={() => {
                                                                removeItem(item)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>

                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                                <div className="container-resumen-cart">
                                    <div className="resumen-cart">
                                        <h2>Resumen compra</h2>
                                        <hr />
                                        <p>Cantidad de productos: {cantidadProductos()}</p>
                                        <p>Precio total: <b className="price">${precioTotal()}</b></p>
                                        <div className="resumen-buttons">
                                            <button
                                                onClick={createOrder}
                                                className="btn-finalizar btn">
                                                Finalizar compra
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={clear}
                                            >
                                                Vaciar Carrito
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={goToProducts}
                                            >
                                                Seguir comprando
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>


        </>
    )
}
