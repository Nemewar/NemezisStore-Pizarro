import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

import "./Item.css";

export const Item = ({ nombre, precio, stock, categoria, img, id }) => {


    const [count, setCount] = useState(1)

    const onIncrease = () => {
        if (count >= stock) {
            return
        }
        setCount(count + 1)
    }

    const onSubstract = () => {
        if (count <= 1) {
            return
        }
        setCount(count - 1)
    }

    const onAdd = () => {
        alert("Añadido el item al carrito!")
    }

    return (
        <>
            <div className="contenedor-item">
                <div className="item">
                    <Link to={`/item/${id}`}><img src={img} /></Link>
                    <Link to={`/item/${id}`}><p className='nombre'>{nombre}</p></Link>
                    <p className='precio'>{precio}</p>
                    <div className="contenedor-count">
                        <button onClick={onIncrease}>+</button>
                        <p>{count}</p>
                        <button onClick={onSubstract}>-</button>
                    </div>
                </div>
                <div className="contenedor-addToCart">
                    <button
                        className="addToCart"
                        onClick={onAdd}
                    >Agregar al carrito</button>
                </div>
            </div>
        </>
    )
}
