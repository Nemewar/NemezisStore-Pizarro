import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSingleItem } from "../../services/firesotreVideojuegos";

import { Spinner } from "../Spinner/Spinner";
import { ItemDetail } from "./ItemDetail";


export const ItemDetailContainer = () => {

    const [item, setItem] = useState({
        isLoading: true,
        item: {}
    });

    const { id } = useParams();

    useEffect(() => {
        getSingleItem(id)
            .then(item => setItem({
                isLoading: false,
                item: item
            }))
            .catch(msg => console.log(msg))
    }, [id])


    return (
        <>
            {
                (item.isLoading===false)
                    ? <ItemDetail
                        item={item.item}
                    />
                    : <Spinner/>
            }

        </>
    )
}
