import { useState } from "react"

import "./itemCount.css"


export const ItemCount = ({ inicial, stock }) => {

    const [count, setCount] = useState(inicial)

    const onAdd = () => {
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


    return (
        <>
            <div className="contenedor-item">
                <div className="item">
                    <p>Nombre Item</p>
                    <div className="contenedor-count">
                        <button onClick={onAdd}>+</button>
                        <p>{count}</p>
                        <button onClick={onSubstract}>-</button>
                    </div>
                </div>
                <div className="contenedor-addToCart">
                    <button className="addToCart">Agregar al carrito</button>
                </div>
            </div>
        </>
    )
}
