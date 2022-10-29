import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getOrderById } from "../../services/firestoreOrdenes";
import { Spinner } from "../Spinner/Spinner";

import "./order.css"

export const Order = () => {

    const [orden, setOrden] = useState({
        isLoading: true,
        orden: {}
    })
    const { id } = useParams();

    useEffect(() => {
        getOrderById(id)
            .then(orden => {
                setOrden({
                    isLoading: false,
                    orden: orden
                })
            })
            .catch(err => console.log(err))
    }, [id])

    const obtenerFecha = (date) => {
        const newDate = date.toDate();
        const dia = newDate.getDate();
        const año = newDate.getFullYear();
        const mes = newDate.getMonth();
        const fecha = `${dia}/${mes}/${año}`
        return fecha;
    }


    return (
        <>
            {
                (orden.isLoading === false)
                    ?
                    <div className="o2">
                        <div className="contenedor-order">
                            <h2>Código de orden: <span>'{id}'</span></h2>
                            <p>Fecha: {obtenerFecha(orden.orden.date)}</p>
                            <p>Precio Total: <b>${orden.orden.precioTotal}</b></p>
                            <table className="table-orden">
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
                                        (orden.orden.dataProducts.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td className="producto">
                                                        <img src={`${item.img}`} alt="imgItem"/>
                                                        <p>{item.nombre}</p>
                                                    </td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.precio}</td>
                                                    <td>${item.cantidad * parseInt(item.precio.split("$")[1])}</td>
                                                </tr>
                                            )
                                        }))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <Spinner />
            }
        </>
    )
}
