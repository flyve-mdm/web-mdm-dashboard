import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import PropTypes from 'prop-types'

class Display extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <h2 className="win-h2"> Display </h2>

                <div className="title"> Language </div>

                <div className="listElement">
                    <div className="message">
                        Change interface language
                    </div>
                    <div 
                    className="controller" 
                    style={{
                        paddingTop: 10
                    }}>
                        <select 
                        className="win-dropdown" 
                        // name={} 
                        // value={}
                        // onChange={}
                        >
                            <option>English</option>
                            <option>French</option>
                            <option>Spanish</option>
                            <option>Portuguese</option>
                        </select>
                    </div>
                </div>
                                        
                <div className="title">Show in dashboard </div>

                <div className="listElement">
                    <div className="message">
                        Maximum managed devices
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
                        Devices currently managed
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
                        Fleets currently managed
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
                        Files uploaded
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
                        Applications uploaded   
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
                        Number of users
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
                        Invitations sent
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
                        Devices by users
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
                        Devices by Operating System version
                    </div>
                    <div className="controller">
                            <ReactWinJS.ToggleSwitch 
                                className="content-text-primary"
                                // checked={value}
                                // onChange={() => this.props.editPolicy(this.props.data['PluginFlyvemdmPolicy.id'], !value)}
                                />
                    </div>
                </div>
                
            </div>
        )
    }
}

Display.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Display