import React, { Component } from 'react'

const FleetsItemList = ({itemList, history}) => {
    const id = itemList["PluginFlyvemdmFleet.id"]
    return (
        <div style={{ display: 'inline-block' }} onClick={() => history.push(`${id}`)}>
            <div className="name">{itemList["PluginFlyvemdmFleet.name"]}</div>
        </div>
    )
}

export default FleetsItemList