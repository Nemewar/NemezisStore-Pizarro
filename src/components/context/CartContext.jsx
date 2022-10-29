
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

    const addItem = (item = {}) => {
        if (dataProducts.length !== 0) {
            if (isInCart(item)) {
                const nItems = dataProducts.map(i => {
                    if (i.id === item.id) {
                        i.cantidad = i.cantidad + item.cantidad;
                    }
                    return i;
                })
                setDataProducts([...nItems])
            }
            else {
                setDataProducts([...dataProducts,item])
            }
        }
        else {
            setDataProducts([item])
        }

    }

    const addItemsOfUserLogged = (cart) => {

        if(dataProducts.length===0){
            setDataProducts(cart);
        }else{
            let nProducts = [...dataProducts];
            for(let item of cart){
                if(nProducts.some(  i => i.id===item.id )){
                    nProducts = nProducts.map(i => {
                        if (i.id === item.id) {
                            i.cantidad = i.cantidad + item.cantidad;
                        }
                        return i;
                    })
                }else{
                    nProducts = [...nProducts,item]
                }
            }
            setDataProducts(nProducts)
        }
    }

    const removeItem = (item) => {
        if (isInCart(item)) {
            setDataProducts(dataProducts.filter(it => it.id !== item.id))
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
            removeItem,
            addItemsOfUserLogged
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;

