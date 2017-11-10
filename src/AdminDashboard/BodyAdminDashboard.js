import * as React from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closePane, changeLocation } from './DuckController'

function mapStateToProps(state, props) {
  return {
    splitViewId: state.AdminDashboard.splitViewId,
    paneOpened: state.AdminDashboard.paneOpened,
    location: state.AdminDashboard.location,
    splitViewConfigs: state.AdminDashboard.splitViewConfigs,
    mode: state.AdminDashboard.mode,
    people: state.AdminDashboard.people
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    closePane: bindActionCreators(closePane, dispatch),
    changeLocation: bindActionCreators(changeLocation, dispatch),
  }
  return { actions }
}

class BodyAdminDashboard extends React.Component {
    
    handleCommandInvoked (newLocation) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.closePane()
    }

    render () {
        let contentComponent= <h2 className="win-h2" style={{marginLeft: '10px'}}> {this.props.location} </h2>

        let pane = (
            <div>
                <ReactWinJS.SplitView.Command
                    label="People"
                    icon="contact"
                    onInvoked={() => this.handleCommandInvoked(['people'])}
                />
                <ReactWinJS.SplitView.Command
                    label="What's New"
                    icon="comment"
                    onInvoked={() => this.handleCommandInvoked(['What\'s New'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Groups"
                    icon="people"
                    onInvoked={() => this.handleCommandInvoked(['Groups'])}
                />

                <ReactWinJS.SplitView.Command
                    label="Settings"
                    icon="settings"
                    style={{position: 'absolute', bottom: 0, width: '100%'}}
                    onInvoked={() => this.handleCommandInvoked(['Settings'])}
                />
            </div>
        )

        return (
            <ReactWinJS.SplitView
                id={this.props.splitViewId}
                paneComponent={pane}
                style={{height: 'calc(100% - 48px)'}}
                contentComponent={contentComponent}
                paneOpened={this.props.paneOpened}
                onAfterClose={this.props.actions.closePane}
                {...this.props.splitViewConfigs[this.props.mode]} 
            />
        )
    }
}
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(BodyAdminDashboard)