import * as React from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleTogglePane, changeMode, changeLocation, handleBack } from './DuckController'
import GetMode from '../Utils/GetMode'

function mapStateToProps(state, props) {
  return {
    splitViewId: state.AdminDashboard.splitViewId,
    paneOpened: state.AdminDashboard.paneOpened,
    mode: state.AdminDashboard.mode,
    location: state.AdminDashboard.location
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    handleTogglePane: bindActionCreators(handleTogglePane, dispatch),
    changeMode: bindActionCreators(changeMode, dispatch),
    changeLocation: bindActionCreators(changeLocation, dispatch),
    handleBack: bindActionCreators(handleBack, dispatch)
  }
  return { actions }
}

class HeaderAdminDashboard extends React.Component {

    handleResize = () => {
        let prevMode = this.props.mode
        let nextMode = GetMode()

        if (prevMode !== nextMode) {
            this.props.actions.changeMode(nextMode)
        }
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize)
    }

    renderBackButton () {
        var canGoBack = this.props.location.length > 1
        var shouldShowBackButton = canGoBack && this.props.mode === 'small'
        return shouldShowBackButton ?
            <button style={{display: 'inline-block'}} className="win-backbutton" onClick={this.props.actions.handleBack} /> :
            null
    }

    render () {
        return (
            <div className="header-admin-dashboard win-ui-dark">
                <ReactWinJS.SplitViewPaneToggle
                    aria-controls={this.props.splitViewId}
                    style={{ display: 'inline-block' }}
                    onInvoked={this.props.actions.handleTogglePane}
                    paneOpened={this.props.paneOpened}
                />
                {this.renderBackButton()}
                <h3 className="win-h3" style={{display: 'inline-block', marginLeft: 5}}>Admin Dashboard</h3>
            </div>
        )
    }
}
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HeaderAdminDashboard)
