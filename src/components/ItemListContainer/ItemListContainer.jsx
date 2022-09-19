import { useEffect } from "react";
import { useState } from "react"



import { getData } from "../../services/mockApi";
import { ItemList } from "../ItemList/ItemList";


export const ItemListContainer = ({ greetings }) => {

    const [data, setData] = useState([]);


    useEffect(() => {
        getData().then( respuestaData => {
            setData(respuestaData);
        })
    
    }, [])
    
    

    return (
        <>
            <h1></h1>
            <ItemList data={data}/>
        </>
    )


}
