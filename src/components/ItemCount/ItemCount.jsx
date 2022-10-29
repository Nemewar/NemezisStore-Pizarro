import { useState } from "react"

import "./itemCount.css"


export const ItemCount = ({ inicial, stock, onAdd }) => {

    const [count, setCount] = useState(inicial)

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

    return (
        <>
            <p className="itemdetail__cantidad">Cantidad:</p>
            <div className="itemdetail__count">
                <button onClick={onIncrease}>+</button>
                <p>{count}</p>
                <button onClick={onSubstract}>-</button>
            </div>
            <button
                className="goToCart"
                onClick= { () => onAdd(count)}
            >Agregar Al carrito</button>
        </>
    )
}
