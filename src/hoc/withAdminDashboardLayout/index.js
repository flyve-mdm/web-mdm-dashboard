import React, { PureComponent } from 'react'
import SplitView from "../../components/SplitView"
import HeaderBreadcrumb from '../../components/HeaderBreadcrumb'
import getMode from '../../shared/getMode'
import configureDisplay from '../../shared/configureDisplay'
import setGlpiCookie from '../../shared/setGlpiCookie'
import animations from '../../shared/animations'
import glpi from '../../shared/glpiApi'
import { I18n } from "react-i18nify"
import Confirmation from '../../components/Confirmation'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../../store/authentication/actions'

// TODO: Passing Routes to props for generate NavLink in SplitView component

const TIMEOUT_CONTRACT = 150

function mapDispatchToProps(dispatch) {
    const actions = {
        logout: bindActionCreators(logout, dispatch)
    }
    return { actions }
}

const withAdminDashboardLayout = WrappedComponent => {
    class AdminDashboardLayout extends PureComponent {
        constructor(props) {
            super(props)
            this.state = {
                expanded: false,
                contract: false,
                mode: getMode(),
                iframe: undefined
            }

            window.addEventListener('resize', this.handleResize)
            configureDisplay()
            animations()
        }

        logout = async () => {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {
                this.props.actions.logout(this.props.history)
            }
        }

        handleResize = () => {
            let prevMode = this.state.mode
            let nextMode = getMode()

            if (prevMode !== nextMode) {
                this.setState({ mode: nextMode })
            }
        }

        componentDidMount = async () => {
            const { cfg_glpi } = await glpi.getGlpiConfig()
            localStorage.setItem('baseURL', cfg_glpi.url_base)
            this.setState(
                { iframe: <iframe title="glpi-backend" src={`//${cfg_glpi.url_base.split("//")[1]}`} style={{ height: 0, width: 0, opacity: 0, position: 'absolute' }}></iframe> },
                () => setGlpiCookie(
                    this.setState({
                        iframe: undefined
                    })
                )
            )
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize)
        }

        handleToggleExpand = () => {
            this.state.expanded === false ? this.handleExpand() : this.handleContract()
        }

        handleExpand = () => {
            this.setState({
                expanded: true,
                contract: false
            })
        }

        handleContract = () => {
            this.setState({
                contract: true
            }, () => {
                this.handleSetTimeOut()
            })
        }

        handleSetTimeOut = () => {
            if (this.state.contract) {
                setTimeout(() => {
                    this.setState({
                        expanded: false,
                        contract: false
                    })
                }, TIMEOUT_CONTRACT)
            }
        }

        render() {
            return (
                <main>

                    <HeaderBreadcrumb
                        handleToggleExpand={this.handleToggleExpand}
                        location={this.props.history.location}
                    />

                    {(this.state.iframe || '')}

                    <div className="flex-block">
                        <SplitView
                            expanded={this.state.expanded}
                            contract={this.state.contract}
                            handleExpand={this.handleExpand}
                            handleContract={this.handleContract}
                            handleSetTimeOut={this.handleSetTimeOut}
                            handleToggleExpand={this.handleToggleExpand}
                            mode={this.state.mode}
                            logout={this.logout}
                        />
                        <WrappedComponent {...this.props} mode={this.state.mode} />
                        <Confirmation
                            title={I18n.t('logout.close_session')}
                            message={I18n.t('settings.security.close_session_message')}
                            reference={el => this.contentDialog = el}
                        />
                    </div>

                </main>
            )
        }
    }

    return connect(
        null,
        mapDispatchToProps
    )(AdminDashboardLayout)
}

export default withAdminDashboardLayout