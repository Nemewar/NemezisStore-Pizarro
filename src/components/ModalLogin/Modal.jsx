import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import GoogleButton from 'react-google-button'
import { useState } from "react"
import { iniciarSesionConCorreoYContraseña, iniciarSesionConGoogle } from "../../services/firestoreIniciarSesion"
import { UserContext } from "../context/UserContext"
import CartContext from "../context/CartContext"
import Swal from 'sweetalert2'

import "./modal.css"
import { useNavigate } from "react-router-dom"

export const Modal = () => {

    
    const { modalVisible, setModalVisible } = useContext(ModalContext);
    const { login } = useContext(UserContext);
    const { addItemsOfUserLogged,dataProducts } = useContext(CartContext);
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        correo: "",
        contraseña: ""
    })

    const goToRegister = () => {
        navigate("/register")
        setModalVisible(false)
    }

    const onHandleChange = (ev) => {
        setDatos({
            ...datos,
            [ev.target.name]: ev.target.value
        })
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault();
        iniciarSesionConCorreoYContraseña(datos)
            .then(user => {
                if (user) {
                    login(user)
                    addItemsOfUserLogged(user.cart)
                    setModalVisible(false)
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.code}`,
                })
            })

    }

    const authGoogle = () => {
        iniciarSesionConGoogle(dataProducts)
        .then(user => {
            if (user) {
                login(user)
                addItemsOfUserLogged(user.cart)
                setModalVisible(false)
            }
        })
        .catch(err => console.log(err))
    }


    return (
        <>
            {(modalVisible) &&
                <div className="overlay">

                    <div className="contenedor-modal">

                        <div className="encabezado-modal">
                            <h3>Iniciar Sesión</h3>
                        </div>

                        <button
                            className="boton-cerrar"
                            onClick={() => setModalVisible(false)}
                        >
                            X
                        </button>

                        <form
                            onSubmit={onHandleSubmit}
                            className="formulario-login"
                        >
                            <fieldset>
                                <div>
                                    <input
                                        required
                                        onChange={onHandleChange}
                                        name="correo"
                                        className="input"
                                        type="text"
                                        placeholder="Correo"
                                        autoComplete="off" />
                                </div>
                                <div>
                                    <input
                                        required
                                        onChange={onHandleChange}
                                        name="contraseña"
                                        className="input"
                                        type="password"
                                        placeholder="Contraseña"
                                        autoComplete="off" />
                                </div>
                                <div>
                                    <button
                                        className="button"
                                    >INGRESAR</button>
                                </div>
                                <div className="init-google">
                                    <h4>O iniciar sesión con Google</h4>
                                    <GoogleButton
                                        style={{
                                            width: "100%"
                                        }}
                                        onClick={authGoogle}
                                    />
                                </div>
                                <div className="not-account">
                                    <h4>No tienes una cuenta? <span onClick={goToRegister}>Regístrate</span></h4>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            }


        </>
    )
}
