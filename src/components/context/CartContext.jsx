
import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [dataProducts, setDataProducts] = useState([]);

    const clear = () => {
        setDataProducts([]);
    }

    const isInCart = (item = {}) => {
        return dataProducts.some(it => it.id === item.id);
    }

    //no acepta duplicados, si es que hay un item con el mismo id
    //no agrega otro con el mismo id, si no que a ese item le aumenta la cantidad
    //segun el item que se recibe desde el ItemDetail.jsx
    const addItem = (item = {}) => {

        if (dataProducts.length !== 0) {
            //comprobamos para evitar duplicados
            if (isInCart(item)) {
                //aumentamos la cantidad en vez de agregar otro item
                const nItems = dataProducts.map(i => {
                    if (i.id === item.id) {
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
        if (isInCart(item)) {
            setDataProducts(dataProducts.filter(it => {
                if (it.id !== item.id) {
                    return it;
                }
            }))
        }
    }

    const cantidadProductos = () => {
        return dataProducts.reduce((total, i) => total = total + i.cantidad, 0);
    }

    const isEmpty = () => {
        return dataProducts.length === 0
    }

    const precioTotal = () => {
        let sum = 0;
        for (let i = 0; i <= dataProducts.length - 1; i++) {
            sum = sum + dataProducts[i].precio.split("$")[1] * dataProducts[i].cantidad;
        }
        return sum;
    }


    return (
        <CartContext.Provider value={{
            addItem,
            cantidadProductos,
            dataProducts,
            isEmpty,
            precioTotal,
            clear,
            removeItem
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;

