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
import ToastNotifications from '../Utils/ToastNotifications'
import NativeNotification from '../Utils/NativeNotification'
import validateNotifications from '../Utils/validateNotifications'
import GlpiApi from '../Utils/GlpiApi'

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
        isError: state.AdminDashboard.isError,
        passwordConfiguration: state.AdminDashboard.passwordConfiguration
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
        changeLoading: bindActionCreators(Actions.changeLoading, dispatch),
        fetchData: (api) => dispatch(Actions.fetchData(api)),
        sendFeedback: (api) => dispatch(Actions.sendFeedback(api)),
        getPasswordConfiguration: (api) => dispatch(Actions.getPasswordConfiguration(api))
    }
    return { actions }
}

class BodyAdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            heigth: window.innerHeight,
            notifications: () => {},
        }
        this.glpi = GlpiApi
    }

    handleCommandInvoked(newLocation, newIndex) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.changeIndex(newIndex)
        this.props.actions.changeActionList(null)
        this.props.actions.changeCurrentItem(null)
        this.props.actions.closePane()
    }

    handleResize = () => {
        if (this.state.heigth !== window.innerHeight) {
            this.setState({
                heigth: window.innerHeight
            })
        }
    }

    componentWillMount () {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize)
    }

    showNotification = (title, body) => {
        let notifications = validateNotifications()
        if (notifications.show) {
            if (notifications.type === "Toast") {
                if(this.toastNotifications) this.toastNotifications.showNotification(title, body)
            } else {
                NativeNotification(title, body)
            }
        } 
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
            changeCurrentItem: this.props.actions.changeCurrentItem,
            passwordConfiguration: this.props.passwordConfiguration,
            getPasswordConfiguration: this.props.actions.getPasswordConfiguration,
            changeLoading: this.props.actions.changeLoading,
            showNotification: this.showNotification,
            glpi: this.glpi
        }

        if (this.props.router[this.props.index].label === 'Dashboard') {
            propsData = {
                ...propsData,
                changeIndex: this.props.actions.changeIndex,
                routers: this.props.router,
            }
        }

        if (this.props.router[this.props.index].label === 'About') {
            propsData = {
                ...propsData,
                sendFeedback: this.props.actions.sendFeedback
            }
        }

        const contentComponent = React.createElement("div", { className: this.props.router[this.props.index].label.toLowerCase() },
            React.createElement(components[this.props.router[this.props.index].label], { ...propsData }, null),
            this.props.children
        )

        const pane = (
            <div>
                {this.props.router.map((item, index) => {
                    let style = item.style
                    if (this.state.heigth > ((this.props.router.length +  1) * 48)) {
                        if (item.label === 'Settings') {
                            style = {
                                ...item.style,
                                position: 'absolute', 
                                bottom: 48, 
                                width: '100%'
                            }
                        } else if (item.label === 'About') {
                            style = {
                                ...item.style,
                                position: 'absolute',
                                bottom: 0,
                                width: '100%'
                            }
                        }
                    }

                    return (
                        <ReactWinJS.SplitView.Command
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            style={style}
                            onInvoked={() => this.handleCommandInvoked([item.label], index)}
                        />
                    )
                })}
            </div>
        )

        return (
            <div style={{height: '100%'}}>

                <ToastNotifications ref={instance => { this.toastNotifications = instance }}/>

                <ReactWinJS.SplitView
                    id={this.props.splitViewId}
                    paneComponent={pane}
                    style={{ height: 'calc(100% - 48px)' }}
                    contentComponent={contentComponent}
                    paneOpened={this.props.paneOpened}
                    onAfterClose={this.props.actions.closePane}
                    {...this.props.splitViewConfigs[this.props.mode]}
                />

            </div>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyAdminDashboard)
