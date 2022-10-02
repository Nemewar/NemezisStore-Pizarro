import { useContext } from "react"
import CartContext from "../context/CartContext"


export const Cart = () => {

    const { dataProducts } = useContext(CartContext)

    return (
        <>
            <h1>CART</h1>
            <code>
                {JSON.stringify(dataProducts)}
            </code>
        </>
    )
}
