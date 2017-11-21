import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesList from './FilesList'
import FilesPage from './FilesPage'

export default class Files extends Component {

    render() {

        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null && this.props.actionList === null) {
                return <FilesList
                    itemListPaneWidth={'100%'}
                    location={this.props.location}
                    sort={this.props.sort}
                    itemList={this.props.itemList}
                    onNavigate={this.props.onNavigate}
                    changeItemList={this.props.changeItemList} 
                    changeActionList={this.props.changeActionList}/>
            } else {
                return <FilesPage itemListPaneWidth={0}
                    selectedIndex={selectedIndex}
                    location={this.props.location}
                    itemList={this.props.itemList}
                    actionList={this.props.actionList}
                    changeItemList={this.props.changeItemList}
                    changeActionList={this.props.changeActionList} />
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
                        changeItemList={this.props.changeItemList} 
                        changeActionList={this.props.changeActionList} />
                    <FilesPage itemListPaneWidth={itemListPaneWidth}
                        selectedIndex={selectedIndex}
                        location={this.props.location}
                        itemList={this.props.itemList}
                        actionList={this.props.actionList} 
                        changeItemList={this.props.changeItemList}
                        changeActionList={this.props.changeActionList}/>
                </div>
            )
        }
    }
}
Files.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string
}
