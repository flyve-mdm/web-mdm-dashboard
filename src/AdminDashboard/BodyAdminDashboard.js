import * as React from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closePane, changeLocation, changeListItem } from './DuckController'
import ListItemPage from './ListItemPage'

function mapStateToProps(state, props) {
    return {
        splitViewId: state.AdminDashboard.splitViewId,
        paneOpened: state.AdminDashboard.paneOpened,
        location: state.AdminDashboard.location,
        splitViewConfigs: state.AdminDashboard.splitViewConfigs,
        mode: state.AdminDashboard.mode,
        listItem: state.AdminDashboard.listItem
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        closePane: bindActionCreators(closePane, dispatch),
        changeLocation: bindActionCreators(changeLocation, dispatch),
        changeListItem: bindActionCreators(changeListItem, dispatch)
    }
    return { actions }
}

class BodyAdminDashboard extends React.Component {

    handleCommandInvoked(newLocation) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.closePane()
    }

    render() {
        let contentComponent
        if (this.props.location[0] === 'Devices' || this.props.location[0] === 'Fleets' || this.props.location[0] === 'Files' || this.props.location[0] === 'Applications' || this.props.location[0] === 'Users') {
            contentComponent = <ListItemPage mode={this.props.mode} location={this.props.location} listItem={this.props.listItem} onNavigate={this.props.actions.changeLocation} changeListItem={this.props.actions.changeListItem} />
        } else {
            contentComponent = <h2 className="win-h2" style={{ marginLeft: '10px' }}> {this.props.location} </h2>
        }

        let pane = (
            <div>
                <ReactWinJS.SplitView.Command
                    label="Dashboard"
                    icon="home"
                    onInvoked={() => this.handleCommandInvoked(['Dashboard'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Devices"
                    icon="cellphone"
                    onInvoked={() => this.handleCommandInvoked(['Devices'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Fleets"
                    icon="gotostart"
                    onInvoked={() => this.handleCommandInvoked(['Fleets'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Files"
                    icon="copy"
                    onInvoked={() => this.handleCommandInvoked(['Files'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Applications"
                    icon="switchapps"
                    onInvoked={() => this.handleCommandInvoked(['Applications'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Users"
                    icon="people"
                    onInvoked={() => this.handleCommandInvoked(['Users'])}
                />

                <ReactWinJS.SplitView.Command
                    label="Settings"
                    icon="settings"
                    style={{ position: 'absolute', bottom: 48, width: '100%' }}
                    onInvoked={() => this.handleCommandInvoked(['Settings'])}
                />
                <ReactWinJS.SplitView.Command
                    label="About"
                    icon="contactinfo"
                    style={{ position: 'absolute', bottom: 0, width: '100%' }}
                    onInvoked={() => this.handleCommandInvoked(['About'])}
                />
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