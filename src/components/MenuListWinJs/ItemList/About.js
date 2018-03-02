import React, { Component } from 'react'

export default class AboutItemList extends Component {
    render() {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {this.props.itemList.title}
            </div>
        )
    }
}
