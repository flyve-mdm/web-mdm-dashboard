import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesList from './FilesList'
import FilesPage from './FilesPage'

export default class Files extends Component {

    render() {

        let selectedIndex = this.props.location.index !== null ? this.props.location.index : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <FilesList
                    itemListPaneWidth={'100%'}
                    location={this.props.location}
                    sort={this.props.sort}
                    itemList={this.props.itemList}
                    onNavigate={this.props.onNavigate}
                    changeItemList={this.props.changeItemList} />
            } else {
                return <FilesPage itemListPaneWidth={0}
                    selectedIndex={selectedIndex}
                    location={this.props.location}
                    itemList={this.props.itemList} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <FilesList
                        itemListPaneWidth={itemListPaneWidth}
                        location={this.props.location}
                        sort={this.props.sort}
                        itemList={this.props.itemList}
                        onNavigate={this.props.onNavigate}
                        changeItemList={this.props.changeItemList} />
                    <FilesPage itemListPaneWidth={itemListPaneWidth}
                        selectedIndex={selectedIndex}
                        location={this.props.location}
                        itemList={this.props.itemList} />
                </div>
            )
        }
    }
}
Files.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired
}
