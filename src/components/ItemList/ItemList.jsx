import React from 'react'
import { Item } from '../Item/Item'

import "./ItemList.css"

export const ItemList = ({ data = [] }) => {

    return (
        <>
            <div className="content-items">
                {data.map(item => {
                    return (
                        <Item
                            key={item.id}
                            {...item}
                        />
                    )
                })}
            </div>
        </>
    )
}
