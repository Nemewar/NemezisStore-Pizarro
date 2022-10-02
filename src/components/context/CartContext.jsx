
import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [dataProducts, setDataProducts] = useState([]);

    const clear = () => {
        setDataProducts([]);
    }

    const isInCart = (item={}) => {
        return dataProducts.some( it => it.id===item.id);
    }

    //no acepta duplicados, si es que hay un item con el mismo id
    //no agrega otro con el mismo id, si no que a ese item le aumenta la cantidad
    //segun el item que se recibe desde el ItemDetail.jsx
    const addItem = (item={}) => {

        if (dataProducts.length!==0) {
            //comprobamos para evitar duplicados
            if (isInCart(item)) {
                //aumentamos la cantidad en vez de agregar otro item
                const nItems = dataProducts.map( i => {
                    if(i.id===item.id){
                        i.cantidad = i.cantidad + item.cantidad;
                    }
                    return i;
                })
                setDataProducts([...nItems])
            }
            else {
                setDataProducts([...dataProducts, item])
            }
        }
        else {
            setDataProducts([...dataProducts, item])
        }

    }

    const removeItem = (item) => {
        if(isInCart(item)){
            setDataProducts( dataProducts.map(it => {
                if(it.id!==item.id){
                    return it;
                }
            }))
        }
    }

    const cantidadProductos = () => {
        return dataProducts.length;
    }
    

    return (
        <CartContext.Provider value = {{
            addItem, cantidadProductos, dataProducts
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;