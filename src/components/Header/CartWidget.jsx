import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import CartContext from "../context/CartContext";

export const CartWidget = () => {


  const { cantidadProductos } = useContext(CartContext);


  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap"
      }}>
            <div>
              <AiOutlineShoppingCart size={35} />
              <sub style={{
                fontSize: "1.8rem"
              }}>{cantidadProductos()}</sub>
            </div>

            <span className="cart" style={{
              marginLeft: "1rem",
              fontSize: "1.8rem"
            }}>Mi carro</span>

      </div>
    </>
  )
}
