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
                const notification = validateNotifications()
                if (notification.show || nextProps.type === "alert") {
                    if (notification.type === "Toast") {
                        return {
                            show: true,
                            type: nextProps.type,
                            title: nextProps.title,
                            body: nextProps.body,
                        }
                    } else {
                        nativeNotification(nextProps.title, nextProps.body, nextProps.icon)
                        return {
                            ...prevState,
                            show: false
                        }
                    }
                }

            } else {
                return {
                    ...prevState
                }
            }
        }

        componentDidUpdate(prevProps, prevState, prevContext) {
            if (prevProps.title !== this.props.title || prevProps.body !== this.props.body) {
                this.setState({
                    timer: setTimeout(() => {
                        this.hideNotification()
                    }, 4000)
                })
            }
        }

        hideNotification = () => {
            WinJS.UI.Animation.exitContent(
                document.getElementsByClassName('toast'), { top: '0px', left: '20px' }
            ).then(() => {
                this.setState({
                    show: false
                }, () => {
                    clearTimeout(this.state.timer)
                    this.props.actions.uiHideNotification()
                })
            })
        }

        render() {
            let toast = null

            if (this.state.show && this.props.show) {
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