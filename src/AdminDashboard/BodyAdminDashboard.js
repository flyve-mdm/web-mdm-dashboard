import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './DuckController'
import Dashboard from './Home'
import Users from './Users'
import Devices from './Devices'
import Invitations from './Invitations'
import Fleets from './Fleets'
import Files from './Files'
import Applications from './Applications'
import About from './About'
import Settings from './Settings'

const components = { Dashboard, Devices, Invitations, Fleets, Files, Applications, Users, Settings, About }

function mapStateToProps(state, props) {
    return {
        splitViewId: state.AdminDashboard.splitViewId,
        paneOpened: state.AdminDashboard.paneOpened,
        animation: state.AdminDashboard.animation,
        location: state.AdminDashboard.location,
        index: state.AdminDashboard.index,
        router: state.AdminDashboard.router,
        splitViewConfigs: state.AdminDashboard.splitViewConfigs,
        mode: state.AdminDashboard.mode,
        actionList: state.AdminDashboard.actionList,
        currentItem: state.AdminDashboard.currentItem,
        dataSource: state.AdminDashboard.dataSource,
        isLoading: state.AdminDashboard.isLoading,
        isError: state.AdminDashboard.isError
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        closePane: bindActionCreators(Actions.closePane, dispatch),
        handleToggleAnimation: bindActionCreators(Actions.handleToggleAnimation, dispatch),
        changeLocation: bindActionCreators(Actions.changeLocation, dispatch),
        changeIndex: bindActionCreators(Actions.changeIndex, dispatch),
        changeDataSource: bindActionCreators(Actions.changeDataSource, dispatch),
        changeActionList: bindActionCreators(Actions.changeActionList, dispatch),
        changeCurrentItem: bindActionCreators(Actions.changeCurrentItem, dispatch),
        changeEndpoint: bindActionCreators(Actions.changeEndpoint, dispatch),
        fetchDataSuccess: bindActionCreators(Actions.fetchDataSuccess, dispatch),
        fetchDataFailure: bindActionCreators(Actions.fetchDataFailure, dispatch),
        fetchingData: bindActionCreators(Actions.fetchingData, dispatch),
        fetchData: (api) => dispatch(Actions.fetchData(api)),
        sendFeedback: (api) => dispatch(Actions.sendFeedback(api))
    }
    return { actions }
}

class BodyAdminDashboard extends Component {

    handleCommandInvoked(newLocation, newIndex) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.changeIndex(newIndex)
        this.props.actions.changeActionList(null)
        this.props.actions.changeCurrentItem(null)
        this.props.actions.closePane()
    }

    render() {
    
        let propsData = {
            dataSource: this.props.dataSource,
            changeDataSource: this.props.actions.changeDataSource,
            fetchData: this.props.actions.fetchData,
            isLoading: this.props.isLoading,
            isError: this.props.isError,
            mode: this.props.mode,
            animation: this.props.animation,
            handleToggleAnimation: this.props.actions.handleToggleAnimation,
            location: this.props.location,
            onNavigate: this.props.actions.changeLocation,
            changeActionList: this.props.actions.changeActionList,
            actionList: this.props.actionList, 
            currentItem: this.props.currentItem, 
            changeCurrentItem: this.props.actions.changeCurrentItem
        }

        if (this.props.router[this.props.index].label === 'About') {
            
            propsData = {
                ...propsData,
                sendFeedback: this.props.actions.sendFeedback,
                changeLoading: this.props.actions.fetchingData
            }
        }

        const contentComponent = React.createElement("div", { className: this.props.router[this.props.index].label.toLowerCase() },
            React.createElement(components[this.props.router[this.props.index].label], { ...propsData }, null),
            this.props.children
        )

        let pane = (
            <div>
                {this.props.router.map((item, index) =>
                <ReactWinJS.SplitView.Command
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    style={item.style}
                    onInvoked={() => this.handleCommandInvoked([item.label], index)}
                />)}
            </div>
        )

        return (
            <ReactWinJS.SplitView
                id={this.props.splitViewId}
                paneComponent={pane}
                style={{ height: 'calc(100% - 48px)' }}
                contentComponent={contentComponent}
                paneOpened={this.props.paneOpened}
                onAfterClose={this.props.actions.closePane}
                {...this.props.splitViewConfigs[this.props.mode]}
            />
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyAdminDashboard)
