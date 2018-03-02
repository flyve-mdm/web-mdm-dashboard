import React, { Component } from 'react'

export default class SettingsItemList extends Component {
    render() {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {this.props.data.title}
            </div>
        )
    }
}
