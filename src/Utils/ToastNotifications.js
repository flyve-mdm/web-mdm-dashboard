
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WinJS from 'winjs'

class ToastNotifications extends Component {

    constructor (props) {
        super(props)
        this.state = {
            show: false,
            timer: {}
        }
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            show: true
        }, () => {
            WinJS.UI.Animation.enterContent(
                document.getElementsByClassName('toast'), { top: '0px', left: '30px', rtlflip: true }, { mechanism: "transition" }
            )
            this.setState({
                timer: setTimeout(() => {
                    this.removeNotification()
                }, 2000)
            })
        })
    }

    removeNotification = () => {
        WinJS.UI.Animation.exitContent(
            document.getElementsByClassName('toast'), { top: '0px', left: '20px' }
        ).then(() => {
            this.setState({
                show: false
            })
        })
    }

    renderNotification = () => {
        let render = <div/>
        if (this.state.show) {
            render = (
                <div className={`toast toast-${this.props.type}`}>
                    <span className="cancelIcon" style={{ float: 'right', cursor: 'pointer' }} onClick={()=> {
                        clearTimeout(this.state.timer)
                        this.removeNotification()
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
        
        return render
    }
 
    render () {
        return this.renderNotification()
    }
}

ToastNotifications.defaultProps = {
    title: 'Title example',
    body: 'body example',
    type: 'info'
}

ToastNotifications.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["alert", "warning", "success", "info"]).isRequired,
}

export default ToastNotifications