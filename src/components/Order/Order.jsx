import { useState } from "react";
import { useEffect } from "react";
import { json, useParams } from "react-router-dom"
import { getOrderById } from "../../services/firestoreOrdenes";


export const Order = () => {

    const [orden, setOrden] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        getOrderById(id)
            .then(orden => {
                setOrden(orden)
            })
            .catch(err=>console.log(err))
    }, [])


    return (
        <>
            {
                (orden) &&
                <div>
                    <h2>{JSON.stringify(orden)}</h2>
                </div>
            }
        </>
    )
}
