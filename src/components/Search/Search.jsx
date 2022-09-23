import { useLocation } from "react-router-dom"
import { useState } from "react";
import queryString from "query-string"



import { getItemsByInputSearch } from "../../services/mockApi"
import "./search.css"
import { useEffect } from "react";
import { ItemList } from "../Item/ItemList";



export const Search = () => {

    const [data, setData] = useState({
        data: [],
        isLoading: true
    });

    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);

    useEffect(() => {

        getItemsByInputSearch(q)
            .then(respuestaData => {
                setData(data => {
                    return {
                        data: respuestaData,
                        isLoading: false
                    }
                });
            })
            .catch(err => console.log(err))

    }, [q])


    return (
        <>
            <h2 className="msg-search">Resultados de la búsqueda para: {`'${q}'`}</h2>
            <hr />
            {
                // (data.length===0)
                //     ? <div className="msg-error">
                //         <p>No hay resultados para esa búsqueda</p>
                //     </div>
                //     : <ItemList data={data.data} />

                (data.isLoading === false)
                    ? (data.data.length === 0)
                        ? (<div className="msg-error">
                            <p>No hay resultados para esa búsqueda</p>
                        </div>)
                        : <ItemList data={data.data} />
                    : console.log("any")
                    
            }

        </>
    )
}
