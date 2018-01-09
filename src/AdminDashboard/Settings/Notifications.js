import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../Utils/ContentPane'
import ToastNotifications from '../../Utils/ToastNotifications'


class Notifications extends Component {

    constructor (props) {
        super(props)
        const notificationType = (localStorage.getItem('notificationType') && Notification.permission === 'granted') ? 
            localStorage.getItem('notificationType') : 'Toast'
        const showNotifications = localStorage.getItem('showNotifications') ? (localStorage.getItem('showNotifications') === 'true') : true
        this.state = {
            notificationType,
            showNotifications
        }
    }

    changeNotificationType = (e) => {
        const newNotificationType = e.target.value
        if (Notification) {
            Notification.requestPermission()
                .then((permission) => {
                    if(permission === "granted") {
                        localStorage.setItem('notificationType', newNotificationType)
                        this.setState({
                            notificationType: newNotificationType
                        })
                    }
                })
        }
    } 

    changeShowNotifications = () => {
        localStorage.setItem('showNotifications', !this.state.showNotifications)
        this.setState({showNotifications: !this.state.showNotifications})
    }

    render () {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                
                <ToastNotifications show={this.state.showNotifications}/>

                <h2 className="win-h2"> Notifications </h2>

                <div className="listElement">
                    <div className="message">
                        Show notifications
                        <div className="detail">For error messages is always enabled </div>
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                                checked={this.state.showNotifications}
                                onChange={this.changeShowNotifications}
                            />
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Notification type
                        <div className="detail">For native you need to grant permissions</div>
                    </div>
                    <div className="controller" style={{ paddingTop: 10 }}>
                        <select 
                        className="win-dropdown" 
                        name='notificationType' 
                        value={this.state.notificationType}
                        onChange={this.changeNotificationType}
                        >
                            <option>Toast</option>
                            <option>Native</option>
                        </select>
                    </div>
                </div>

            </ContentPane>
        )
    }
}

Notifications.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Notifications