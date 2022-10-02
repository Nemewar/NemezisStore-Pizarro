
import { useContext } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import { ItemCount } from "../ItemCount/ItemCount"
import "./ItemDetail.css"


export const ItemDetail = ({ item }) => {

    const [itemAñadido, setItemAñadido] = useState(false);
    const {addItem} = useContext(CartContext);
    const navigate = useNavigate();

    const onAdd = (cantidad) => {
        alert("Item Añadido al carrito")
        setItemAñadido(true)
        const nuevoItem = {...item,cantidad};
        addItem(nuevoItem);
    }

    const onGoToCart = () => {
        navigate("/cart")
    }

    const onGoToProductos = () => {
        navigate("/")
    }

    return (
        <>
            <div className="itemdetail">
                <div className="itemdetail__imagen">
                    <img src={item.img}></img>
                </div>
                <div className="itemdetail__informacion">
                    <p className="itemdetail__categoria">{item.categoria}</p>
                    <p className="itemdetail__nombre">{item.nombre}</p>
                    <p className="itemdetail__precio">{item.precio}</p>
                    <p className="itemdetail__stock">Disponible: {item.stock} unidades</p>

                    {
                        (!itemAñadido) && <ItemCount inicial={1} stock={item.stock} onAdd={onAdd} />
                    }

                    {
                        (itemAñadido) &&
                        <div className="itemdetail__btns">
                            <button
                                className="btn_gotocart"
                                onClick={onGoToCart}
                            >Ir al carrito</button>
                            <button
                                className="btn_gotoproducts"
                                onClick={onGoToProductos}
                            >Seguir comprando</button>
                        </div>
                    }



                </div>
            </div>
        </>
    )
}
