import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


import "./Item.css";

export const Item = ({ nombre, precio, stock, categoria, img, id }) => {


    const navigate = useNavigate();


    const onGoToItemDetail = () => {
        navigate(`/item/${id}`)
    }

    return (
        <>
            <div className="contenedor-item">
                <div className="item">
                    <Link to={`/item/${id}`}><img src={img} alt="itemImg"/></Link>
                    <Link to={`/item/${id}`}><p className='nombre'>{nombre}</p></Link>
                    <p className='precio'>{precio}</p>
                </div>
                <div className="contenedor-addToCart">
                    <button
                        className="addToCart"
                        onClick={onGoToItemDetail}
                    >Más detalles...</button>
                </div>
            </div>
        </>
    )
}
