import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";



import { getData, getItemsByCategory } from "../../services/firestore";
import { Spinner } from "../Spinner/Spinner";
import { ItemList } from "./ItemList"


export const ItemListContainer = () => {

    const [data, setData] = useState({
        isLoading: true,
        data: []
    });
    const { cat } = useParams();


    useEffect(() => {

        if (!cat) {
            getData().then(respuestaData => {
                setData({
                    isLoading:false,
                    data: respuestaData
                });
            })
                .catch(err => console.log(err))
        }
        else {
            getItemsByCategory(cat)
                .then(items => {
                    setData({
                        isLoading:false,
                        data: items
                    })
                })
                .catch(err => console.log(err))
        }

    }, [cat])



    return (
        <>
            {
                (data.isLoading===false)
                ? <ItemList data={data.data}/>
                : <Spinner/>
            }

        </>
    )


}
