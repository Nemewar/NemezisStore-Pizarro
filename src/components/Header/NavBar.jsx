import "./navBar.css";
import { CartWidget } from "./CartWidget";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai"
import { AiOutlineSearch } from "react-icons/ai"
import { UserWidget } from "./UserWidget";
import { useRef } from "react";

export const NavBar = () => {


  const [form, setForm] = useState({
    searchText: ""
  })

  const navigate = useNavigate();

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

  const mostrarBot = () => {
    const bot = botRef.current;
    if (bot.style.display === "flex") {
      bot.style.display = "none"
      setClick(false);
    } else {
      bot.style.display = "flex"
      setClick(true);
    }
  }

  window.addEventListener("resize", () => {
    let ancho = document.documentElement.clientWidth;
    if (ancho > 768) {
      setClick(false)
      botRef.current.style.display = "flex"
    }
    else {
      if (click) {
        botRef.current.style.display = "flex"
      } else {
        botRef.current.style.display = "none"
      }
    }
  })


  return (
    <>
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
            <Link to="/login"><UserWidget /></Link>
          </li>

        </ul>
      </nav>

      <nav className="contenedor-nav-bot">

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



    </>
  )
}