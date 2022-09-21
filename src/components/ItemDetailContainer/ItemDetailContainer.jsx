import { useEffect, useState } from "react"
import { getSingleItem } from "../../services/mockApi";
import { ItemDetail } from "../ItemDetail/ItemDetail";


export const ItemDetailContainer = () => {

    const [item,setItem] = useState({});

    useEffect(() => {
        getSingleItem(2)
        .then( item => setItem(item))
        .catch( msg => console.log(msg))
    
    }, [])
    

    return (
        <ItemDetail
            item = {item}
        />
    )
}
