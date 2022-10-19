import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrdersByUserId } from '../../services/firestoreOrdenes'
import { UserContext } from '../context/UserContext'
import { Spinner } from '../Spinner/Spinner'

import "./orderList.css"


export const OrderList = () => {

    const [ordenes, setOrdenes] = useState({
        isLoading: true,
        orders: []
    })

    const navigate = useNavigate();

    const { user: usuario } = useContext(UserContext);

    useEffect(() => {
        getOrdersByUserId(usuario.user)
            .then(orders => {
                setOrdenes({
                    isLoading: false,
                    orders: orders
                })
            })
            .catch(err => console.log(err))


    }, [])

    const obtenerFecha = (date) => {
        //el date que esta en firebase en un timestamp
        //para convertirlo a date usar el metodo toDate()
        const newDate = date.toDate();
        //const dateString = newDate.toDateString();
        const dia = newDate.getDate();
        const año = newDate.getFullYear();
        const mes = newDate.getMonth();
        const fecha = `${dia}/${mes}/${año}`
        return fecha;
    }

    const goToOrder = (id) => {
        navigate(`/account/orders/${id}`)
    }


    return (
        <>
            <hr />


            {
                (ordenes.isLoading === true)
                    ? <Spinner />
                    : (ordenes.orders.length !== 0)
                        ?
                        <div className='mgo-2'>
                            <div className='container-order'>
                                <h1>Mis ordenes</h1>
                                <table className='table-order' border={1}>
                                    <thead>
                                        <tr>
                                            <th>Código de Orden</th>
                                            <th>Fecha</th>
                                            <th>Solicitada por</th>
                                            <th>Total pedido</th>
                                            <th>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (ordenes.orders.map(orden => {
                                                return (
                                                    <tr key={orden.id}>
                                                        <td>{orden.id}</td>
                                                        <td>{obtenerFecha(orden.date)}</td>
                                                        <td>{usuario.user.nombres}</td>
                                                        <td>{orden.precioTotal}</td>
                                                        <td
                                                            className='goToOrder'
                                                            onClick={() => {goToOrder(orden.id)}}
                                                        >Ver Orden</td>
                                                    </tr>
                                                )
                                            }))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : <div className='container-msgError'>
                            <hr />
                            <div className='mw-130'>
                                <h1>Mis Ordenes</h1>
                                <p className="msg-p">Su lista de ordenes esta vacia.
                                    Para comprar, navegar por las categorías, o busque su productos
                                </p>
                                <button
                                    className="goToProducts"
                                >
                                    Elegir Productos
                                </button>
                            </div>
                        </div>

            }

        </>
    )
}
