import * as React from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closePane, changeLocation, changeIndex, changeListItem } from './DuckController'
import ListItemPage from './ListItemPage'

function mapStateToProps(state, props) {
    return {
        splitViewId: state.AdminDashboard.splitViewId,
        paneOpened: state.AdminDashboard.paneOpened,
        location: state.AdminDashboard.location,
        index: state.AdminDashboard.index,
        router: state.AdminDashboard.router,
        splitViewConfigs: state.AdminDashboard.splitViewConfigs,
        mode: state.AdminDashboard.mode,
        listItem: state.AdminDashboard.listItem
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        closePane: bindActionCreators(closePane, dispatch),
        changeLocation: bindActionCreators(changeLocation, dispatch),
        changeIndex: bindActionCreators(changeIndex, dispatch),
        changeListItem: bindActionCreators(changeListItem, dispatch)
    }
    return { actions }
}

class BodyAdminDashboard extends React.Component {

    handleCommandInvoked(newLocation, newIndex) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.changeIndex(newIndex)
        this.props.actions.closePane()
    }

    render() {
        let contentComponent
        if (this.props.router[this.props.index].type === 'list') {
            contentComponent = <ListItemPage mode={this.props.mode} location={this.props.location} listItem={this.props.listItem} onNavigate={this.props.actions.changeLocation} changeListItem={this.props.actions.changeListItem} />
        } else {
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