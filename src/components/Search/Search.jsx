import { useLocation } from "react-router-dom"
import { useState } from "react";
import queryString from "query-string"



import { getItemsByInputSearch } from "../../services/firestore"
import "./search.css"
import { useEffect } from "react";
import { ItemList } from "../Item/ItemList";
import { Spinner } from "../Spinner/Spinner";



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
            <div className="search-container">
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
                        : <Spinner/>
                }
            </div>
        </>
    )
}
