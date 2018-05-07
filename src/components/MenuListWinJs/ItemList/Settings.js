import React, { PureComponent } from 'react'

export default class SettingsItemList extends PureComponent {
    render() {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {this.props.data.title}
            </div>
        )
    }
}
