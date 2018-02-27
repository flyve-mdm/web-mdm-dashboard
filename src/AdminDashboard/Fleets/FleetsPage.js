import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EmptyMessage from '../../Utils/EmptyMessage'
import FleetsNew from './FleetsNew'
import FleetsContent from './FleetsContent'
import PoliciesAdd from './PoliciesAdd'
import FleetsEdit from './FleetsEdit'
import Loading from '../../Utils/Loading'
import ContentPane from '../../Utils/ContentPane'

export default class FleetsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasksData: []
        }
    }

    handleFecthTask = async IdTask => {
        const tasksData = await this.props.fetchTasks(IdTask)
        this.setState({
            tasksData: this.state.tasksData.concat(tasksData)
        })
    }

    componentDidMount = () => {
        this.props.selectedItemList && this.handleFecthTask(
            this.props.selectedItemList[0]['PluginFlyvemdmFleet.id']
        )
    }

    componentWillReceiveProps(nextProps) {
        if (Array.isArray(nextProps.selectedItemList) && 
            nextProps.selectedItemList !== this.props.selectedItemList) {
            this.setState({
                tasksData: []
            }, () => {
                this.handleFecthTask(
                    nextProps.selectedItemList[0]['PluginFlyvemdmFleet.id']
                )
            })
        }
    }

    render() {
        if (this.props.selectedItemList === null || this.props.actionList === 'Edit') {
            switch (this.props.actionList) {

                case "Add":
                    return (
                        <FleetsNew
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            changeActionList={this.props.changeActionList}
                            changeCurrentItem={this.props.changeCurrentItem} 
                            showNotification={this.props.showNotification}
                        />
                    )
                case "Add Tasks":
                    return (
                        <FleetsContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList} 
                            showNotification={this.props.showNotification}
                        />
                    )
                case "Add Policies":
                    return (
                        <PoliciesAdd />
                    )
                case "Edit":
                    return (
                        <FleetsEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList} 
                            showNotification={this.props.showNotification}
                        />
                    )
                default:
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
            }
            
        } else {
            if (this.props.actionList === null) {
                if (this.props.selectedItemList.length > 0) {
                    if (!this.state.tasksData.length) {
                        return ( 
                            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                                <Loading />
                            </ContentPane>

                        )
                    } else {
                        return (
                            <FleetsContent
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            selectedItemList={this.props.selectedItemList}
                            changeActionList={this.props.changeActionList} 
                            showNotification={this.props.showNotification}
                            policiesData={this.props.policiesData}
                            tasksData={this.state.tasksData}
                            />
                        )
                    }
                } else {
                    return (
                        <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                    )
                }
            } else {
                return (
                    <FleetsEdit
                        itemListPaneWidth={this.props.itemListPaneWidth}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.props.changeSelectionMode}
                        changeActionList={this.props.changeActionList}
                        showNotification={this.props.showNotification} 
                    />
                )
            }
        }
    }
}

FleetsPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    selectedItemList: PropTypes.array,
    policiesData: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired
}