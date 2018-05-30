import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WinJS from 'winjs'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { uiHideNotification } from '../../store/ui/actions'
import validateNotifications from '../../shared/validateNotifications'
import nativeNotification from '../../shared/nativeNotification'

function mapStateToProps(state, props) {
    return {
        body: state.ui.notification.body,
        title: state.ui.notification.title,
        type: state.ui.notification.type,
        show: state.ui.notification.show
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        uiHideNotification: bindActionCreators(uiHideNotification, dispatch)
    }
    return { actions }
}

const withNotification = WrappedComponent => {
    class ToastNotification extends PureComponent {

        constructor(props) {
            super(props)
            this.state = {
                timer: {},
                show: false,
                title: this.props.title,
                body: this.props.body
            }
        }

        static getDerivedStateFromProps(nextProps, prevState) {
            if (nextProps.title !== prevState.title || nextProps.body !== prevState.body) {
                return {
                    show: true,
                    type: nextProps.type,
                    title: nextProps.title,
                    body: nextProps.body,
                }
            }
            return null
        }

        componentDidUpdate(prevProps, prevState, prevContext) {
            if (prevProps.title !== this.props.title || prevProps.body !== this.props.body) {
                const notification = validateNotifications()
                if ((notification.show || this.state.type === "alert") && this.state.show) {
                    if (notification.type === "Native") {
                        nativeNotification(this.state.title, this.state.body, this.state.icon)
                    }
                    this.setState({
                        timer: setTimeout(() => {
                            this.hideNotification()
                        }, 4000)
                    })
                }

                
            }
        }

        hideNotification = () => {
            WinJS.UI.Animation.exitContent(
                document.getElementsByClassName('toast'), { top: '0px', left: '20px' }
            ).then(() => {
                this.setState({
                    show: false,
                    title: undefined,
                    body: undefined
                }, () => {
                    clearTimeout(this.state.timer)
                    this.props.actions.uiHideNotification()
                })
            })
        }

        render() {
            let toast = null
            const notification = validateNotifications()
            if (this.state.show && notification.type === 'Toast') {
                toast = (
                    <div className={`toast toast--${this.props.type}`}>
                        <span
                            className="cancelIcon"
                            style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }}
                            onClick={() => {
                                this.hideNotification()
                            }}
                        />
                        <div className="toast__title">
                            {this.props.title}
                        </div>
                        <div className="toast__body">
                            {this.props.body}
                        </div>
                    </div>
                )
            }
            return (
                <React.Fragment>
                    {toast}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }

    ToastNotification.propTypes = {
        title: PropTypes.string,
        body: PropTypes.string,
        type: PropTypes.string,
        show: PropTypes.bool
    }

    return withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(ToastNotification)
    )
}

export default withNotification