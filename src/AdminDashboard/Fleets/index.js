import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FleetsList from './FleetsList'
import FleetsPage from './FleetsPage'
export default class Fleets extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectionMode: false,
            policiesData: null
        }

        this.fecthPolicies = () => {
            return this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmPolicy', options: { uid_cols: true, forcedisplay: [2]}})
        }
    }

    changeSelectionMode = (selectionMode) => {
        this.setState({
            selectionMode
        })
    }

    render() {

        let selectedItemList = this.props.location.length === 2 ? this.props.location[1] : null
        console.log(this.props.actionList, selectedItemList)
        if (this.props.mode === 'small') {
            if (selectedItemList === null && this.props.actionList === null) {
                return <FleetsList
                    itemListPaneWidth={'100%'}
                    animation={this.props.animation}
                    dataSource={this.props.dataSource}
                    changeDataSource={this.props.changeDataSource}
                    fetchData={this.props.fetchData}
                    isLoading={this.props.isLoading}
                    isError={this.props.isError}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    changeCurrentItem={this.props.changeCurrentItem}
                    actionList={this.props.actionList}
                    changeActionList={this.props.changeActionList} 
                    showNotification={this.props.showNotification} 
                    glpi={this.props.glpi} />
            } else {
                return <FleetsPage
                    itemListPaneWidth={0}
                    animation={this.props.animation}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    selectedItemList={selectedItemList}
                    changeSelectionMode={this.changeSelectionMode}
                    //changeCurrentItem={this.props.changeCurrentItem}
                    actionList={this.props.actionList}
                    changeActionList={this.props.changeActionList} 
                    showNotification={this.props.showNotification} 
                    glpi={this.props.glpi} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <FleetsList
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.props.animation}
                        dataSource={this.props.dataSource}
                        changeDataSource={this.props.changeDataSource}
                        fetchData={this.props.fetchData}
                        isLoading={this.props.isLoading}
                        isError={this.props.isError}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        currentItem={this.props.currentItem}
                        changeCurrentItem={this.props.changeCurrentItem}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} 
                        showNotification={this.props.showNotification} 
                        glpi={this.props.glpi}
                    />
                    <FleetsPage
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.props.animation}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        selectedItemList={selectedItemList}
                        changeSelectionMode={this.changeSelectionMode}
                        currentItem={this.props.currentItem}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} 
                        showNotification={this.props.showNotification} 
                        glpi={this.props.glpi}
                    />
                </div>
            )
        }
    }
}
Fleets.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    animation: PropTypes.bool.isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    currentItem: PropTypes.object,
    changeCurrentItem: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
