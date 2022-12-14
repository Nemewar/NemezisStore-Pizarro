
import { useContext } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import CartContext from "../context/CartContext";
import { ItemCount } from "../ItemCount/ItemCount"
import "./ItemDetail.css"


export const ItemDetail = ({ item }) => {

    const [itemAñadido, setItemAñadido] = useState(false);
    const { addItem } = useContext(CartContext);
    const navigate = useNavigate();

    const onAdd = (cantidad) => {
        const nuevoItem = { ...item, cantidad };
        addItem(nuevoItem);
        toast.success('Producto añadido al carrito!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setItemAñadido(true)
    }

    const onGoToCart = () => {
        navigate("/cart")
    }

    const onGoToProductos = () => {
        navigate("/")
    }

    const esNs = (categoria) => {
        if(categoria==="nintendoswitch"){
            let nNombre = categoria.split("o");
            nNombre = nNombre[0] + "o "+ nNombre[1];
            return nNombre;
        }
        return categoria;
    }

    return (
        <>
            <div className="itemdetail">
                <div className="itemdetail__imagen">
                    <img src={item.img} alt="itemImg"/>
                </div>
                <div className="itemdetail__informacion">
                    <p className="itemdetail__categoria">{esNs(item.categoria)}</p>
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
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}
