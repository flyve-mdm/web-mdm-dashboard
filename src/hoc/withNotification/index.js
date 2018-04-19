import React, { Component } from 'react'
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
  class ToastNotification extends Component {
    constructor (props) {
      super(props)
      this.state = {
          timer: {},
          show: false
      }
    }

    componentWillReceiveProps(nextProps) {
      if ( nextProps.title !== this.props.title || nextProps.body !== this.props.body  ) {
        const notification = validateNotifications()
        if (notification.show || nextProps.type === "alert") {
          if (notification.type === "Toast") {
            this.setState({
              show: true,
              type: nextProps.type,
              timer: setTimeout(() => {
                this.hideNotification()
              }, 4000)
            })
          } else {
            nativeNotification(nextProps.title, nextProps.body, nextProps.icon)
          }
        }
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

    render () {
      let toast = null

      if (this.state.show && this.props.show) {
        toast = (
          <div className={`toast --${this.props.type}`}>
            <span 
              className="cancelIcon" 
              style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }} 
              onClick={()=> {
                this.hideNotification()
              }}
            />
            <div className="toast-title">
                { this.props.title }
            </div>
            <div className="toast-body">
                { this.props.body }
            </div>
          </div>
        )
      }
      return (
        <React.Fragment>
          { toast }
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