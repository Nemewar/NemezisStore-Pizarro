import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import CartContext from "../context/CartContext"

import { MdDeleteForever } from "react-icons/md"

import "./cart.css"

export const Cart = () => {

    let { dataProducts = [],
        isEmpty,
        precioTotal,
        cantidadProductos,
        clear,
        removeItem } = useContext(CartContext)

    dataProducts = dataProducts.map((item, indice) => {
        return (
            {
                ...item,
                indice: indice + 1
            }
        )
    })
    const navigate = useNavigate();

    const goToProducts = () => {
        navigate("/")
    }

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
                                                    <td>{item.cantidad * parseInt(item.precio.split("$")[1])}</td>
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
                                            <button className="btn-finalizar btn">
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
