import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { getOrdersByUserId } from '../../services/firestoreOrdenes'
import { UserContext } from '../context/UserContext'
import { Spinner } from '../Spinner/Spinner'


export const OrderList = () => {

    const [ordenes, setOrdenes] = useState({
        isLoading: true,
        orders: []
    })

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


    return (
        <>
            {
                (ordenes.isLoading === true)
                    ? <Spinner />
                    : (ordenes.orders.length !== 0)
                        ? ordenes.orders.map((orden, index) => {
                            return (
                                <div>
                                    <h2>Indice: {index}</h2>
                                    <h2 key={orden.id}>{JSON.stringify(orden)}</h2>
                                </div>
                            )
                        })
                        : <div>
                            <p className="msg-p">Su lista de ordenes esta vacia.
                                Para comprar, navegar por las categorías, o busque su productos
                            </p>
                            <button
                                className="goToProducts"
                            >
                                Elegir Productos
                            </button>
                        </div>

            }
        </>
    )
}
