import React from 'react'

import "./register.css"
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../../services/firestoreRegister'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import CartContext from '../context/CartContext'
import GoogleButton from 'react-google-button'
import { iniciarSesionConGoogle } from '../../services/firestoreIniciarSesion'
import Swal from 'sweetalert2'
import { useRef } from 'react'
import { SpinnerButton } from '../Spinner/SpinnerButton'
import { useForm } from '../../hooks/useForm'



export const Register = () => {


    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const { dataProducts, addItemsOfUserLogged } = useContext(CartContext);
    const buttonRegistrarRef = useRef();
    const spinnerRef = useRef();
    const buttonGoogleRef = useRef();
    const spinnerGoogleRef = useRef();

    const { nombres, apellidos, correo, numero, 
        contraseña,formState,onFormState, onReset } = useForm({
        nombres: "",
        apellidos: "",
        correo: "",
        numero: "",
        contraseña: ""
    })


    const onHandleSubmit = (ev) => {
        ev.preventDefault();
        buttonRegistrarRef.current.style.display = "none";
        spinnerRef.current.style.display = "unset"
        registrarUsuario(formState, dataProducts)
            .then(user => {
                if (user) {
                    login(user);
                    navigate("/")
                    Swal.fire(
                        'Registro exitoso!',
                        'Ahora podra terminar sus ordenes de compra',
                        'success'
                    )
                    onReset()
                }
            })
            .catch(err => {
                buttonRegistrarRef.current.style.display = "unset";
                spinnerRef.current.style.display = "none"
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${err.code}`,
                })
                onReset();
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
                    navigate("/")
                }
            })
            .catch(err => console.log(err))
    }




    return (
        <>
            <div className="register">
                <form
                    onSubmit={onHandleSubmit}
                    className="form-register"
                >
                    <h1>Regístrate</h1>
                    <fieldset>
                        <div className='dge'>
                            <label htmlFor='nombres'>Nombres:</label>
                            <input
                                id='nombres'
                                required
                                onChange={onFormState}
                                value={nombres}
                                name='nombres'
                                type="text"
                                placeholder="nombres"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label htmlFor='apellidos'>Apellidos:</label>
                            <input
                                id='apellidos'
                                required
                                onChange={onFormState}
                                value={apellidos}
                                name='apellidos'
                                type="text"
                                placeholder="apellidos"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label htmlFor='numero'>Telefono:(opcional)</label>
                            <input
                                id='numero'
                                min={1}
                                onChange={onFormState}
                                value={numero}
                                name='numero'
                                type="number"
                                placeholder="telefono"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label htmlFor='correo'>Correo:</label>
                            <input
                                id='correo'
                                required
                                onChange={onFormState}
                                value={correo}
                                name='correo'
                                type="email"
                                placeholder="correo"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label htmlFor='contraseña'>Contraseña:</label>
                            <input
                                id='contraseña'
                                required
                                onChange={onFormState}
                                value={contraseña}
                                name='contraseña'
                                type="password"
                                placeholder="contraseña"
                                autoComplete="off"
                            />
                        </div>
                        <div className='button-register'>
                            <button
                                ref={buttonRegistrarRef}
                                type='submit'
                            >
                                Registrarme
                            </button>
                            <div
                                ref={spinnerRef}
                                style={{ display: "none" }}
                            >
                                <SpinnerButton />
                            </div>
                        </div>
                        <div className="google-option">
                            <p>O registrarse mediante Google</p>
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
                    </fieldset>

                </form>

            </div>
        </>
    )
}
