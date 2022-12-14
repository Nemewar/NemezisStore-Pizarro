import { useContext, useRef } from "react"
import { ModalContext } from "../context/ModalContext"
import GoogleButton from 'react-google-button'
import { iniciarSesionConCorreoYContraseña, iniciarSesionConGoogle } from "../../services/firestoreIniciarSesion"
import { UserContext } from "../context/UserContext"
import CartContext from "../context/CartContext"
import Swal from 'sweetalert2'
import { TiDelete } from "react-icons/ti"
import "./modal.css"
import { useNavigate } from "react-router-dom"
import { SpinnerButton } from "../Spinner/SpinnerButton"
import { useForm } from "../../hooks/useForm"

export const Modal = () => {


    const { modalVisible, setModalVisible } = useContext(ModalContext);
    const { login } = useContext(UserContext);
    const { addItemsOfUserLogged, dataProducts } = useContext(CartContext);
    const navigate = useNavigate();
    const buttonIngresarRef = useRef();
    const buttonGoogleRef = useRef();
    const spinnerRef = useRef();
    const spinnerGoogleRef = useRef();

    const {correo,contraseña,formState,onFormState,onReset} = useForm({
        correo: "",
        contraseña: ""
    })

    const goToRegister = () => {
        navigate("/register")
        setModalVisible(false)
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault();
        buttonIngresarRef.current.style.display = "none";
        spinnerRef.current.style.display = "flex"
        iniciarSesionConCorreoYContraseña(formState)
            .then(user => {
                if (user) {
                    login(user)
                    addItemsOfUserLogged(user.cart)
                    setModalVisible(false)
                }
                onReset()
            })
            .catch(error => {
                buttonIngresarRef.current.style.display = "unset";
                spinnerRef.current.style.display = "none"
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.code}`,
                })
                onReset()
            })

    }

    const authGoogle = () => {
        buttonGoogleRef.current.style.display = "none"
        spinnerGoogleRef.current.style.display = "unset"
        iniciarSesionConGoogle(dataProducts)
            .then(user => {
                if (user) {
                    login(user)
                    addItemsOfUserLogged(user.cart)
                    buttonGoogleRef.current.style.display = "unset"
                    spinnerGoogleRef.current.style.display = "none"
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
                            <TiDelete size={30} />
                        </button>

                        <form
                            onSubmit={onHandleSubmit}
                            className="formulario-login"
                        >
                            <fieldset>
                                <div>
                                    <input
                                        required
                                        onChange={onFormState}
                                        name="correo"
                                        value={correo}
                                        className="input"
                                        type="text"
                                        placeholder="Correo"
                                        autoComplete="off" />
                                </div>
                                <div>
                                    <input
                                        required
                                        onChange={onFormState}
                                        name="contraseña"
                                        value={contraseña}
                                        className="input"
                                        type="password"
                                        placeholder="Contraseña"
                                        autoComplete="off" />
                                </div>
                                <div>
                                    <button
                                        ref={buttonIngresarRef}
                                        className="button"
                                    >INGRESAR</button>
                                    <div
                                        ref={spinnerRef}
                                        style={{ display: "none" }}
                                    >
                                        <SpinnerButton />
                                    </div>
                                </div>
                                <div className="init-google">
                                    <h4>O iniciar sesión con Google</h4>
                                    <div
                                        ref={buttonGoogleRef}
                                        style={{ width: "100%" }}>
                                        <GoogleButton
                                            style={{
                                                width: "100%"
                                            }}
                                            onClick={authGoogle}
                                        />
                                    </div>
                                    <div
                                        ref={spinnerGoogleRef}
                                        style={{ display: "none" }}
                                    >
                                        <SpinnerButton />
                                    </div>
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
