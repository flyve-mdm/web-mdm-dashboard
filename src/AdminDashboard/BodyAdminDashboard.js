import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closePane, changeLocation, changeIndex, changeItemList } from './DuckController'
import ItemListPage from './ItemListPage'
import Users from './Users'
import Devices from './Devices'
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
        changeItemList: bindActionCreators(changeItemList, dispatch)
    }
    return { actions }
}

class BodyAdminDashboard extends Component {

    handleCommandInvoked(newLocation, newIndex) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.changeIndex(newIndex)
        this.props.actions.closePane()
    }

    render() {

        let contentComponent

        switch (this.props.router[this.props.index].label) {

            case "Devices":
                contentComponent = <Devices mode={this.props.mode} location={this.props.location} sort={this.props.devices.sort} itemList={this.props.devices.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} />
                break
            case "Fleets":
                contentComponent = <ItemListPage mode={this.props.mode} location={this.props.location} sort={this.props.fleets.sort} itemList={this.props.fleets.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} />
                break
            case "Files":
                contentComponent = <Files mode={this.props.mode} location={this.props.location} sort={this.props.files.sort} itemList={this.props.files.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} />
                break
            case "Applications":
                contentComponent = <Applications mode={this.props.mode} location={this.props.location} sort={this.props.applications.sort} itemList={this.props.applications.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} />
                break
            case "Users":
                contentComponent = <Users mode={this.props.mode} location={this.props.location} sort={this.props.users.sort} itemList={this.props.users.itemList} onNavigate={this.props.actions.changeLocation} changeItemList={this.props.actions.changeItemList} />
                break
            case "Settings":
                contentComponent = <Settings mode={this.props.mode} location={this.props.location} onNavigate={this.props.actions.changeLocation} />
                break
            case "About":
                contentComponent = <About mode={this.props.mode} location={this.props.location} onNavigate={this.props.actions.changeLocation} />
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