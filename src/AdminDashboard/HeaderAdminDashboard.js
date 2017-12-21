import * as React from 'react'
import ReactWinJS from 'react-winjs'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleTogglePane, changeMode, changeLocation, handleBack, changeActionList } from './DuckController'
import IconItemList from './IconItemList'
import GetMode from '../Utils/GetMode'
import currentUser from './data/currentUser.json'

function mapStateToProps(state, props) {
  return {
    splitViewId: state.AdminDashboard.splitViewId,
    paneOpened: state.AdminDashboard.paneOpened,
    mode: state.AdminDashboard.mode,
    location: state.AdminDashboard.location,
    actionList: state.AdminDashboard.actionList,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    handleTogglePane: bindActionCreators(handleTogglePane, dispatch),
    changeMode: bindActionCreators(changeMode, dispatch),
    changeLocation: bindActionCreators(changeLocation, dispatch),
    handleBack: bindActionCreators(handleBack, dispatch),
    changeActionList: bindActionCreators(changeActionList, dispatch)
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
        var canGoBack = this.props.location.length > 1 || this.props.actionList !== null
        var shouldShowBackButton = canGoBack && this.props.mode === 'small'
        return shouldShowBackButton ?
            <button style={{display: 'inline-block'}} className="win-backbutton" onClick={this.handleBack} /> :
            null
    }

    handleBack = (eventObject) => {
        this.props.actions.changeActionList(null)
        this.props.actions.handleBack()
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

                <h3 className="win-h3" style={{display: 'inline-block', marginLeft: 5}}>Flyve MDM</h3>

                <div className="clickable" style={{float: 'right', marginRight: 20}}>
                    <img alt="" src="images/logout.png" style={{width: 25, marginTop: 11}} />
                </div>

                {
                    (GetMode() === 'small') ? '' : (
                        <div style={{display: 'inline-block', float: 'right'}}>
                            <div style={{display: 'inline-block', marginRight: 5, marginTop: 7}}>
                                <IconItemList backgroundColor="#158784" size={35} image={currentUser['User.picture']} />
                            </div>
                            <div style={{display: 'inline-block', marginRight: 20, lineHeight: '13px', verticalAlign: 'super'}}>
                                { currentUser['User.name'] }<br/>
                                <span className="detail">
                                    { currentUser['User.UserEmail.email'][0] }
                                </span>
                            </div>
                        </div>
                    ) 
                }

            </div>
        )
    }
}
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HeaderAdminDashboard)
