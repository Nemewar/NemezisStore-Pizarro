
import { AiOutlineMenu } from "react-icons/ai"
import { AiOutlineSearch } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";


import { UserWidget } from "./UserWidget";
import { CartWidget } from "./CartWidget";

import "./navBar.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const NavBar = () => {



  const [form, setForm] = useState({
    searchText: ""
  })

  const navigate = useNavigate();
  const { user: usuario } = useContext(UserContext);

  const onchangeInput = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    })
  }

  const onReset = () => {
    setForm({
      ...form,
      searchText: ""
    })
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (form.searchText.length !== 0) {
      navigate({
        pathname: "/search",
        search: `?q=${form.searchText}`
      })
      onReset()
    }
  }





  //realizar esto porque al hacer click en el menu
  //para desaparecer el navbar top, al ampliar la imagen
  //el navbar top sigue oculto y no se puede aggrandar
  const [click, setClick] = useState(false);

  const botRef = useRef();
  const contRef = useRef();

  const mostrarBot = () => {
    const bot = botRef.current;
    if (bot.style.display === "flex") {
      contRef.current.style.display = "block"
      bot.style.display = "none"
      setClick(false);
    } else {
      contRef.current.style.display = "block"
      bot.style.display = "flex"
      setClick(true);
    }
  }

  window.addEventListener("resize", () => {
    //let ancho = document.documentElement.clientWidth;
    let anchoWindow = window.innerWidth;
    if (anchoWindow > 768) {
      setClick(false)
      contRef.current.style.display = "block"
      botRef.current.style.display = "flex"
    }
    else {
      if (click) {
        contRef.current.style.display = "block"
        botRef.current.style.display = "flex"
      } else {
        contRef.current.style.display = "none"
        botRef.current.style.display = "none"
      }
    }
  })


  return (
    <>
      <div className="contenedor-all">
        <div className="header">
          Mejores juegos, al mejor precio
        </div>
        <nav className="contenedor-nav-top">

          <ul className="top">

            <li className="menu">
              <button onClick={mostrarBot}>
                <AiOutlineMenu size={35} />
              </button>
            </li>

            <li onClick={onReset}>
              <Link to="/"><img src="/assets/img/logos/nemeLogo.JPG" /></Link>
            </li>

            <form
              onSubmit={onSubmit}
              className="top-search"
            >
              <input
                name="searchText"
                type="text"
                placeholder="Buscar Productos"
                autoComplete="off"
                value={form.searchText}
                onChange={onchangeInput}
              />
              <AiOutlineSearch size={30} />
            </form>

            <div className="li-right-top">
              <li
                className="cart"
                onClick={onReset}
              >
                <Link to="/cart">
                  <CartWidget />
                </Link>
              </li>

              <li
                className="user"
                onClick={onReset}
              >
                {(usuario.logged === false)
                  ? <Link to="/login"><UserWidget /></Link>
                  : <UserWidget/>
                }
              </li>
            </div>



          </ul>
        </nav>

        <nav
          ref={contRef}
          className="contenedor-nav-bot">

          <div
            ref={botRef}
            className="bot"
          >
            <Link
              to="/categoria/ps4"
              onClick={onReset}
            >
              PS4</Link>

            <Link
              to="/categoria/nintendoswitch"
              onClick={onReset}
            >
              NINTENDO SWITCH
            </Link>

            <Link
              to="/categoria/xboxone"
              onClick={onReset}
            >
              XBOX ONE
            </Link>

            <Link
              to="/nosotros"
              onClick={onReset}
            >
              NOSOTROS
            </Link>

            <Link
              to="/contacto"
              onClick={onReset}
            >
              CONTACTO
            </Link>
          </div>

        </nav>
      </div>


    </>
  )
}
