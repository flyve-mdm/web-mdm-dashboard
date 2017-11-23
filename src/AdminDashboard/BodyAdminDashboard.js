import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closePane, changeLocation, changeIndex, changeItemList, changeActionList } from './DuckController'
import Users from './Users'
import Devices from './Devices'
import Fleets from './Fleets'
import Files from './Files'
import Applications from './Applications'
import About from './About'
import Settings from './Settings'

function mapStateToProps(state, props) {
    return {
        splitViewId: state.AdminDashboard.splitViewId,
        paneOpened: state.AdminDashboard.paneOpened,
        location: state.AdminDashboard.location,
        index: state.AdminDashboard.index,
        router: state.AdminDashboard.router,
        splitViewConfigs: state.AdminDashboard.splitViewConfigs,
        mode: state.AdminDashboard.mode,
        actionList: state.AdminDashboard.actionList,
        devices: state.AdminDashboard.devices,
        fleets: state.AdminDashboard.fleets,
        files: state.AdminDashboard.files,
        applications: state.AdminDashboard.applications,
        users: state.AdminDashboard.users
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        closePane: bindActionCreators(closePane, dispatch),
        changeLocation: bindActionCreators(changeLocation, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),
        changeItemList: bindActionCreators(changeItemList, dispatch),
        changeActionList: bindActionCreators(changeActionList, dispatch)
    }
    return { actions }
}

class BodyAdminDashboard extends Component {

    handleCommandInvoked(newLocation, newIndex) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.changeIndex(newIndex)
        this.props.actions.changeActionList(null)
        this.props.actions.closePane()
    }

    render() {

        let contentComponent

        switch (this.props.router[this.props.index].label) {

            case "Devices":
                contentComponent = <div className="devices" ><Devices mode={this.props.mode} location={this.props.location} sort={this.props.devices.sort} itemList={this.props.devices.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} actionList={this.props.actionList} /></div>
                break
            case "Fleets":
                contentComponent = <div className="fleets" ><Fleets mode={this.props.mode} location={this.props.location} actionList={this.props.actionList} sort={this.props.fleets.sort} itemList={this.props.fleets.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} /></div>
                break
            case "Files":
                contentComponent = <div className="files" ><Files mode={this.props.mode} location={this.props.location} actionList={this.props.actionList} sort={this.props.files.sort} itemList={this.props.files.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} /></div>
                break
            case "Applications":
                contentComponent = <div className="applications" ><Applications mode={this.props.mode} location={this.props.location} actionList={this.props.actionList} sort={this.props.applications.sort} itemList={this.props.applications.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} /></div>
                break
            case "Users":
                contentComponent = <div className="users" ><Users mode={this.props.mode} location={this.props.location} sort={this.props.users.sort} itemList={this.props.users.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} changeActionList={this.props.actions.changeActionList} actionList={this.props.actionList} /></div>
                break
            case "Settings":
                contentComponent = <div className="settings" ><Settings mode={this.props.mode} location={this.props.location} onNavigate={this.props.actions.changeLocation} /></div>
                break
            case "About":
                contentComponent = <div className="about" ><About mode={this.props.mode} location={this.props.location} onNavigate={this.props.actions.changeLocation} /></div>
                break
            default: 
                contentComponent = <h2 className="win-h2" style={{ marginLeft: '10px' }}> {this.props.location} </h2>
        }

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