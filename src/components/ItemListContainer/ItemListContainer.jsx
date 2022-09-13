import { ItemCount } from "../ItemCount/ItemCount"


export const ItemListContainer = ({ greetings }) => {



    return (
        <>
            <h1>{greetings}</h1>
            <ItemCount inicial={1} stock={7}/>
        </>
    )
}
