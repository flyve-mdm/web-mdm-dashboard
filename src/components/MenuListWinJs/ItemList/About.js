import React, { PureComponent } from 'react'

export default class AboutItemList extends PureComponent {
    render() {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {this.props.itemList.title}
            </div>
        )
    }
}
