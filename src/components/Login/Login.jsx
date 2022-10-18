import { useState } from "react";
import { NavLink, redirect, useLocation, useNavigate, Redirect } from "react-router-dom"
import { iniciarSesion } from "../../services/firestoreIniciarSesion";
import queryString from "query-string"

import "./login.css"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import CartContext from "../context/CartContext";


export const Login = () => {

  const navigate = useNavigate();
  const { login} = useContext(UserContext);
  const { addItemsOfUserLogged} = useContext(CartContext);

  const location = useLocation();
  const { of = "" } = queryString.parse(location.search);

  const [datos, setDatos] = useState({
    correo: "",
    contraseña: ""
  })

  const onHandleChange = (ev) => {
    setDatos({
      ...datos,
      [ev.target.name]: ev.target.value
    })
  }

  const onHandleSubmit = (ev) => {
    ev.preventDefault();
    iniciarSesion(datos)
      .then(user => {
        login(user)
        addItemsOfUserLogged(user.cart)
        if (of === "cart") {
          navigate("/checkout")
        } else {
          navigate("/")
        }
      })
      .catch(err => console.log(err))
  }

  const goToRegister = () => {
    navigate("/register")
  }


  return (
    <>
          <div className="login">
            <h1>Iniciar Sesion</h1>

            <form
              onSubmit={onHandleSubmit}
              className="form-login"
            >
              <fieldset>
                <div className="de">
                  <input
                    required
                    onChange={onHandleChange}
                    name="correo"
                    type="text"
                    placeholder="CORREO"
                    autoComplete="off" />
                </div>
                <div className="de">
                  <input
                    required
                    onChange={onHandleChange}
                    name="contraseña"
                    type="password"
                    placeholder="CONTRASEÑA"
                    autoComplete="off" />
                </div>
                <div className="contenedor-button de">
                  <button>
                    Ingresar
                  </button>
                </div>
                <div className="question-register">
                  <p>¿No tienes una cuenta?
                    <span
                      onClick={goToRegister}
                    >Regístrate</span></p>
                </div>
              </fieldset>
            </form>

          </div>
    </>

  )
}
