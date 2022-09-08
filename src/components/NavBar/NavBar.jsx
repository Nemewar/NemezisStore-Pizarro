import "./navBar.css";
import logo from "../../assets/logo.png"
import { CartWidget } from "./CartWidget";

export const NavBar = () => {
  return (
    <>
      <div className="contenedor-navbar">
        <ul className="navbar">

          <div className="contenido-navbar">
            <li>
              <a href="#"><img src={logo} /></a>
            </li>
            <li>
              <input
                type="text"
                placeholder="Buscar Productos"
              />
            </li>
          </div>

          <div className="contenido-navbar">
            <li>
              <a href="#">Tienda</a>
            </li>
            <li>
              <a href="#">Nosotros</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </div>

          <div className="contenido-navbar">
            
            <li>
              <a href = "#"><CartWidget/><span>0</span></a>
            </li>

            <li>
              <a href="#">Iniciar Sesión</a>
            </li>
          </div>

        </ul>
      </div>
    </>
  )
}
