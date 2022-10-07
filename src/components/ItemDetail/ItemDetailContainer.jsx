import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSingleItem } from "../../services/firestore";
import { ItemDetail } from "./ItemDetail";


export const ItemDetailContainer = () => {

    const [item, setItem] = useState({});

    const { id } = useParams();

    useEffect(() => {
        getSingleItem(id)
            .then(item => setItem(item))
            .catch(msg => console.log(msg))
    }, [id])


    return (
        <ItemDetail
            item={item}
        />
    )
}
