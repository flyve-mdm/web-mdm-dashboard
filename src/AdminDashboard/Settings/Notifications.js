import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../Utils/ContentPane'

class Notifications extends Component {
    render () {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2"> Notifications </h2>

                <div className="listElement">
                    <div className="message">
                        Show notifications
                        <div className="detail">For error messages is always enabled </div>
                    </div>
                    <div className="controller">
                        <ReactWinJS.ToggleSwitch 
                            className="content-text-primary"
                            // checked={value}
                            // onChange={() => this.props.editPolicy(this.props.data['PluginFlyvemdmPolicy.id'], !value)}
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
                        // name={} 
                        // value={}
                        // onChange={}
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