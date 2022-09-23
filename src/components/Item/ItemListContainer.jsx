import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";



import { getData, getItemsByCategory, getItemsByInputSearch } from "../../services/mockApi";
import { ItemList } from "./ItemList"


export const ItemListContainer = () => {

    const [data, setData] = useState([]);
    const { cat } = useParams();


    useEffect(() => {

        if (!cat) {
            getData().then(respuestaData => {
                setData(respuestaData);
            })
                .catch(err => console.log(err))
        }
        else {
            getItemsByCategory(cat)
                .then(items => {
                    setData(items)
                })
                .catch(err => console.log(err))
        }

    }, [cat])



    return (
        <>
            <ItemList data={data} />
        </>
    )


}
