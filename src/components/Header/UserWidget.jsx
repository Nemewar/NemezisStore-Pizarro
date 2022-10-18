import { useContext, useRef } from "react"
import { HiUser } from "react-icons/hi"
import { AiOutlineArrowDown } from "react-icons/ai"
import {AiFillHome} from "react-icons/ai"
import {GrLogout} from "react-icons/gr"

import { UserContext } from "../context/UserContext"


import "./userWidget.css"
import { useNavigate } from "react-router-dom"
import { resolverCerrarSesion } from "../../services/firestoreUsuarios"
import CartContext from "../context/CartContext"

export const UserWidget = () => {

    const submenuRef = useRef();
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const { clear, dataProducts } = useContext(CartContext);
    let a = "holah";
    console.log(a.replaceAll("h","f"));

    const mostrarSubmenu = () => {
        if (user.logged === true) {
            if (submenuRef.current.style.display === "flex") {
                submenuRef.current.style.display = "none"
            } else {
                submenuRef.current.style.display = "flex"
            }
        }
    }

    //no modifica la cadena original
    //replace -> solo remplaza la primera ocurrencia
    //replaceAll -> modifica todas las ocurrencias
    const unNombre = (nombres) => {
        if(nombres.includes(" ")){
            let nombre = nombres.split(" ")[0];
            nombre = nombre.replace(nombre[0],nombre[0].toUpperCase());
            return nombre
        }else{
            return nombres;
        }
    }

    const onLogout = () => {
        resolverCerrarSesion(user.user, dataProducts)
            .then(message => console.log(message))

        logout();
        clear();

        navigate("/")
    }

    const goToOrders = () => {
        navigate("/account/orders")
    }

    return (
        <>
            <div
                onClick={mostrarSubmenu}
                className="content-uw">
                <HiUser size={35} />
                {
                    (user.logged === true)
                        ?
                        <>
                            <div className="content-name">
                                <span>
                                    {unNombre(user.user.nombres)}
                                </span>
                            </div>
                            <div className="content-ai">
                                <AiOutlineArrowDown className="arrowIcon" />
                            </div>
                            <ul
                                ref={submenuRef}
                                className="submenu"
                                style={{
                                    display: "none"
                                }}>
                                <li onClick={goToOrders}>
                                    <p className="text">Mis ordenes</p>
                                    <p className="icon"><AiFillHome/></p>
                                </li>
                                <li onClick={onLogout}>
                                    <p className="text">Cerrar sesión</p>
                                    <p className="icon"><GrLogout/></p>
                                </li>
                            </ul>
                        </>
                        : <span>Ingresar</span>
                }
            </div>
        </>
    )
}
