
import { useState } from "react"
import "./ItemDetail.css"


export const ItemDetail = ({ item }) => {

    const [count, setCount] = useState(1)

    const onIncrease = () => {
        if (count >= item.stock) {
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
            <div className="itemdetail">
                <div className="itemdetail__imagen">
                    <img src={item.img}></img>
                </div>
                <div className="itemdetail__informacion">
                    <p className="itemdetail__consola">{item.consola}</p>
                    <p className="itemdetail__nombre">{item.nombre}</p>
                    <p className="itemdetail__precio">{item.precio}</p>
                    <p className="itemdetail__stock">Disponible: {item.stock} unidades</p>
                    <p className="itemdetail__cantidad">Cantidad:</p>
                    <div className="itemdetail__count">
                        <button onClick={onIncrease}>+</button>
                        <p>{count}</p>
                        <button onClick={onSubstract}>-</button>
                    </div>
                    <div className="itemdetail__addtocart">
                        <button
                            className="addtocartdetail"
                            onClick={onAdd}
                        >Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </>
    )
}
