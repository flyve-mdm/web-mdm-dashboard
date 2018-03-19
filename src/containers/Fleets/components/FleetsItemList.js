import React from 'react'

const FleetsItemList = ({itemList, history, clicked}) => {
    return (
        <div style={{ display: 'inline-block' }} onClick={() => clicked(itemList)}>
            <div className="name">{itemList["PluginFlyvemdmFleet.name"]}</div>
        </div>
    )
}

export default FleetsItemList