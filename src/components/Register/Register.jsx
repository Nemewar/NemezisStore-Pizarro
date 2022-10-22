import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

import { app } from '../../services/firestore'
import "./register.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrarUsuario } from '../../services/firestoreRegister'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import CartContext from '../context/CartContext'



export const Register = () => {

    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const { dataProducts } = useContext(CartContext);

    const [datos, setDatos] = useState({
        nombres: "",
        apellidos: "",
        correo: "",
        numero: "",
        contraseña: "",
    })

    const onChange = (ev) => {
        setDatos({
            ...datos,
            [ev.target.name]: ev.target.value
        })
    }

    const onHandleSubmit = (ev) => {
        ev.preventDefault();
        registrarUsuario(datos, dataProducts)
            .then(user => {
                login(user);
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })



    }




    return (
        <>
            <div className="register">
                <h1>Registrarse</h1>

                <form
                    onSubmit={onHandleSubmit}
                    className="form-register"
                >
                    <fieldset>
                        <div className='dge'>
                            <label>Nombres:</label>
                            <input
                                required
                                onChange={onChange}
                                name='nombres'
                                type="text"
                                placeholder="nombres"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label>Apellidos:</label>
                            <input
                                required
                                onChange={onChange}
                                name='apellidos'
                                type="text"
                                placeholder="apellidos"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label>Correo:</label>
                            <input
                                required
                                onChange={onChange}
                                name='correo'
                                type="email"
                                placeholder="correo"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label>Telefono:</label>
                            <input
                                required
                                onChange={onChange}
                                name='numero'
                                type="number"
                                placeholder="telefono"
                                autoComplete="off"
                            />
                        </div>
                        <div className='dge'>
                            <label>Contraseña:</label>
                            <input
                                required
                                onChange={onChange}
                                name='contraseña'
                                type="password"
                                placeholder="contraseña"
                                autoComplete="off"
                            />
                        </div>
                        <div className='button'>
                            <button
                                type='submit'
                            >
                                Registrarme
                            </button>
                        </div>
                    </fieldset>

                </form>

            </div>
        </>
    )
}
