import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WinJS from 'winjs'

function mapStateToProps(state, props) {
  return {
      body: state.ui.notification.body,
      title: state.ui.notification.title,
      type: state.ui.notification.type
  }
}

const withToastNotification = WrappedComponent => {
  class ToastNotification extends Component {
    constructor (props) {
      super(props)
      this.state = {
          show: false,
          timer: {}
      }
    }

    componentWillReceiveProps(nextProps) {
      if ( nextProps.title !== this.props.title 
      &&   nextProps.body !== this.props.body  ) {
        this.setState({
          show: true,
          type: nextProps.type,
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
          })
      })
    }

    renderNotification = () => {
      let toast = null

      if (this.state.show) {
        toast = (
        <div className={`toast --${this.props.type}`}>
            <span className="cancelIcon" style={{ float: 'right', cursor: 'pointer' }} onClick={()=> {
                clearTimeout(this.state.timer)
                this.hideNotification()
            }}/>
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

    render () {
      return this.renderNotification()
    }
  }

  ToastNotification.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
  }

  return connect(mapStateToProps, null)(ToastNotification)
  
}

export default withToastNotification